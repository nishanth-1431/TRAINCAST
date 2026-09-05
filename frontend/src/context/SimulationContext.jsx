import React, { createContext, useState, useContext, useEffect } from 'react';
import { AppContext } from './AppContext';
import { getMockTrains, updateMockTrains, mockTrains as initialTrains } from '../data/mockData';

export const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  const { triggerUpdate } = useContext(AppContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [simulatedTrains, setSimulatedTrains] = useState([...initialTrains]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        // Run simulation step
        stepForward();
      }, 3000 / simulationSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, simulationSpeed]);

  const stepForward = () => {
    setSimulatedTrains(prevTrains => {
      const newTrains = prevTrains.map(train => {
        // 1. Move train forward
        const distanceDelta = (train.speed / 60) * 5; // arbitrary scaling for demo speed
        let newCompleted = Math.min(train.completedDistance + distanceDelta, train.totalDistance);
        
        // 2. Interpolate coordinates along routeGeometry
        const progressRatio = newCompleted / train.totalDistance;
        const totalSegments = train.routeGeometry.length - 1;
        const exactIndex = progressRatio * totalSegments;
        const lowerIndex = Math.floor(exactIndex);
        const upperIndex = Math.ceil(exactIndex);
        
        let newLat = train.lat;
        let newLng = train.lng;
        
        if (lowerIndex < train.routeGeometry.length && upperIndex < train.routeGeometry.length) {
          const lowerPoint = train.routeGeometry[lowerIndex];
          const upperPoint = train.routeGeometry[upperIndex];
          const segmentProgress = exactIndex - lowerIndex;
          
          newLat = lowerPoint.lat + (upperPoint.lat - lowerPoint.lat) * segmentProgress;
          newLng = lowerPoint.lng + (upperPoint.lng - lowerPoint.lng) * segmentProgress;
        }

        // 3. Inject dynamic delay changes based on train ID (for demo scripting)
        let delayDelta = 0;
        if (train.id === "12675") delayDelta = 1; // Simulated slowdown
        if (train.id === "12633") delayDelta = 2; // Simulated major issue
        
        const newDelay = train.delayMinutes + delayDelta;
        
        // 4. Time string helper function
        const addMinutes = (timeStr, mins) => {
           if(!timeStr) return timeStr;
           const [h, m] = timeStr.split(':').map(Number);
           const date = new Date(2000, 0, 1, h, m + mins, 0); // arbitrary date
           return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        };

        const updatedUpcoming = train.upcoming.map(u => ({
           ...u,
           predicted: addMinutes(u.predicted, delayDelta)
        }));

        let newStatus = train.status;
        let newRisk = train.riskLevel;
        if (newDelay > 30) {
            newStatus = "At Risk";
            newRisk = "High";
        } else if (newDelay > 10) {
            newStatus = "Delayed";
            newRisk = "Medium";
        } else {
            newStatus = "On Time";
            newRisk = "Low";
        }

        return {
          ...train,
          completedDistance: newCompleted,
          lat: newLat,
          lng: newLng,
          delayMinutes: newDelay,
          predictedArrival: addMinutes(train.predictedArrival, delayDelta),
          predictedArrivalMax: addMinutes(train.predictedArrivalMax, delayDelta),
          predictedArrivalMin: addMinutes(train.predictedArrivalMin, delayDelta),
          status: newStatus,
          riskLevel: newRisk,
          upcoming: updatedUpcoming,
          lastUpdate: new Date().toISOString()
        };
      });
      updateMockTrains(newTrains);
      return newTrains;
    });
    triggerUpdate();
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setIsPlaying(false);
    setSimulatedTrains([...initialTrains]);
    updateMockTrains([...initialTrains]);
    triggerUpdate();
  };

  return (
    <SimulationContext.Provider value={{
      isPlaying,
      play,
      pause,
      reset,
      stepForward,
      simulationSpeed,
      setSimulationSpeed,
      simulatedTrains
    }}>
      {children}
    </SimulationContext.Provider>
  );
};
