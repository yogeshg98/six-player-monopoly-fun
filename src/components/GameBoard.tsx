
import React, { useRef, useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle responsive board sizing
  useEffect(() => {
    const handleResize = () => {
      const board = boardRef.current;
      if (!board) return;
      
      // Make the board square
      const width = board.clientWidth;
      board.style.height = `${width}px`;
      
      // Update mobile state
      setIsMobile(window.innerWidth < 768);
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
        'board-grid relative bg-gradient-to-br from-emerald-50 to-sky-50 rounded-lg overflow-hidden shadow-xl border-2 border-gray-300',
        className
      )}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(11, 1fr)',
        gridTemplateRows: 'repeat(11, 1fr)',
        gap: '2px',
        maxWidth: '100%',
        margin: '0 auto',
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
              'cursor-pointer hover:ring-2 hover:ring-primary hover:ring-opacity-60 transition-all scale-in-hover',
              squareClassName
            )}
            style={{ 
              gridColumn, 
              gridRow,
              boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => onSelectSquare?.(property)}
            isMobile={isMobile}
          />
        );
      })}
      
      {/* Center of the board with gradient background */}
      <div 
        className="absolute top-[15%] left-[15%] w-[70%] h-[70%] flex items-center justify-center bg-gradient-to-br from-blue-50/70 to-purple-50/70 rounded-lg"
        style={{ transform: 'rotate(-45deg)' }}
      >
        <div className="glass p-4 rounded-2xl shadow-glass flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary/90 mb-2">MONOPOLY</h1>
          <div className="text-xs md:text-sm text-primary/60 font-medium">ONLINE</div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
