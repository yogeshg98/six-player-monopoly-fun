
import React from 'react';
import { cn } from '@/lib/utils';
import { Player, Property } from '@/lib/gameData';
import { Home, Lightbulb, TrainFront, DollarSign, HelpCircle, ParkingCircle, LockKeyhole } from 'lucide-react';

interface BoardSquareProps {
  property: Property;
  players: Player[];
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const BoardSquare: React.FC<BoardSquareProps> = ({
  property,
  players,
  className,
  style,
  onClick
}) => {
  // Filter players that are on this square
  const playersOnSquare = players.filter(player => player.position === property.position);
  
  // Find property owner if any
  const owner = players.find(player => player.properties.includes(property.id));
  
  const getColorClass = () => {
    if (!property.colorGroup) return 'bg-monopoly-board';
    
    switch (property.colorGroup) {
      case 'brown': return 'bg-monopoly-brown';
      case 'lightBlue': return 'bg-monopoly-lightBlue';
      case 'pink': return 'bg-monopoly-pink';
      case 'orange': return 'bg-monopoly-orange';
      case 'red': return 'bg-monopoly-red';
      case 'yellow': return 'bg-monopoly-yellow';
      case 'green': return 'bg-monopoly-green';
      case 'darkBlue': return 'bg-monopoly-darkBlue';
      default: return 'bg-monopoly-board';
    }
  };
  
  const getSpecialClass = () => {
    if (property.type !== 'special' && property.type !== 'tax') return '';
    
    switch (property.name) {
      case 'GO': return 'bg-green-50';
      case 'Jail / Just Visiting': return 'bg-orange-50';
      case 'Free Parking': return 'bg-red-50';
      case 'Go To Jail': return 'bg-red-50';
      case 'Chance': return 'bg-orange-200 bg-opacity-20';
      case 'Community Chest': return 'bg-blue-200 bg-opacity-20';
      case 'Income Tax': return 'bg-gray-200';
      case 'Luxury Tax': return 'bg-gray-200';
      default: return '';
    }
  };
  
  const getPropertyIcon = () => {
    switch (property.type) {
      case 'property':
        return <Home className="h-3 w-3 text-gray-600" />;
      case 'railroad':
        return <TrainFront className="h-3 w-3 text-gray-600" />;
      case 'utility':
        return property.name === 'Electric Company' ? 
          <Lightbulb className="h-3 w-3 text-yellow-500" /> :
          <span className="text-blue-500 text-xs">💧</span>;
      case 'tax':
        return <DollarSign className="h-3 w-3 text-gray-600" />;
      case 'special':
        if (property.name === 'Chance') return <HelpCircle className="h-3 w-3 text-orange-500" />;
        if (property.name === 'Community Chest') return <span className="text-blue-500 text-xs">📦</span>;
        if (property.name === 'Free Parking') return <ParkingCircle className="h-3 w-3 text-red-500" />;
        if (property.name.includes('Jail')) return <LockKeyhole className="h-3 w-3 text-orange-500" />;
        if (property.name === 'GO') return <span className="text-green-500 text-xs">🏁</span>;
        return null;
      default:
        return null;
    }
  };
  
  const renderName = () => {
    // For special properties, show special rendering
    if (property.type === 'special') {
      switch (property.name) {
        case 'GO':
          return <div className="text-green-600 font-bold rotate-45">GO</div>;
        case 'Jail / Just Visiting':
          return <div className="text-orange-600 font-bold -rotate-45">JAIL</div>;
        case 'Free Parking':
          return <div className="text-red-600 font-bold -rotate-45">FREE</div>;
        case 'Go To Jail':
          return <div className="text-red-600 font-bold rotate-45">GO TO JAIL</div>;
        case 'Chance':
          return <div className="text-orange-600 font-bold text-xs">?</div>;
        case 'Community Chest':
          return <div className="text-blue-600 font-bold text-xs">CC</div>;
        default:
          return <div className="text-xs truncate">{property.name}</div>;
      }
    }
    
    if (property.type === 'tax') {
      return <div className="text-xs truncate">TAX ${property.rent[0]}</div>;
    }
    
    // For normal properties, show name and price
    return (
      <div className="text-center">
        <div className="text-[7px] leading-tight truncate">{property.name}</div>
        <div className="text-[7px] font-semibold">${property.price}</div>
      </div>
    );
  };
  
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden border border-gray-200 flex flex-col items-center justify-between',
        property.type === 'property' ? 'p-1' : 'p-1',
        getSpecialClass(),
        className
      )}
      style={style}
      onClick={onClick}
    >
      {property.type === 'property' && (
        <div className={cn('h-2 w-full', getColorClass())} />
      )}
      
      <div className="flex-1 flex items-center justify-center">
        {renderName()}
      </div>
      
      <div className="absolute top-0 right-0 p-0.5">
        {getPropertyIcon()}
      </div>
      
      {owner && (
        <div 
          className="absolute top-0 left-0 w-2 h-2 rounded-full"
          style={{ backgroundColor: owner.color }}
        />
      )}
      
      {/* Player tokens */}
      <div className="absolute bottom-0 left-0 w-full flex flex-wrap justify-center gap-0.5 p-0.5">
        {playersOnSquare.map(player => (
          <div
            key={player.id}
            className="w-2 h-2 rounded-full player-token"
            style={{ backgroundColor: player.color }}
          >
            <span className="sr-only">{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardSquare;
