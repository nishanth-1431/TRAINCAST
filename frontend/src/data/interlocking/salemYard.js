// Salem Junction (SA) Prototype Yard Schematic Data
export const SALEM_YARD_DATA = {
  stationCode: 'SA',
  stationName: 'Salem Junction (SA)',
  viewBox: '0 0 1000 440',
  
  tracks: [
    // Bangalore Chord Line (Top)
    { id: 'TRK-SBC-CHORD', label: 'BANGALORE CHORD LINE (FROM SBC/DPJ)', x1: 50, y1: 60, x2: 950, y2: 60, type: 'slow' },
    
    // Up Main Line
    { id: 'TRK-SA-UP-APP', label: 'UP MAIN (FROM JOLARPETTAI)', x1: 50, y1: 150, x2: 300, y2: 150, type: 'main' },
    { id: 'TRK-SA-TO-PF1', label: 'P201 TURNOUT TO PF1', x1: 300, y1: 150, x2: 400, y2: 150, type: 'platform', platformNum: 1 },
    { id: 'TRK-SA-PF1', label: 'PLATFORM 1 ROAD (MAIN)', x1: 400, y1: 150, x2: 680, y2: 150, type: 'platform', platformNum: 1, isOccupied: false },
    { id: 'TRK-SA-UP-DEP', label: 'UP MAIN (TO ERODE/CBE)', x1: 680, y1: 150, x2: 950, y2: 150, type: 'main' },

    // Middle Loop / Platform 2 Road
    { id: 'TRK-SA-TO-PF2', label: 'P202 TURNOUT TO PF2', x1: 280, y1: 150, x2: 380, y2: 210, type: 'crossover' },
    { id: 'TRK-SA-PF2', label: 'PLATFORM 2 ROAD', x1: 380, y1: 210, x2: 660, y2: 210, type: 'platform', platformNum: 2, isOccupied: true, trainHeadcode: '20607', trainName: 'Vande Bharat' },
    { id: 'TRK-SA-FROM-PF2', label: 'P203 REJOIN MAIN', x1: 660, y1: 210, x2: 740, y2: 150, type: 'crossover' },

    // Down Main Line & Platform 3
    { id: 'TRK-SA-DN-APP', label: 'DN MAIN (FROM ERODE)', x1: 50, y1: 290, x2: 320, y2: 290, type: 'main' },
    { id: 'TRK-SA-PF3', label: 'PLATFORM 3 ROAD', x1: 320, y1: 290, x2: 700, y2: 290, type: 'platform', platformNum: 3, isOccupied: true, trainHeadcode: '12624', trainName: 'Chennai Mail' },
    { id: 'TRK-SA-DN-DEP', label: 'DN MAIN (TO JOLARPETTAI/MAS)', x1: 700, y1: 290, x2: 950, y2: 290, type: 'main' },

    // Bypass Freight Loop
    { id: 'TRK-SA-FREIGHT', label: 'SALEM BYPASS FREIGHT LOOP', x1: 180, y1: 290, x2: 280, y2: 370, type: 'siding' },
    { id: 'TRK-SA-FR-LINE', label: 'BYPASS HOLDING LINE', x1: 280, y1: 370, x2: 720, y2: 370, type: 'siding' },
    { id: 'TRK-SA-FR-EXIT', label: 'BYPASS REJOIN', x1: 720, y1: 370, x2: 820, y2: 290, type: 'siding' }
  ],

  platforms: [
    { id: 'PF-SA-1', label: 'PLATFORM 1', x: 420, y: 115, width: 240, height: 24, number: 'PF 1' },
    { id: 'PF-SA-2-3', label: 'PLATFORM 2 & 3', x: 420, y: 228, width: 240, height: 26, number: 'PF 2 & 3' }
  ],

  signals: [
    { id: 'SA-S1', label: '1S', x: 220, y: 135, aspect: 'GREEN', type: 'HOME', line: 'UP MAIN' },
    { id: 'SA-S2', label: '2S', x: 220, y: 275, aspect: 'YELLOW', type: 'HOME', line: 'DN MAIN' },
    { id: 'SA-S11', label: '11S', x: 670, y: 135, aspect: 'GREEN', type: 'STARTER', line: 'PF 1' },
    { id: 'SA-S12', label: '12S', x: 670, y: 195, aspect: 'GREEN', type: 'STARTER', line: 'PF 2' },
    { id: 'SA-S13', label: '13S', x: 710, y: 275, aspect: 'RED', type: 'STARTER', line: 'PF 3' },
    { id: 'SA-S21', label: '21S', x: 860, y: 135, aspect: 'GREEN', type: 'ADVANCED_STARTER', line: 'TO ED' }
  ],

  points: [
    { id: 'P201', name: '201A', position: 'NORMAL', route: 'UP MAIN THROUGH', x: 320, y: 165 },
    { id: 'P202', name: '202A', position: 'REVERSE', route: 'UP MAIN -> PF 2', x: 320, y: 195 },
    { id: 'P203', name: '203A', position: 'REVERSE', route: 'PF 2 -> UP MAIN', x: 700, y: 175 }
  ],

  routes: [
    {
      id: 'RT-SA-PF2',
      name: 'Up Main -> Platform 2 (20607 Vande Bharat Clearance)',
      entrySignal: 'SA-S1',
      exitSignal: 'SA-S12',
      pointsRequired: { P202: 'REVERSE', P203: 'REVERSE' },
      clearedTracks: ['TRK-SA-UP-APP', 'TRK-SA-TO-PF2', 'TRK-SA-PF2'],
      status: 'CLEARED',
      heldTrain: '20607',
      delayImpact: '-2m recovery'
    },
    {
      id: 'RT-SA-PF3',
      name: 'Down Main -> Platform 3 (12624 Chennai Mail Dwell)',
      entrySignal: 'SA-S2',
      exitSignal: 'SA-S13',
      pointsRequired: {},
      clearedTracks: ['TRK-SA-DN-APP', 'TRK-SA-PF3'],
      status: 'HOLDING',
      heldTrain: '12624',
      delayImpact: '+3m dwell'
    }
  ]
};
