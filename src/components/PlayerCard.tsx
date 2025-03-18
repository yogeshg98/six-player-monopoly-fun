
import React from 'react';
import { cn } from '@/lib/utils';
import { Player, Property } from '@/lib/gameData';
import PlayerAvatar from './PlayerAvatar';

interface PlayerCardProps {
  player: Player;
  properties: Property[];
  isActive?: boolean;
  className?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  properties,
  isActive = false,
  className
}) => {
  // Filter properties owned by this player
  const playerProperties = properties.filter(
    property => player.properties.includes(property.id)
  );
  
  return (
    <div 
      className={cn(
        'p-4 rounded-lg glass transition-all',
        isActive ? 'ring-2 ring-primary shadow-lg' : 'shadow-md',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <PlayerAvatar
          name={player.name}
          avatar={player.avatar}
          color={player.color}
          isActive={isActive}
          money={player.money}
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{player.name}</h3>
            <span className="font-mono font-medium">${player.money}</span>
          </div>
          
          {player.jailTurns > 0 && (
            <div className="mt-1 text-xs font-medium text-destructive">
              In Jail ({player.jailTurns} turns left)
            </div>
          )}
          
          <div className="mt-2">
            <h4 className="text-xs text-muted-foreground font-medium mb-1">
              Properties ({playerProperties.length})
            </h4>
            {playerProperties.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {playerProperties.map(property => (
                  <div 
                    key={property.id}
                    className={cn(
                      'w-3 h-3 rounded-full',
                      property.colorGroup ? `bg-monopoly-${property.colorGroup}` : 'bg-gray-300'
                    )}
                    title={property.name}
                  />
                ))}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground italic">
                No properties yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
