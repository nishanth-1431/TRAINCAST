// Railway Station Metadata for Interlocking VDU Simulation
export const INTERLOCKING_STATIONS = [
  {
    id: 'ED',
    name: 'Erode Junction',
    code: 'ED',
    division: 'Salem (SA)',
    zone: 'Southern Railway (SR)',
    type: 'Junction Yard & Electric Loco Shed',
    platforms: 4,
    tracks: 6,
    activeTrains: ['12675 Kovai Express', 'BCN-E Freight 44A', '12243 Shatabdi Express'],
    schematicNote: 'Prototype Yard Schematic: 4 Passenger Platforms, Electric Loco Siding, Goods Loop Siding'
  },
  {
    id: 'CBE',
    name: 'Coimbatore Junction',
    code: 'CBE',
    division: 'Salem (SA)',
    zone: 'Southern Railway (SR)',
    type: 'Major Junction',
    platforms: 6,
    tracks: 8,
    activeTrains: ['12671 Nilgiri Express', '20644 Vande Bharat'],
    schematicNote: 'Prototype Yard Schematic: 6 Platforms, Through Lines, PGT Branch'
  },
  {
    id: 'SA',
    name: 'Salem Junction',
    code: 'SA',
    division: 'Salem (SA)',
    zone: 'Southern Railway (SR)',
    type: 'Junction & Bypass Yard',
    platforms: 3,
    tracks: 5,
    activeTrains: ['12624 Chennai Mail', '20607 Vande Bharat Express'],
    schematicNote: 'Prototype Yard Schematic: 3 Platforms, Bangalore Chord Line, Freight Holding Loop'
  },
  {
    id: 'KPD',
    name: 'Katpadi Junction',
    code: 'KPD',
    division: 'Chennai (MAS)',
    zone: 'Southern Railway (SR)',
    type: 'Trunk Quadruple Junction',
    platforms: 3,
    tracks: 5,
    activeTrains: ['20607 Vande Bharat Express', '12607 Lalbagh Express'],
    schematicNote: 'Prototype Yard Schematic: Quadruple Main Line Approach, Vellore Loop Junction'
  }
];
