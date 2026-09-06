// Coimbatore Junction (CBE) Prototype Yard Schematic Data
export const CBE_YARD_DATA = {
  stationCode: 'CBE',
  stationName: 'Coimbatore Junction (CBE)',
  viewBox: '0 0 1200 600',
  
  tracks: [
    // APPROACH FROM TIRUPPUR (EAST)
    { id: 'CBE-UP-APP', label: 'UP MAIN (FROM TUP)', x1: 50, y1: 250, x2: 250, y2: 250, type: 'main' },
    { id: 'CBE-DN-APP', label: 'DN MAIN (TO TUP)', x1: 50, y1: 350, x2: 250, y2: 350, type: 'main' },

    // ROUTING AREA (EAST)
    { id: 'CBE-E-X1', label: '', x1: 250, y1: 250, x2: 350, y2: 100, type: 'crossover' },
    { id: 'CBE-E-X2', label: '', x1: 250, y1: 250, x2: 350, y2: 175, type: 'crossover' },
    { id: 'CBE-E-X3', label: '', x1: 250, y1: 250, x2: 350, y2: 250, type: 'main' }, // Straight to PF3
    { id: 'CBE-E-X4', label: '', x1: 250, y1: 350, x2: 350, y2: 325, type: 'crossover' },
    { id: 'CBE-E-X5', label: '', x1: 250, y1: 350, x2: 350, y2: 400, type: 'crossover' },
    { id: 'CBE-E-X6', label: '', x1: 250, y1: 350, x2: 350, y2: 475, type: 'crossover' },

    // PLATFORM TRACKS (6 PLATFORMS)
    { id: 'CBE-PF1', label: 'PLATFORM 1', x1: 350, y1: 100, x2: 850, y2: 100, type: 'platform', platformNum: 1, isOccupied: true, trainHeadcode: '12671', trainName: 'Nilgiri Express' },
    { id: 'CBE-PF2', label: 'PLATFORM 2', x1: 350, y1: 175, x2: 850, y2: 175, type: 'platform', platformNum: 2 },
    { id: 'CBE-PF3', label: 'PLATFORM 3 (THROUGH)', x1: 350, y1: 250, x2: 850, y2: 250, type: 'platform', platformNum: 3 },
    { id: 'CBE-PF4', label: 'PLATFORM 4 (THROUGH)', x1: 350, y1: 325, x2: 850, y2: 325, type: 'platform', platformNum: 4, isOccupied: true, trainHeadcode: '20644', trainName: 'Vande Bharat' },
    { id: 'CBE-PF5', label: 'PLATFORM 5', x1: 350, y1: 400, x2: 850, y2: 400, type: 'platform', platformNum: 5 },
    { id: 'CBE-PF6', label: 'PLATFORM 6', x1: 350, y1: 475, x2: 850, y2: 475, type: 'platform', platformNum: 6 },

    // ROUTING AREA (WEST - TO PGT / MTP)
    { id: 'CBE-W-X1', label: '', x1: 850, y1: 100, x2: 950, y2: 250, type: 'crossover' },
    { id: 'CBE-W-X2', label: '', x1: 850, y1: 175, x2: 950, y2: 250, type: 'crossover' },
    { id: 'CBE-W-X3', label: '', x1: 850, y1: 250, x2: 950, y2: 250, type: 'main' }, // Straight
    { id: 'CBE-W-X4', label: '', x1: 850, y1: 325, x2: 950, y2: 350, type: 'crossover' },
    { id: 'CBE-W-X5', label: '', x1: 850, y1: 400, x2: 950, y2: 350, type: 'crossover' },
    { id: 'CBE-W-X6', label: '', x1: 850, y1: 475, x2: 950, y2: 350, type: 'crossover' },

    // DEPARTURE LINES (WEST)
    { id: 'CBE-UP-DEP', label: 'UP MAIN (TO PGT)', x1: 950, y1: 250, x2: 1150, y2: 250, type: 'main' },
    { id: 'CBE-DN-DEP', label: 'DN MAIN (FROM PGT)', x1: 950, y1: 350, x2: 1150, y2: 350, type: 'main' },
  ],

  platforms: [
    { id: 'CBE-ISL-1', label: 'PLATFORM 1', x: 450, y: 115, width: 300, height: 20, number: 'PF 1' },
    { id: 'CBE-ISL-2-3', label: 'PLATFORM 2 & 3', x: 450, y: 195, width: 300, height: 26, number: 'PF 2 & 3' },
    { id: 'CBE-ISL-4-5', label: 'PLATFORM 4 & 5', x: 450, y: 345, width: 300, height: 26, number: 'PF 4 & 5' },
    { id: 'CBE-ISL-6', label: 'PLATFORM 6', x: 450, y: 490, width: 300, height: 20, number: 'PF 6' }
  ],

  signals: [
    // Eastern Approach
    { id: 'C-S1', label: '1S', x: 150, y: 235, aspect: 'GREEN', type: 'HOME', line: 'UP MAIN' },
    { id: 'C-S2', label: '2S', x: 150, y: 335, aspect: 'YELLOW', type: 'HOME', line: 'DN MAIN' },

    // Starters (East bound)
    { id: 'C-S11', label: '11S', x: 820, y: 85, aspect: 'RED', type: 'STARTER', line: 'PF 1' },
    { id: 'C-S12', label: '12S', x: 820, y: 160, aspect: 'RED', type: 'STARTER', line: 'PF 2' },
    { id: 'C-S13', label: '13S', x: 820, y: 235, aspect: 'GREEN', type: 'STARTER', line: 'PF 3' },
    
    // Starters (West bound)
    { id: 'C-S14', label: '14S', x: 380, y: 310, aspect: 'GREEN', type: 'STARTER', line: 'PF 4' },
    { id: 'C-S15', label: '15S', x: 380, y: 385, aspect: 'RED', type: 'STARTER', line: 'PF 5' },
    { id: 'C-S16', label: '16S', x: 380, y: 460, aspect: 'RED', type: 'STARTER', line: 'PF 6' },

    // Adv Starters
    { id: 'C-S21', label: '21S', x: 1050, y: 235, aspect: 'GREEN', type: 'ADVANCED_STARTER', line: 'TO PGT' },
    { id: 'C-S22', label: '22S', x: 1050, y: 335, aspect: 'GREEN', type: 'ADVANCED_STARTER', line: 'FROM PGT' },
  ],

  points: [
    { id: 'P201', name: '201A', position: 'REVERSE', route: 'UP -> PF1', x: 270, y: 220 },
    { id: 'P202', name: '202A', position: 'NORMAL', route: 'UP -> PF3', x: 290, y: 250 },
    { id: 'P203', name: '203A', position: 'REVERSE', route: 'DN -> PF4', x: 290, y: 350 },
    { id: 'P204', name: '204B', position: 'NORMAL', route: 'PF3 -> UP', x: 910, y: 250 },
    { id: 'P205', name: '205B', position: 'NORMAL', route: 'PF4 -> DN', x: 910, y: 350 }
  ],

  routes: [
    {
      id: 'RT-CBE-PF4',
      name: 'Down Main -> PF4 (20644 Vande Bharat)',
      entrySignal: 'C-S2',
      exitSignal: 'C-S14',
      pointsRequired: { P203: 'REVERSE', P205: 'REVERSE' },
      clearedTracks: ['CBE-DN-APP', 'CBE-E-X4', 'CBE-PF4'],
      status: 'LOCKED',
      heldTrain: '20644',
      delayImpact: '+0m'
    },
    {
      id: 'RT-CBE-PF1',
      name: 'Up Main -> PF1 (12671 Nilgiri Exp)',
      entrySignal: 'C-S1',
      exitSignal: 'C-S11',
      pointsRequired: { P201: 'REVERSE' },
      clearedTracks: ['CBE-UP-APP', 'CBE-E-X1', 'CBE-PF1'],
      status: 'LOCKED',
      heldTrain: '12671',
      delayImpact: '+0m'
    },
    {
      id: 'RT-CBE-THROUGH',
      name: 'Up Main -> PF3 (Through Train)',
      entrySignal: 'C-S1',
      exitSignal: 'C-S13',
      pointsRequired: { P202: 'NORMAL' },
      clearedTracks: ['CBE-UP-APP', 'CBE-E-X3', 'CBE-PF3'],
      status: 'AVAILABLE',
      heldTrain: null,
      delayImpact: '0m'
    }
  ]
};
