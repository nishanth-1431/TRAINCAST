// Erode Junction (ED) Prototype Yard Schematic Data
export const ERODE_YARD_DATA = {
  stationCode: 'ED',
  stationName: 'Erode Junction (ED)',
  viewBox: '0 0 1000 440',
  
  // Track Circuit Lines
  tracks: [
    // Slow Line (Top)
    { id: 'TRK-SLOW', label: 'UP SLOW LINE', x1: 50, y1: 50, x2: 950, y2: 50, type: 'slow' },
    
    // Loco Siding (Branching from slow line)
    { id: 'TRK-LOCO-IN', label: 'LOCO SDGS ENTRY', x1: 220, y1: 50, x2: 300, y2: 90, type: 'siding' },
    { id: 'TRK-LOCO', label: 'ELECTRIC LOCO SDGS [FULL]', x1: 300, y1: 90, x2: 550, y2: 90, type: 'siding', isOccupied: true, occupiedBy: 'WAP-7 LOCOS' },
    { id: 'TRK-LOCO-OUT', label: 'LOCO SDGS EXIT', x1: 550, y1: 90, x2: 630, y2: 50, type: 'siding' },

    // Up Main Line Approach
    { id: 'TRK-UP-APP', label: 'UP MAIN (FROM SALEM)', x1: 50, y1: 140, x2: 240, y2: 140, type: 'main' },
    // Turnout to Platform 2
    { id: 'TRK-TO-PF2', label: 'P101 TURNOUT TO PF2', x1: 240, y1: 140, x2: 340, y2: 190, type: 'crossover' },
    // Platform 1 Track
    { id: 'TRK-PF1', label: 'PLATFORM 1 ROAD', x1: 240, y1: 140, x2: 700, y2: 140, type: 'platform', platformNum: 1 },
    // Platform 2 Track
    { id: 'TRK-PF2', label: 'PLATFORM 2 ROAD', x1: 340, y1: 190, x2: 660, y2: 190, type: 'platform', platformNum: 2, isOccupied: true, trainHeadcode: '12675', trainName: 'Kovai Express' },
    // Rejoin Up Main from PF2
    { id: 'TRK-FROM-PF2', label: 'P102 REJOIN UP MAIN', x1: 660, y1: 190, x2: 760, y2: 140, type: 'crossover' },
    // Up Main Line Departure (to CBE)
    { id: 'TRK-UP-DEP', label: 'UP MAIN (TO TIRUPPUR/CBE)', x1: 760, y1: 140, x2: 950, y2: 140, type: 'main' },

    // Down Main Line Approach (From CBE)
    { id: 'TRK-DN-APP', label: 'DN MAIN (FROM COIMBATORE)', x1: 50, y1: 270, x2: 240, y2: 270, type: 'main' },
    // Platform 3 Track
    { id: 'TRK-PF3', label: 'PLATFORM 3 ROAD', x1: 240, y1: 270, x2: 660, y2: 270, type: 'platform', platformNum: 3 },
    // Turnout to Platform 4
    { id: 'TRK-TO-PF4', label: 'P103 TURNOUT TO PF4', x1: 240, y1: 270, x2: 340, y2: 320, type: 'crossover' },
    // Platform 4 Track
    { id: 'TRK-PF4', label: 'PLATFORM 4 ROAD', x1: 340, y1: 320, x2: 700, y2: 320, type: 'platform', platformNum: 4 },
    // Rejoin Dn Main from PF4
    { id: 'TRK-FROM-PF4', label: 'P104 REJOIN DN MAIN', x1: 700, y1: 320, x2: 780, y2: 270, type: 'crossover' },
    // Down Main Line Departure (To SA/MAS)
    { id: 'TRK-DN-DEP', label: 'DN MAIN (TO SALEM/MAS)', x1: 780, y1: 270, x2: 950, y2: 270, type: 'main' },

    // Goods Yard & Loop Siding (Bottom)
    { id: 'TRK-GOODS-ENTRY', label: 'GOODS SIDING DIVERGE', x1: 160, y1: 270, x2: 260, y2: 380, type: 'siding' },
    { id: 'TRK-GOODS-LOOP', label: 'MORAPPUR-ED GOODS LOOP SIDING', x1: 260, y1: 380, x2: 720, y2: 380, type: 'siding', isOccupied: true, trainHeadcode: 'BCN-E', trainName: 'Freight 44A' },
    { id: 'TRK-GOODS-EXIT', label: 'GOODS SIDING REJOIN', x1: 720, y1: 380, x2: 820, y2: 270, type: 'siding' }
  ],

  // Platforms (Amber / Orange Island Blocks as seen in reference image)
  platforms: [
    { id: 'PF-ISLAND-1-2', label: 'PLATFORM 1 & 2', x: 380, y: 152, width: 260, height: 26, number: 'PF 1 & 2' },
    { id: 'PF-ISLAND-3-4', label: 'PLATFORM 3 & 4', x: 380, y: 282, width: 260, height: 26, number: 'PF 3 & 4' }
  ],

  // Signals (Color-coded circles with ID labels)
  signals: [
    // Up Approach Home Signal
    { id: 'S1', label: '1S', x: 190, y: 125, aspect: 'GREEN', type: 'HOME', line: 'UP MAIN' },
    // Down Approach Home Signal
    { id: 'S2', label: '2S', x: 190, y: 255, aspect: 'YELLOW', type: 'HOME', line: 'DN MAIN' },

    // Starters from Platform 1 & 2
    { id: 'S11', label: '11S', x: 670, y: 125, aspect: 'RED', type: 'STARTER', line: 'PF 1' },
    { id: 'S12', label: '12S', x: 670, y: 175, aspect: 'YELLOW', type: 'STARTER', line: 'PF 2' },

    // Starters from Platform 3 & 4
    { id: 'S13', label: '13S', x: 670, y: 255, aspect: 'RED', type: 'STARTER', line: 'PF 3' },
    { id: 'S14', label: '14S', x: 710, y: 305, aspect: 'RED', type: 'STARTER', line: 'PF 4' },

    // Advanced Starters (Exit to block sections)
    { id: 'S21', label: '21S', x: 860, y: 125, aspect: 'GREEN', type: 'ADVANCED_STARTER', line: 'TO CBE' },
    { id: 'S22', label: '22S', x: 860, y: 255, aspect: 'GREEN', type: 'ADVANCED_STARTER', line: 'TO SA' },

    // Shunt Signals
    { id: 'SH1', label: 'SH1', x: 280, y: 365, aspect: 'STOP', type: 'SHUNT', line: 'GOODS SIDING' },
    { id: 'SH2', label: 'SH2', x: 320, y: 75, aspect: 'PROCEED', type: 'SHUNT', line: 'LOCO SDGS' }
  ],

  // Turnout Points (Switch Machines)
  points: [
    { id: 'P101', name: '101A/B', position: 'REVERSE', route: 'UP MAIN -> PF 2', x: 260, y: 155 },
    { id: 'P102', name: '102A/B', position: 'REVERSE', route: 'PF 2 -> UP MAIN', x: 710, y: 155 },
    { id: 'P103', name: '103A/B', position: 'NORMAL', route: 'DN MAIN -> PF 3', x: 260, y: 285 },
    { id: 'P104', name: '104A/B', position: 'NORMAL', route: 'PF 3 -> DN MAIN', x: 740, y: 285 },
    { id: 'P105', name: '105A/B', position: 'REVERSE', route: 'DN MAIN -> GOODS LOOP', x: 190, y: 310 }
  ],

  // Pre-configured Routes Available for ARS (Auto Route Setting)
  routes: [
    {
      id: 'RT-UP-PF2',
      name: 'Up Main -> Platform 2 Road (12675 Kovai Express)',
      entrySignal: 'S1',
      exitSignal: 'S12',
      pointsRequired: { P101: 'REVERSE', P102: 'REVERSE' },
      clearedTracks: ['TRK-UP-APP', 'TRK-TO-PF2', 'TRK-PF2'],
      status: 'LOCKED',
      heldTrain: '12675',
      delayImpact: '+0m'
    },
    {
      id: 'RT-UP-PF1',
      name: 'Up Main -> Platform 1 Road (Through Line)',
      entrySignal: 'S1',
      exitSignal: 'S11',
      pointsRequired: { P101: 'NORMAL' },
      clearedTracks: ['TRK-UP-APP', 'TRK-PF1'],
      status: 'AVAILABLE',
      heldTrain: null,
      delayImpact: '0m'
    },
    {
      id: 'RT-GOODS-HOLD',
      name: 'Goods Loop Siding Precedence Hold (BCN-E Freight)',
      entrySignal: 'SH1',
      exitSignal: 'S22',
      pointsRequired: { P105: 'REVERSE' },
      clearedTracks: ['TRK-GOODS-LOOP'],
      status: 'HOLDING',
      heldTrain: 'BCN-E',
      delayImpact: '+24m siding hold (Yields priority to 12675)'
    },
    {
      id: 'RT-DN-PF3',
      name: 'Down Main -> Platform 3 (12243 Shatabdi Approach)',
      entrySignal: 'S2',
      exitSignal: 'S13',
      pointsRequired: { P103: 'NORMAL', P104: 'NORMAL' },
      clearedTracks: ['TRK-DN-APP', 'TRK-PF3'],
      status: 'SETTING',
      heldTrain: '12243',
      delayImpact: '-2m recovery'
    }
  ]
};
