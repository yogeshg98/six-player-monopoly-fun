
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DiceRollerProps {
  diceValues: [number, number];
  onRoll: () => void;
  disabled?: boolean;
}

const DiceRoller: React.FC<DiceRollerProps> = ({
  diceValues,
  onRoll,
  disabled = false
}) => {
  const [isRolling, setIsRolling] = useState(false);
  
  const handleRoll = () => {
    if (disabled || isRolling) return;
    
    setIsRolling(true);
    
    // Animate dice roll
    setTimeout(() => {
      onRoll();
      setIsRolling(false);
    }, 600);
  };
  
  const renderDots = (value: number) => {
    // Configuration for dot positions based on dice value
    const dotPositions = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
    };
    
    const positions = dotPositions[value as keyof typeof dotPositions];
    
    const getPositionClass = (pos: string) => {
      switch (pos) {
        case 'top-left': return 'top-[20%] left-[20%]';
        case 'top-right': return 'top-[20%] right-[20%]';
        case 'middle-left': return 'top-[50%] left-[20%] -translate-y-1/2';
        case 'middle-right': return 'top-[50%] right-[20%] -translate-y-1/2';
        case 'bottom-left': return 'bottom-[20%] left-[20%]';
        case 'bottom-right': return 'bottom-[20%] right-[20%]';
        case 'center': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
        default: return '';
      }
    };
    
    return positions.map((pos, i) => (
      <div 
        key={i} 
        className={cn(
          'absolute w-[18%] h-[18%] rounded-full bg-black',
          getPositionClass(pos)
        )}
      />
    ));
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            className={cn(
              'dice bg-white rounded-lg shadow-lg',
              isRolling ? 'animate-dice-roll' : ''
            )}
          >
            {renderDots(diceValues[i])}
          </div>
        ))}
      </div>
      
      <Button 
        onClick={handleRoll} 
        disabled={disabled || isRolling}
        className={cn(
          'px-8 mt-2',
          isRolling ? 'opacity-50' : ''
        )}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </Button>
      
      {diceValues[0] === diceValues[1] && diceValues[0] > 0 && (
        <div className="text-sm text-center text-primary-foreground px-3 py-1 bg-primary rounded-full mt-1">
          Doubles!
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
