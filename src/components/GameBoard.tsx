
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
    const positions = 40; // Total number of positions on the board
    const sideLength = 11; // Number of cells per side including corners
    
    // Bottom row (0-10) - right to left
    if (position >= 0 && position <= 10) {
      return { gridColumn: sideLength - position, gridRow: sideLength };
    } 
    // Left column (11-20) - bottom to top
    else if (position <= 20) {
      return { gridColumn: 1, gridRow: sideLength - (position - 10) };
    } 
    // Top row (21-30) - left to right
    else if (position <= 30) {
      return { gridColumn: position - 20, gridRow: 1 };
    } 
    // Right column (31-39) - top to bottom
    else {
      return { gridColumn: sideLength, gridRow: position - 30 };
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
          const isCorner = [0, 10, 20, 30].includes(property.position);
          
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
          className="absolute top-[25%] left-[25%] w-[50%] h-[50%] flex items-center justify-center bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-lg"
          style={{ transform: 'rotate(-45deg)' }}
        >
          <div className="glass p-3 rounded-2xl shadow-glass flex flex-col items-center justify-center">
            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight text-primary/80 mb-1">MONOPOLY</h1>
            <div className="text-xs text-primary/60 font-medium">ONLINE</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
