
import React from 'react';
import { cn } from '@/lib/utils';
import { Player, Property } from '@/lib/gameData';
import { 
  Home, 
  Lightbulb, 
  TrainFront, 
  DollarSign, 
  HelpCircle, 
  ParkingCircle, 
  LockKeyhole, 
  ArrowRight
} from 'lucide-react';

interface BoardSquareProps {
  property: Property;
  players: Player[];
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isMobile?: boolean;
  isCorner?: boolean;
}

const BoardSquare: React.FC<BoardSquareProps> = ({
  property,
  players,
  className,
  style,
  onClick,
  isMobile = false,
  isCorner = false
}) => {
  // Filter players that are on this square
  const playersOnSquare = players.filter(player => player.position === property.position);
  
  // Find property owner if any
  const owner = players.find(player => player.properties.includes(property.id));
  
  const getColorClass = () => {
    if (!property.colorGroup) return 'bg-gray-100';
    
    switch (property.colorGroup) {
      case 'brown': return 'bg-monopoly-brown';
      case 'lightBlue': return 'bg-monopoly-lightBlue';
      case 'pink': return 'bg-monopoly-pink';
      case 'orange': return 'bg-monopoly-orange';
      case 'red': return 'bg-monopoly-red';
      case 'yellow': return 'bg-monopoly-yellow';
      case 'green': return 'bg-monopoly-green';
      case 'darkBlue': return 'bg-monopoly-darkBlue';
      default: return 'bg-gray-100';
    }
  };
  
  const getSpecialClass = () => {
    if (property.type !== 'special' && property.type !== 'tax') return '';
    
    switch (property.name) {
      case 'GO': return 'bg-gradient-to-br from-green-50 to-emerald-100';
      case 'Jail / Just Visiting': return 'bg-gradient-to-br from-orange-50 to-amber-100';
      case 'Free Parking': return 'bg-gradient-to-br from-red-50 to-rose-100';
      case 'Go To Jail': return 'bg-gradient-to-br from-red-50 to-pink-100';
      case 'Chance': return 'bg-gradient-to-br from-orange-50 to-amber-100';
      case 'Community Chest': return 'bg-gradient-to-br from-blue-50 to-sky-100';
      case 'Income Tax': return 'bg-gradient-to-br from-gray-50 to-slate-100';
      case 'Luxury Tax': return 'bg-gradient-to-br from-gray-50 to-slate-100';
      default: return '';
    }
  };
  
  const getPropertyIcon = () => {
    switch (property.type) {
      case 'property':
        return <Home className="h-3 w-3 text-gray-700" />;
      case 'railroad':
        return <TrainFront className="h-3 w-3 text-gray-700" />;
      case 'utility':
        return property.name === 'Electric Company' ? 
          <Lightbulb className="h-3 w-3 text-yellow-500 fill-yellow-100" /> :
          <span className="text-blue-500 text-xs">💧</span>;
      case 'tax':
        return <DollarSign className="h-3 w-3 text-gray-700" />;
      case 'special':
        if (property.name === 'Chance') return <HelpCircle className="h-3 w-3 text-orange-500" />;
        if (property.name === 'Community Chest') return <span className="text-blue-500 text-xs">📦</span>;
        if (property.name === 'Free Parking') return <ParkingCircle className="h-3 w-3 text-red-500" />;
        if (property.name.includes('Jail')) return <LockKeyhole className="h-3 w-3 text-orange-600" />;
        if (property.name === 'GO') return <ArrowRight className="h-3 w-3 text-green-600" />;
        return null;
      default:
        return null;
    }
  };
  
  const renderCornerSquare = () => {
    switch (property.name) {
      case 'GO':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full p-1 text-center">
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-green-600 rotate-[225deg]" />
            <div className="text-green-600 font-bold text-xs md:text-sm mt-1">GO</div>
            <div className="text-[7px] md:text-[9px] text-green-600">COLLECT $200</div>
          </div>
        );
      case 'Jail / Just Visiting':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full p-1 text-center">
            <div className="flex items-center justify-center bg-orange-100 w-3/4 h-3/4 rounded-md border border-orange-300">
              <LockKeyhole className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
              <div className="absolute bottom-0 left-0 w-full text-[7px] md:text-[9px] text-orange-600 font-semibold">JUST VISITING</div>
            </div>
          </div>
        );
      case 'Free Parking':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full p-1 text-center">
            <ParkingCircle className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
            <div className="text-red-600 font-bold text-xs md:text-sm mt-1">FREE</div>
            <div className="text-[7px] md:text-[9px] text-red-600">PARKING</div>
          </div>
        );
      case 'Go To Jail':
        return (
          <div className="flex flex-col items-center justify-center h-full w-full p-1 text-center">
            <div className="text-red-600 font-bold text-xs md:text-sm">GO TO</div>
            <LockKeyhole className="h-4 w-4 md:h-5 md:w-5 text-red-600 my-1" />
            <div className="text-red-600 font-bold text-xs md:text-sm">JAIL</div>
          </div>
        );
      default:
        return null;
    }
  };
  
  const renderNormalSquare = () => {
    // For special properties, show special rendering
    if (property.type === 'special') {
      switch (property.name) {
        case 'Chance':
          return (
            <div className="flex flex-col items-center justify-center">
              <div className="text-orange-600 font-bold text-xs">?</div>
              <div className="text-orange-600 text-[6px] mt-0.5">CHANCE</div>
            </div>
          );
        case 'Community Chest':
          return (
            <div className="flex flex-col items-center justify-center">
              <div className="text-blue-600 font-bold text-xs">CC</div>
              <div className="text-blue-600 text-[6px] mt-0.5">COMMUNITY</div>
            </div>
          );
        default:
          return <div className="text-[6px] sm:text-[7px] md:text-[8px] text-center leading-tight">{property.name}</div>;
      }
    }
    
    if (property.type === 'tax') {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="text-[6px] sm:text-[7px] md:text-[8px] text-center leading-tight font-semibold">{property.name}</div>
          <div className="text-[6px] sm:text-[7px] font-semibold mt-0.5">PAY ${property.rent[0]}</div>
        </div>
      );
    }
    
    // For normal properties, show name and price
    return (
      <div className="text-center w-full px-0.5 flex flex-col items-center">
        <div className="text-[5px] sm:text-[6px] md:text-[7px] leading-tight font-medium w-full line-clamp-2 overflow-hidden">
          {property.name}
        </div>
        <div className="text-[6px] sm:text-[7px] font-semibold mt-0.5">${property.price}</div>
      </div>
    );
  };
  
  return (
    <div
      className={cn(
        'relative overflow-hidden border border-gray-300 flex flex-col items-center justify-between transition-all',
        property.type === 'property' ? 'p-0.5' : 'p-0.5',
        getSpecialClass(),
        isCorner ? 'rounded-lg bg-white/90' : 'rounded-md bg-white/80',
        className
      )}
      style={{
        ...style,
        backdropFilter: 'blur(1px)',
      }}
      onClick={onClick}
    >
      {property.type === 'property' && !isCorner && (
        <div className={cn('h-2 w-full rounded-t-sm', getColorClass())} />
      )}
      
      <div className="flex-1 flex items-center justify-center w-full">
        {isCorner ? renderCornerSquare() : renderNormalSquare()}
      </div>
      
      {!isCorner && (
        <div className="absolute top-0 right-0 p-0.5">
          {getPropertyIcon()}
        </div>
      )}
      
      {owner && (
        <div 
          className="absolute top-0 left-0 w-2 h-2 rounded-full shadow-sm"
          style={{ backgroundColor: owner.color }}
        />
      )}
      
      {/* Player tokens */}
      <div className="absolute bottom-0 left-0 w-full flex flex-wrap justify-center gap-0.5 p-0.5">
        {playersOnSquare.map(player => (
          <div
            key={player.id}
            className="w-2 h-2 rounded-full player-token shadow-sm"
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
