
export interface Property {
  id: number;
  name: string;
  type: 'property' | 'railroad' | 'utility' | 'tax' | 'special';
  position: number;
  price: number;
  rent: number[];
  colorGroup?: string;
  mortgageValue?: number;
  houseCost?: number;
  hotelCost?: number;
}

export interface Player {
  id: number;
  name: string;
  money: number;
  position: number;
  properties: number[];
  jailTurns: number;
  color: string;
  avatar: string;
}

export interface GameState {
  players: Player[];
  currentPlayer: number;
  properties: Property[];
  dice: [number, number];
  gameStarted: boolean;
  winner: number | null;
  doubleRolls: number;
  turnPhase: 'roll' | 'action' | 'end';
  lastAction: string;
}

export const INITIAL_MONEY = 1500;
export const JAIL_POSITION = 10;
export const GO_POSITION = 0;
export const GO_MONEY = 200;
export const MAX_PLAYERS = 6;

export const PLAYER_COLORS = [
  '#e63946', // red
  '#1d3557', // blue
  '#2a9d8f', // teal
  '#f4a261', // orange
  '#6a0dad', // purple
  '#ffba08', // yellow
];

export const PLAYER_AVATARS = [
  '👑', // crown
  '🎩', // top hat
  '🐶', // dog
  '🚗', // car
  '⚓', // anchor
  '👞', // shoe
];

// Complete properties array matching the classic Monopoly board
export const properties: Property[] = [
  {
    id: 0,
    name: 'GO',
    type: 'special',
    position: 0,
    price: 0,
    rent: [0],
  },
  {
    id: 1,
    name: 'Mediterranean Avenue',
    type: 'property',
    position: 1,
    price: 60,
    rent: [2, 10, 30, 90, 160, 250],
    colorGroup: 'brown',
    mortgageValue: 30,
    houseCost: 50,
    hotelCost: 50,
  },
  {
    id: 2,
    name: 'Community Chest',
    type: 'special',
    position: 2,
    price: 0,
    rent: [0],
  },
  {
    id: 3,
    name: 'Baltic Avenue',
    type: 'property',
    position: 3,
    price: 60,
    rent: [4, 20, 60, 180, 320, 450],
    colorGroup: 'brown',
    mortgageValue: 30,
    houseCost: 50,
    hotelCost: 50,
  },
  {
    id: 4,
    name: 'Income Tax',
    type: 'tax',
    position: 4,
    price: 0,
    rent: [200],
  },
  {
    id: 5,
    name: 'Reading Railroad',
    type: 'railroad',
    position: 5,
    price: 200,
    rent: [25, 50, 100, 200],
    mortgageValue: 100,
  },
  {
    id: 6,
    name: 'Oriental Avenue',
    type: 'property',
    position: 6,
    price: 100,
    rent: [6, 30, 90, 270, 400, 550],
    colorGroup: 'lightBlue',
    mortgageValue: 50,
    houseCost: 50,
    hotelCost: 50,
  },
  {
    id: 7,
    name: 'Chance',
    type: 'special',
    position: 7,
    price: 0,
    rent: [0],
  },
  {
    id: 8,
    name: 'Vermont Avenue',
    type: 'property',
    position: 8,
    price: 100,
    rent: [6, 30, 90, 270, 400, 550],
    colorGroup: 'lightBlue',
    mortgageValue: 50,
    houseCost: 50,
    hotelCost: 50,
  },
  {
    id: 9,
    name: 'Connecticut Avenue',
    type: 'property',
    position: 9,
    price: 120,
    rent: [8, 40, 100, 300, 450, 600],
    colorGroup: 'lightBlue',
    mortgageValue: 60,
    houseCost: 50,
    hotelCost: 50,
  },
  {
    id: 10,
    name: 'Jail / Just Visiting',
    type: 'special',
    position: 10,
    price: 0,
    rent: [0],
  },
  {
    id: 11,
    name: 'St. Charles Place',
    type: 'property',
    position: 11,
    price: 140,
    rent: [10, 50, 150, 450, 625, 750],
    colorGroup: 'pink',
    mortgageValue: 70,
    houseCost: 100,
    hotelCost: 100,
  },
  {
    id: 12,
    name: 'Electric Company',
    type: 'utility',
    position: 12,
    price: 150,
    rent: [4, 10],
    mortgageValue: 75,
  },
  {
    id: 13,
    name: 'States Avenue',
    type: 'property',
    position: 13,
    price: 140,
    rent: [10, 50, 150, 450, 625, 750],
    colorGroup: 'pink',
    mortgageValue: 70,
    houseCost: 100,
    hotelCost: 100,
  },
  {
    id: 14,
    name: 'Virginia Avenue',
    type: 'property',
    position: 14,
    price: 160,
    rent: [12, 60, 180, 500, 700, 900],
    colorGroup: 'pink',
    mortgageValue: 80,
    houseCost: 100,
    hotelCost: 100,
  },
  {
    id: 15,
    name: 'Pennsylvania Railroad',
    type: 'railroad',
    position: 15,
    price: 200,
    rent: [25, 50, 100, 200],
    mortgageValue: 100,
  },
  {
    id: 16,
    name: 'St. James Place',
    type: 'property',
    position: 16,
    price: 180,
    rent: [14, 70, 200, 550, 750, 950],
    colorGroup: 'orange',
    mortgageValue: 90,
    houseCost: 100,
    hotelCost: 100,
  },
  {
    id: 17,
    name: 'Community Chest',
    type: 'special',
    position: 17,
    price: 0,
    rent: [0],
  },
  {
    id: 18,
    name: 'Tennessee Avenue',
    type: 'property',
    position: 18,
    price: 180,
    rent: [14, 70, 200, 550, 750, 950],
    colorGroup: 'orange',
    mortgageValue: 90,
    houseCost: 100,
    hotelCost: 100,
  },
  {
    id: 19,
    name: 'New York Avenue',
    type: 'property',
    position: 19,
    price: 200,
    rent: [16, 80, 220, 600, 800, 1000],
    colorGroup: 'orange',
    mortgageValue: 100,
    houseCost: 100,
    hotelCost: 100,
  },
  {
    id: 20,
    name: 'Free Parking',
    type: 'special',
    position: 20,
    price: 0,
    rent: [0],
  },
  {
    id: 21,
    name: 'Kentucky Avenue',
    type: 'property',
    position: 21,
    price: 220,
    rent: [18, 90, 250, 700, 875, 1050],
    colorGroup: 'red',
    mortgageValue: 110,
    houseCost: 150,
    hotelCost: 150,
  },
  {
    id: 22,
    name: 'Chance',
    type: 'special',
    position: 22,
    price: 0,
    rent: [0],
  },
  {
    id: 23,
    name: 'Indiana Avenue',
    type: 'property',
    position: 23,
    price: 220,
    rent: [18, 90, 250, 700, 875, 1050],
    colorGroup: 'red',
    mortgageValue: 110,
    houseCost: 150,
    hotelCost: 150,
  },
  {
    id: 24,
    name: 'Illinois Avenue',
    type: 'property',
    position: 24,
    price: 240,
    rent: [20, 100, 300, 750, 925, 1100],
    colorGroup: 'red',
    mortgageValue: 120,
    houseCost: 150,
    hotelCost: 150,
  },
  {
    id: 25,
    name: 'B&O Railroad',
    type: 'railroad',
    position: 25,
    price: 200,
    rent: [25, 50, 100, 200],
    mortgageValue: 100,
  },
  {
    id: 26,
    name: 'Atlantic Avenue',
    type: 'property',
    position: 26,
    price: 260,
    rent: [22, 110, 330, 800, 975, 1150],
    colorGroup: 'yellow',
    mortgageValue: 130,
    houseCost: 150,
    hotelCost: 150,
  },
  {
    id: 27,
    name: 'Ventnor Avenue',
    type: 'property',
    position: 27,
    price: 260,
    rent: [22, 110, 330, 800, 975, 1150],
    colorGroup: 'yellow',
    mortgageValue: 130,
    houseCost: 150,
    hotelCost: 150,
  },
  {
    id: 28,
    name: 'Water Works',
    type: 'utility',
    position: 28,
    price: 150,
    rent: [4, 10],
    mortgageValue: 75,
  },
  {
    id: 29,
    name: 'Marvin Gardens',
    type: 'property',
    position: 29,
    price: 280,
    rent: [24, 120, 360, 850, 1025, 1200],
    colorGroup: 'yellow',
    mortgageValue: 140,
    houseCost: 150,
    hotelCost: 150,
  },
  {
    id: 30,
    name: 'Go To Jail',
    type: 'special',
    position: 30,
    price: 0,
    rent: [0],
  },
  {
    id: 31,
    name: 'Pacific Avenue',
    type: 'property',
    position: 31,
    price: 300,
    rent: [26, 130, 390, 900, 1100, 1275],
    colorGroup: 'green',
    mortgageValue: 150,
    houseCost: 200,
    hotelCost: 200,
  },
  {
    id: 32,
    name: 'North Carolina Avenue',
    type: 'property',
    position: 32,
    price: 300,
    rent: [26, 130, 390, 900, 1100, 1275],
    colorGroup: 'green',
    mortgageValue: 150,
    houseCost: 200,
    hotelCost: 200,
  },
  {
    id: 33,
    name: 'Community Chest',
    type: 'special',
    position: 33,
    price: 0,
    rent: [0],
  },
  {
    id: 34,
    name: 'Pennsylvania Avenue',
    type: 'property',
    position: 34,
    price: 320,
    rent: [28, 150, 450, 1000, 1200, 1400],
    colorGroup: 'green',
    mortgageValue: 160,
    houseCost: 200,
    hotelCost: 200,
  },
  {
    id: 35,
    name: 'Short Line Railroad',
    type: 'railroad',
    position: 35,
    price: 200,
    rent: [25, 50, 100, 200],
    mortgageValue: 100,
  },
  {
    id: 36,
    name: 'Chance',
    type: 'special',
    position: 36,
    price: 0,
    rent: [0],
  },
  {
    id: 37,
    name: 'Park Place',
    type: 'property',
    position: 37,
    price: 350,
    rent: [35, 175, 500, 1100, 1300, 1500],
    colorGroup: 'darkBlue',
    mortgageValue: 175,
    houseCost: 200,
    hotelCost: 200,
  },
  {
    id: 38,
    name: 'Luxury Tax',
    type: 'tax',
    position: 38,
    price: 0,
    rent: [100],
  },
  {
    id: 39,
    name: 'Boardwalk',
    type: 'property',
    position: 39,
    price: 400,
    rent: [50, 200, 600, 1400, 1700, 2000],
    colorGroup: 'darkBlue',
    mortgageValue: 200,
    houseCost: 200,
    hotelCost: 200,
  },
];

export const initialGameState: GameState = {
  players: [],
  currentPlayer: 0,
  properties,
  dice: [1, 1],
  gameStarted: false,
  winner: null,
  doubleRolls: 0,
  turnPhase: 'roll',
  lastAction: 'Game initialized',
};

export const createInitialPlayer = (id: number): Player => ({
  id,
  name: `Player ${id + 1}`,
  money: INITIAL_MONEY,
  position: 0,
  properties: [],
  jailTurns: 0,
  color: PLAYER_COLORS[id % PLAYER_COLORS.length],
  avatar: PLAYER_AVATARS[id % PLAYER_AVATARS.length],
});
