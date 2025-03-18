
import { useState, useEffect, useCallback } from 'react';
import { 
  GameState, 
  initialGameState, 
  Player, 
  Property, 
  INITIAL_MONEY,
  GO_MONEY, 
  GO_POSITION,
  JAIL_POSITION,
  createInitialPlayer
} from '@/lib/gameData';
import { toast } from '@/components/ui/use-toast';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = localStorage.getItem('monopolyGameState');
    return savedState ? JSON.parse(savedState) : { ...initialGameState };
  });

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (gameState.gameStarted) {
      localStorage.setItem('monopolyGameState', JSON.stringify(gameState));
    }
  }, [gameState]);

  // Initialize game with players
  const initializeGame = useCallback((playerCount: number) => {
    const players: Player[] = [];
    
    for (let i = 0; i < playerCount; i++) {
      players.push(createInitialPlayer(i));
    }

    setGameState({
      ...initialGameState,
      players,
      gameStarted: true,
    });

    toast({
      title: "Game Started",
      description: `New game with ${playerCount} players initialized!`,
    });
  }, []);

  // Roll dice and move player
  const rollDice = useCallback(() => {
    if (gameState.turnPhase !== 'roll') return;

    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const isDouble = die1 === die2;
    
    const currentPlayer = gameState.players[gameState.currentPlayer];
    let newPosition = (currentPlayer.position + die1 + die2) % 40;
    let updatedPlayer = { ...currentPlayer };
    let newDoubleRolls = isDouble ? gameState.doubleRolls + 1 : 0;
    let turnPhase: 'roll' | 'action' | 'end' = 'action';
    let lastAction = `${currentPlayer.name} rolled ${die1 + die2}`;
    
    // Check if player is in jail
    if (currentPlayer.jailTurns > 0) {
      if (isDouble) {
        // Player rolls doubles and gets out of jail
        updatedPlayer.jailTurns = 0;
        lastAction = `${currentPlayer.name} rolled doubles and got out of jail!`;
      } else {
        // Player stays in jail
        updatedPlayer.jailTurns -= 1;
        if (updatedPlayer.jailTurns === 0) {
          lastAction = `${currentPlayer.name}'s jail time is up!`;
        } else {
          lastAction = `${currentPlayer.name} remains in jail for ${updatedPlayer.jailTurns} more turns.`;
          turnPhase = 'end';
        }
      }
    } else if (newDoubleRolls === 3) {
      // Player rolled 3 doubles in a row, go to jail
      updatedPlayer.position = JAIL_POSITION;
      updatedPlayer.jailTurns = 3;
      newDoubleRolls = 0;
      lastAction = `${currentPlayer.name} rolled 3 doubles in a row and went to jail!`;
      turnPhase = 'end';
    } else {
      // Normal movement
      // Check if player passed GO
      if (newPosition < currentPlayer.position) {
        updatedPlayer.money += GO_MONEY;
        lastAction = `${currentPlayer.name} passed GO and collected $${GO_MONEY}!`;
      }
      
      // Check if landed on Go To Jail
      if (newPosition === 30) {
        newPosition = JAIL_POSITION;
        updatedPlayer.jailTurns = 3;
        lastAction = `${currentPlayer.name} landed on Go To Jail and was sent to jail!`;
      }
      
      updatedPlayer.position = newPosition;
    }

    // Update the player in the state
    const updatedPlayers = [...gameState.players];
    updatedPlayers[gameState.currentPlayer] = updatedPlayer;

    setGameState(prev => ({
      ...prev,
      players: updatedPlayers,
      dice: [die1, die2],
      doubleRolls: newDoubleRolls,
      turnPhase,
      lastAction
    }));

    // Show toast for the roll
    toast({
      title: "Dice Rolled",
      description: lastAction,
    });
  }, [gameState]);

  // Buy property
  const buyProperty = useCallback(() => {
    const currentPlayer = gameState.players[gameState.currentPlayer];
    const currentPosition = currentPlayer.position;
    const property = gameState.properties.find(p => p.position === currentPosition);
    
    if (!property || property.type === 'special' || property.type === 'tax') {
      toast({
        title: "Cannot Buy",
        description: "This space cannot be purchased!",
        variant: "destructive",
      });
      return;
    }
    
    // Check if property is already owned
    const isOwned = gameState.players.some(player => 
      player.properties.includes(property.id)
    );
    
    if (isOwned) {
      toast({
        title: "Already Owned",
        description: "This property is already owned!",
        variant: "destructive",
      });
      return;
    }
    
    // Check if player has enough money
    if (currentPlayer.money < property.price) {
      toast({
        title: "Insufficient Funds",
        description: `You need $${property.price} to buy this property!`,
        variant: "destructive",
      });
      return;
    }
    
    // Buy the property
    const updatedPlayer = {
      ...currentPlayer,
      money: currentPlayer.money - property.price,
      properties: [...currentPlayer.properties, property.id]
    };
    
    const updatedPlayers = [...gameState.players];
    updatedPlayers[gameState.currentPlayer] = updatedPlayer;
    
    setGameState(prev => ({
      ...prev,
      players: updatedPlayers,
      lastAction: `${currentPlayer.name} bought ${property.name} for $${property.price}`
    }));
    
    toast({
      title: "Property Purchased",
      description: `You bought ${property.name} for $${property.price}!`,
    });
  }, [gameState]);

  // End turn and move to next player
  const endTurn = useCallback(() => {
    // Check if we need to collect rent first
    const currentPlayer = gameState.players[gameState.currentPlayer];
    const currentPosition = currentPlayer.position;
    const property = gameState.properties.find(p => p.position === currentPosition);
    
    if (property && property.type !== 'special' && property.type !== 'tax') {
      // Find if the property is owned by another player
      const ownerIndex = gameState.players.findIndex(player => 
        player.id !== currentPlayer.id && player.properties.includes(property.id)
      );
      
      if (ownerIndex !== -1) {
        const owner = gameState.players[ownerIndex];
        const baseRent = property.rent[0];
        
        // Calculate rent (simplified for now)
        let rentAmount = baseRent;
        
        // Transfer money from current player to owner
        const updatedCurrentPlayer = {
          ...currentPlayer,
          money: currentPlayer.money - rentAmount
        };
        
        const updatedOwner = {
          ...owner,
          money: owner.money + rentAmount
        };
        
        const updatedPlayers = [...gameState.players];
        updatedPlayers[gameState.currentPlayer] = updatedCurrentPlayer;
        updatedPlayers[ownerIndex] = updatedOwner;
        
        setGameState(prev => ({
          ...prev,
          players: updatedPlayers,
          lastAction: `${currentPlayer.name} paid $${rentAmount} rent to ${owner.name} for ${property.name}`
        }));
        
        toast({
          title: "Rent Paid",
          description: `You paid $${rentAmount} rent to ${owner.name} for ${property.name}!`,
        });
      }
    }
    
    // Move to next player's turn
    let nextPlayerIndex = (gameState.currentPlayer + 1) % gameState.players.length;
    
    setGameState(prev => ({
      ...prev,
      currentPlayer: nextPlayerIndex,
      turnPhase: 'roll',
      lastAction: `It's now ${gameState.players[nextPlayerIndex].name}'s turn`
    }));
    
    toast({
      title: "Turn Ended",
      description: `It's now ${gameState.players[nextPlayerIndex].name}'s turn!`,
    });
  }, [gameState]);

  // Reset game
  const resetGame = useCallback(() => {
    localStorage.removeItem('monopolyGameState');
    setGameState({ ...initialGameState });
    
    toast({
      title: "Game Reset",
      description: "Game has been reset. Start a new game!",
    });
  }, []);

  return {
    gameState,
    initializeGame,
    rollDice,
    buyProperty,
    endTurn,
    resetGame
  };
}
