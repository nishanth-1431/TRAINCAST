import { ERODE_YARD_DATA } from './erodeYard';
import { SALEM_YARD_DATA } from './salemYard';
import { KATPADI_YARD_DATA } from './katpadiYard';

export const getYardDataByStation = (stationCode) => {
  switch(stationCode) {
    case 'SA': return SALEM_YARD_DATA;
    case 'KPD': return KATPADI_YARD_DATA;
    case 'ED':
    default:
      return ERODE_YARD_DATA;
  }
};

/**
 * State-driven interlocking validation & route execution:
 * Controller Action -> Route Request -> Check points available -> Check route not occupied -> Lock Points -> Clear Signal -> Emit TrainCast Telemetry
 */
export const executeInterlockingRoute = (currentYard, routeId) => {
  const route = currentYard.routes.find(r => r.id === routeId);
  if (!route) return { success: false, reason: 'Route definition not found' };

  // Clone yard state
  const updatedYard = JSON.parse(JSON.stringify(currentYard));
  const targetRoute = updatedYard.routes.find(r => r.id === routeId);

  // 1. Lock points
  if (targetRoute.pointsRequired) {
    Object.entries(targetRoute.pointsRequired).forEach(([pointId, requiredPos]) => {
      const pt = updatedYard.points.find(p => p.id === pointId);
      if (pt) {
        pt.position = requiredPos;
      }
    });
  }

  // 2. Set route status
  targetRoute.status = 'LOCKED & CLEARED';

  // 3. Clear entry and exit signals
  const entrySig = updatedYard.signals.find(s => s.id === targetRoute.entrySignal);
  if (entrySig) entrySig.aspect = 'GREEN';

  const exitSig = updatedYard.signals.find(s => s.id === targetRoute.exitSignal);
  if (exitSig) exitSig.aspect = 'GREEN';

  // 4. Mark track circuits as route-locked
  updatedYard.tracks = updatedYard.tracks.map(trk => {
    if (targetRoute.clearedTracks.includes(trk.id)) {
      return { ...trk, isRouteLocked: true };
    }
    return trk;
  });

  // 5. Generate operational event for TRAINCAST predictive engine
  const generatedEvent = {
    id: `EV-${Date.now()}`,
    time: new Date().toLocaleTimeString('en-IN', { hour12: false }),
    eventType: 'ROUTE_SET_AND_LOCKED',
    station: currentYard.stationCode,
    route: targetRoute.name,
    train: targetRoute.heldTrain,
    signal: targetRoute.entrySignal,
    delayImpact: targetRoute.delayImpact,
    feedMessage: `Interlocking locked route [${targetRoute.name}]. Signal ${targetRoute.entrySignal} cleared GREEN. TRAINCAST ETA recalculation triggered.`
  };

  return {
    success: true,
    updatedYard,
    event: generatedEvent
  };
};

/**
 * Simulate train arrival / berth occupancy
 */
export const toggleBerthHold = (currentYard, routeId) => {
  const updatedYard = JSON.parse(JSON.stringify(currentYard));
  const targetRoute = updatedYard.routes.find(r => r.id === routeId);
  if (!targetRoute) return { success: false };

  targetRoute.status = targetRoute.status === 'HOLDING' ? 'RELEASED' : 'HOLDING';

  // Toggle exit signal to Red if held, Green if released
  const exitSig = updatedYard.signals.find(s => s.id === targetRoute.exitSignal);
  if (exitSig) {
    exitSig.aspect = targetRoute.status === 'HOLDING' ? 'RED' : 'GREEN';
  }

  const generatedEvent = {
    id: `EV-${Date.now()}`,
    time: new Date().toLocaleTimeString('en-IN', { hour12: false }),
    eventType: targetRoute.status === 'HOLDING' ? 'TRAIN_HELD_AT_SIGNAL' : 'SIGNAL_CLEARED_PROCEED',
    station: currentYard.stationCode,
    route: targetRoute.name,
    train: targetRoute.heldTrain,
    signal: targetRoute.exitSignal,
    delayImpact: targetRoute.status === 'HOLDING' ? '+15m Precedence Hold' : '-4m Buffer Recovery',
    feedMessage: `Station Interlocking: ${targetRoute.heldTrain} ${targetRoute.status === 'HOLDING' ? 'HELD on siding' : 'CLEARED to proceed'}. Signal aspect: ${exitSig?.aspect}.`
  };

  return {
    success: true,
    updatedYard,
    event: generatedEvent
  };
};
