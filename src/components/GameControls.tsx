
import React from 'react';
import { Button } from '@/components/ui/button';
import { Player, Property } from '@/lib/gameData';

interface GameControlsProps {
  currentPlayer: Player;
  currentProperty?: Property;
  turnPhase: 'roll' | 'action' | 'end';
  onRoll: () => void;
  onBuy: () => void;
  onEndTurn: () => void;
  onReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  currentPlayer,
  currentProperty,
  turnPhase,
  onRoll,
  onBuy,
  onEndTurn,
  onReset,
}) => {
  // Check if player can buy the current property
  const canBuyProperty = () => {
    if (!currentProperty) return false;
    if (currentProperty.type === 'special' || currentProperty.type === 'tax') return false;
    if (currentProperty.price > currentPlayer.money) return false;
    
    // Already owned check would be here if we had the player data
    return turnPhase === 'action';
  };
  
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg glass shadow-glass">
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          {currentPlayer.name}'s Turn
        </h3>
        <p className="text-sm text-muted-foreground">
          ${currentPlayer.money} in cash
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={onRoll}
          disabled={turnPhase !== 'roll'}
          className="col-span-2 game-button"
          variant={turnPhase === 'roll' ? 'default' : 'outline'}
        >
          Roll Dice
        </Button>
        
        <Button
          onClick={onBuy}
          disabled={!canBuyProperty()}
          className="game-button"
          variant="outline"
        >
          Buy Property
        </Button>
        
        <Button
          onClick={onEndTurn}
          disabled={turnPhase !== 'action'}
          className="game-button"
          variant={turnPhase === 'action' ? 'default' : 'outline'}
        >
          End Turn
        </Button>
      </div>
      
      <div className="border-t border-gray-200 pt-2 mt-2">
        <Button
          onClick={onReset}
          variant="ghost"
          className="w-full text-sm text-destructive hover:text-destructive/90"
        >
          Reset Game
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
