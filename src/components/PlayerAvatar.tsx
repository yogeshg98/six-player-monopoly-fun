
import React from 'react';
import { cn } from '@/lib/utils';

interface PlayerAvatarProps {
  name: string;
  avatar: string;
  color: string;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  money?: number;
  className?: string;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  name,
  avatar,
  color,
  isActive = false,
  size = 'md',
  money,
  className
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl'
  };
  
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div 
        className={cn(
          'relative flex items-center justify-center rounded-full transition-all',
          sizeClasses[size],
          isActive ? 'ring-4 ring-primary animate-pulse-gentle' : '',
        )}
        style={{ backgroundColor: color }}
      >
        <span className="text-white">{avatar}</span>
        
        {isActive && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping"></div>
        )}
      </div>
      
      <div className="mt-1 text-center">
        <p className={cn(
          'font-medium truncate',
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}>
          {name}
        </p>
        
        {money !== undefined && (
          <p className={cn(
            'text-muted-foreground',
            size === 'sm' ? 'text-xs' : 'text-sm'
          )}>
            ${money}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerAvatar;
