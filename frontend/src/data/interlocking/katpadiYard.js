// Katpadi Junction (KPD) Prototype Yard Schematic Data
export const KATPADI_YARD_DATA = {
  stationCode: 'KPD',
  stationName: 'Katpadi Junction (KPD)',
  viewBox: '0 0 1000 440',
  
  tracks: [
    // Vellore Cantt Chord Line (Top)
    { id: 'TRK-VLR-CHORD', label: 'VELLORE CANTT BRANCH LINE (FROM VLR/VM)', x1: 50, y1: 60, x2: 950, y2: 60, type: 'slow' },
    
    // Up Fast Main (From Chennai Central)
    { id: 'TRK-KPD-UP-FAST', label: 'UP FAST MAIN (FROM MAS/AJJ)', x1: 50, y1: 150, x2: 950, y2: 150, type: 'main', isOccupied: false },

    // Up Slow & Platform 1 Road
    { id: 'TRK-KPD-TO-PF1', label: 'P301 TURNOUT TO PF1', x1: 240, y1: 150, x2: 340, y2: 210, type: 'crossover' },
    { id: 'TRK-KPD-PF1', label: 'PLATFORM 1 ROAD (MAIN)', x1: 340, y1: 210, x2: 680, y2: 210, type: 'platform', platformNum: 1, isOccupied: true, trainHeadcode: '12607', trainName: 'Lalbagh Express' },
    { id: 'TRK-KPD-FROM-PF1', label: 'P302 REJOIN UP FAST', x1: 680, y1: 210, x2: 780, y2: 150, type: 'crossover' },

    // Down Fast Main (From Jolarpettai/SBC)
    { id: 'TRK-KPD-DN-FAST', label: 'DN FAST MAIN (FROM JTJ/SBC)', x1: 50, y1: 290, x2: 950, y2: 290, type: 'main' },

    // Down Slow & Platform 2 & 3 Road
    { id: 'TRK-KPD-TO-PF2', label: 'P303 TURNOUT TO PF2', x1: 260, y1: 290, x2: 360, y2: 350, type: 'crossover' },
    { id: 'TRK-KPD-PF2', label: 'PLATFORM 2 ROAD', x1: 360, y1: 350, x2: 700, y2: 350, type: 'platform', platformNum: 2, isOccupied: false },
    { id: 'TRK-KPD-FROM-PF2', label: 'P304 REJOIN DN FAST', x1: 700, y1: 350, x2: 800, y2: 290, type: 'crossover' }
  ],

  platforms: [
    { id: 'PF-KPD-1', label: 'PLATFORM 1', x: 390, y: 172, width: 260, height: 26, number: 'PF 1' },
    { id: 'PF-KPD-2-3', label: 'PLATFORM 2 & 3', x: 390, y: 312, width: 260, height: 26, number: 'PF 2 & 3' }
  ],

  signals: [
    { id: 'KPD-S1', label: '1S', x: 190, y: 135, aspect: 'GREEN', type: 'HOME', line: 'UP FAST' },
    { id: 'KPD-S2', label: '2S', x: 190, y: 275, aspect: 'GREEN', type: 'HOME', line: 'DN FAST' },
    { id: 'KPD-S11', label: '11S', x: 690, y: 195, aspect: 'YELLOW', type: 'STARTER', line: 'PF 1' },
    { id: 'KPD-S12', label: '12S', x: 710, y: 335, aspect: 'RED', type: 'STARTER', line: 'PF 2' }
  ],

  points: [
    { id: 'P301', name: '301A', position: 'REVERSE', route: 'UP FAST -> PF 1', x: 280, y: 175 },
    { id: 'P302', name: '302A', position: 'REVERSE', route: 'PF 1 -> UP FAST', x: 730, y: 175 }
  ],

  routes: [
    {
      id: 'RT-KPD-PF1',
      name: 'Up Fast -> Platform 1 (12607 Lalbagh Express Dwell)',
      entrySignal: 'KPD-S1',
      exitSignal: 'KPD-S11',
      pointsRequired: { P301: 'REVERSE', P302: 'REVERSE' },
      clearedTracks: ['TRK-KPD-TO-PF1', 'TRK-KPD-PF1'],
      status: 'LOCKED',
      heldTrain: '12607',
      delayImpact: '+2m dwell'
    }
  ]
};
