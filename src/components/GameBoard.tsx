
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import BoardSquare from './BoardSquare';
import { Player, Property } from '@/lib/gameData';

interface GameBoardProps {
  properties: Property[];
  players: Player[];
  onSelectSquare?: (property: Property) => void;
  className?: string;
}

const GameBoard: React.FC<GameBoardProps> = ({
  properties,
  players,
  onSelectSquare,
  className
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  
  // Handle responsive board sizing
  useEffect(() => {
    const handleResize = () => {
      const board = boardRef.current;
      if (!board) return;
      
      // Make the board square
      const width = board.clientWidth;
      board.style.height = `${width}px`;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Helper to place properties in the correct grid position
  const getGridPosition = (position: number) => {
    const size = 11; // 11x11 grid
    
    // Bottom row (0-10)
    if (position <= 10) {
      return { gridColumn: 11 - position, gridRow: 11 };
    }
    // Left column (11-20)
    else if (position <= 20) {
      return { gridColumn: 1, gridRow: 11 - (position - 10) };
    }
    // Top row (21-30)
    else if (position <= 30) {
      return { gridColumn: position - 20, gridRow: 1 };
    }
    // Right column (31-39)
    else {
      return { gridColumn: 11, gridRow: position - 30 };
    }
  };
  
  const getSquareClassName = (position: number) => {
    // Corner squares should be larger
    if (position % 10 === 0) {
      return 'col-span-1 row-span-1';
    }
    return '';
  };
  
  // Make sure to use all 40 properties from the array
  const sortedProperties = [...properties].sort((a, b) => a.position - b.position);
  
  return (
    <div 
      ref={boardRef}
      className={cn(
        'board-grid relative bg-monopoly-board rounded-lg overflow-hidden shadow-xl border-2 border-gray-300',
        className
      )}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(11, 1fr)',
        gridTemplateRows: 'repeat(11, 1fr)',
      }}
    >
      {sortedProperties.map((property) => {
        const { gridColumn, gridRow } = getGridPosition(property.position);
        const squareClassName = getSquareClassName(property.position);
        
        return (
          <BoardSquare
            key={property.id}
            property={property}
            players={players}
            className={cn(
              'cursor-pointer hover:ring-1 hover:ring-primary hover:ring-opacity-50 transition-all',
              squareClassName
            )}
            style={{ 
              gridColumn, 
              gridRow 
            }}
            onClick={() => onSelectSquare?.(property)}
          />
        );
      })}
      
      {/* Center of the board */}
      <div 
        className="absolute top-[15%] left-[15%] w-[70%] h-[70%] flex items-center justify-center"
        style={{ transform: 'rotate(-45deg)' }}
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black/60">MONOPOLY</h1>
      </div>
    </div>
  );
};

export default GameBoard;
