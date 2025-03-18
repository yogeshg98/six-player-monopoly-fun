
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import BoardSquare from './BoardSquare';
import { useIsMobile } from '@/hooks/use-mobile';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Handle responsive board sizing
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const board = boardRef.current;
      if (!board || !container) return;
      
      // Calculate container dimensions
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Determine the smaller dimension to make the board square
      const size = Math.min(containerWidth, containerHeight);
      
      // Set board size
      board.style.width = `${size}px`;
      board.style.height = `${size}px`;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Helper to place properties in the correct grid position
  const getGridPosition = (position: number) => {
    // First, determine which side of the board we're on
    if (position <= 10) {
      // Bottom row (0-10) - right to left
      return { gridColumn: 11 - position, gridRow: 11 };
    } else if (position <= 20) {
      // Left column (11-20) - bottom to top
      return { gridColumn: 1, gridRow: 11 - (position - 10) };
    } else if (position <= 30) {
      // Top row (21-30) - left to right
      return { gridColumn: position - 20, gridRow: 1 };
    } else {
      // Right column (31-39) - top to bottom
      return { gridColumn: 11, gridRow: position - 30 };
    }
  };
  
  // Make sure to use all 40 properties from the array
  const sortedProperties = [...properties].sort((a, b) => a.position - b.position);
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        'flex items-center justify-center w-full aspect-square max-w-full',
        className
      )}
    >
      <div 
        ref={boardRef}
        className={cn(
          'relative bg-gradient-to-br from-emerald-50 to-sky-50 rounded-lg overflow-hidden shadow-xl border-2 border-gray-300'
        )}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(11, 1fr)',
          gridTemplateRows: 'repeat(11, 1fr)',
          gap: '1px',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      >
        {sortedProperties.map((property) => {
          const { gridColumn, gridRow } = getGridPosition(property.position);
          const isCorner = property.position % 10 === 0;
          
          return (
            <BoardSquare
              key={property.id}
              property={property}
              players={players}
              className={cn(
                'cursor-pointer hover:ring-2 hover:ring-primary hover:ring-opacity-60 transition-all scale-in-hover',
                isCorner ? 'corner-square' : ''
              )}
              style={{ 
                gridColumn, 
                gridRow,
                boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)'
              }}
              onClick={() => onSelectSquare?.(property)}
              isMobile={isMobile}
              isCorner={isCorner}
            />
          );
        })}
        
        {/* Center logo - smaller to not overlap with properties */}
        <div 
          className="absolute top-[20%] left-[20%] w-[60%] h-[60%] flex items-center justify-center bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-lg"
          style={{ transform: 'rotate(-45deg)' }}
        >
          <div className="glass p-4 rounded-2xl shadow-glass flex flex-col items-center justify-center">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-primary/80 mb-2">MONOPOLY</h1>
            <div className="text-xs md:text-sm text-primary/60 font-medium">ONLINE</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
