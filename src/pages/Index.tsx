import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import GameBoard from '@/components/GameBoard';
import PlayerCard from '@/components/PlayerCard';
import DiceRoller from '@/components/DiceRoller';
import GameControls from '@/components/GameControls';
import PropertyCard from '@/components/PropertyCard';
import { useGameState } from '@/hooks/useGameState';
import { Property, Player } from '@/lib/gameData';
import { cn } from '@/lib/utils';
import { Book, DollarSign, Dice1, Trophy, Info, Users } from 'lucide-react';

const Index = () => {
  const { 
    gameState, 
    initializeGame, 
    rollDice, 
    buyProperty, 
    endTurn, 
    resetGame 
  } = useGameState();
  
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showStartDialog, setShowStartDialog] = useState(!gameState.gameStarted);
  const [playerCount, setPlayerCount] = useState('4');
  const [showPropertyDialog, setShowPropertyDialog] = useState(false);
  
  const handleStartGame = () => {
    const count = parseInt(playerCount, 10);
    initializeGame(count);
    setShowStartDialog(false);
    
    toast({
      title: "Game Started",
      description: `New game with ${count} players initialized!`,
    });
  };
  
  const handleSelectSquare = (property: Property) => {
    setSelectedProperty(property);
    setShowPropertyDialog(true);
  };
  
  const handleReset = () => {
    resetGame();
    setShowStartDialog(true);
  };
  
  const findPropertyOwner = (propertyId: number): Player | undefined => {
    return gameState.players.find(player => 
      player.properties.includes(propertyId)
    );
  };
  
  const getCurrentProperty = (): Property | undefined => {
    if (!gameState.gameStarted) return undefined;
    
    const currentPlayer = gameState.players[gameState.currentPlayer];
    return gameState.properties.find(p => p.position === currentPlayer.position);
  };
  
  if (!gameState.gameStarted) {
    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-background to-secondary/30">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-24 h-24 bg-primary/5 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-[20%] right-[10%] w-32 h-32 bg-primary/10 rounded-full animate-spin-slow" style={{ animationDuration: '12s' }}></div>
          <div className="absolute top-[60%] left-[15%] w-16 h-16 bg-primary/10 rounded-full animate-pulse-gentle"></div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 max-w-6xl mx-auto relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 animate-fade-in">
            Monopoly
            <span className="text-primary"> Online</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mb-12 animate-fade-in" style={{ animationDelay: '100ms' }}>
            A digital adaptation of the classic property trading board game for up to six players.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Button onClick={() => setShowStartDialog(true)} size="lg" className="gap-2">
              <Dice1 size={18} />
              Start New Game
            </Button>
            
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/how-to-play">
                <Book size={18} />
                How To Play
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="glass p-6 rounded-xl flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <Users size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiplayer</h3>
              <p className="text-muted-foreground">Play with up to 6 friends on the same device</p>
            </div>
            
            <div className="glass p-6 rounded-xl flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <DollarSign size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trade Properties</h3>
              <p className="text-muted-foreground">Buy, sell, and trade your way to victory</p>
            </div>
            
            <div className="glass p-6 rounded-xl flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <Trophy size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Empire</h3>
              <p className="text-muted-foreground">Construct houses and hotels to increase your wealth</p>
            </div>
          </div>
        </div>
        
        <footer className="py-6 px-4 border-t border-border">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Monopoly Online Game
            </p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <Link to="/how-to-play" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How to Play
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </div>
          </div>
        </footer>
        
        <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
          <DialogContent className="sm:max-w-md glass">
            <DialogHeader>
              <DialogTitle>New Game</DialogTitle>
              <DialogDescription>
                Select the number of players to begin a new game of Monopoly.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex items-center gap-4 py-4">
              <label htmlFor="players" className="text-sm font-medium">
                Players:
              </label>
              <Select
                value={playerCount}
                onValueChange={setPlayerCount}
              >
                <SelectTrigger id="players" className="w-full">
                  <SelectValue placeholder="Select number of players" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Players</SelectItem>
                  <SelectItem value="3">3 Players</SelectItem>
                  <SelectItem value="4">4 Players</SelectItem>
                  <SelectItem value="5">5 Players</SelectItem>
                  <SelectItem value="6">6 Players</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowStartDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleStartGame}>
                Start Game
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Monopoly Online</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/how-to-play" className="flex items-center gap-1">
                <Info size={16} />
                Rules
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset Game
            </Button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-lg font-semibold mb-2">Players</h2>
            <div className="space-y-3">
              {gameState.players.map((player, index) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  properties={gameState.properties}
                  isActive={index === gameState.currentPlayer}
                />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-6">
            <GameBoard
              properties={gameState.properties}
              players={gameState.players}
              onSelectSquare={handleSelectSquare}
            />
          </div>
          
          <div className="lg:col-span-3 space-y-6">
            <div className="glass p-4 rounded-lg shadow-glass">
              <h2 className="text-lg font-semibold mb-4">Last Action</h2>
              <p className="text-sm bg-background/50 p-3 rounded-md">
                {gameState.lastAction}
              </p>
            </div>
            
            <div className="glass p-4 rounded-lg shadow-glass">
              <DiceRoller
                diceValues={gameState.dice}
                onRoll={rollDice}
                disabled={gameState.turnPhase !== 'roll'}
              />
            </div>
            
            <GameControls
              currentPlayer={gameState.players[gameState.currentPlayer]}
              currentProperty={getCurrentProperty()}
              turnPhase={gameState.turnPhase}
              onRoll={rollDice}
              onBuy={buyProperty}
              onEndTurn={endTurn}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
      
      <Dialog open={showPropertyDialog} onOpenChange={setShowPropertyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
          </DialogHeader>
          
          {selectedProperty && (
            <div className="py-4">
              <PropertyCard
                property={selectedProperty}
                isOwned={!!findPropertyOwner(selectedProperty.id)}
                ownerColor={findPropertyOwner(selectedProperty.id)?.color}
                className="mx-auto"
              />
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {findPropertyOwner(selectedProperty.id) ? (
                  <p>
                    This property is owned by{' '}
                    <span 
                      className="font-medium"
                      style={{ color: findPropertyOwner(selectedProperty.id)?.color }}
                    >
                      {findPropertyOwner(selectedProperty.id)?.name}
                    </span>
                  </p>
                ) : (
                  selectedProperty.type !== 'special' && selectedProperty.type !== 'tax' && (
                    <p>This property is available for purchase</p>
                  )
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setShowPropertyDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
