
import React from 'react';
import { cn } from '@/lib/utils';
import { Property } from '@/lib/gameData';

interface PropertyCardProps {
  property: Property;
  isOwned?: boolean;
  ownerColor?: string;
  onClick?: () => void;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isOwned = false,
  ownerColor,
  onClick,
  className
}) => {
  if (property.type === 'special' || property.type === 'tax') {
    return (
      <div 
        className={cn(
          'property-card p-4 rounded-lg bg-white shadow-md transition-all',
          className
        )}
        onClick={onClick}
      >
        <h3 className="font-bold text-center">{property.name}</h3>
        <p className="text-center text-sm text-muted-foreground mt-2">
          {property.type === 'tax' ? `Pay $${property.rent[0]}` : 'Special Space'}
        </p>
      </div>
    );
  }
  
  const getColorClass = () => {
    if (!property.colorGroup) return 'bg-gray-200';
    
    switch (property.colorGroup) {
      case 'brown': return 'bg-monopoly-brown';
      case 'lightBlue': return 'bg-monopoly-lightBlue';
      case 'pink': return 'bg-monopoly-pink';
      case 'orange': return 'bg-monopoly-orange';
      case 'red': return 'bg-monopoly-red';
      case 'yellow': return 'bg-monopoly-yellow';
      case 'green': return 'bg-monopoly-green';
      case 'darkBlue': return 'bg-monopoly-darkBlue';
      default: return 'bg-gray-200';
    }
  };
  
  return (
    <div 
      className={cn(
        'property-card rounded-lg bg-white shadow-md overflow-hidden transition-all',
        isOwned ? 'ring-2' : 'hover:shadow-lg cursor-pointer',
        className
      )}
      style={{ borderColor: ownerColor }}
      onClick={onClick}
    >
      {property.type === 'property' && (
        <div className={cn('h-8 w-full', getColorClass())} />
      )}
      
      <div className="p-3">
        <h3 className="font-bold text-sm">{property.name}</h3>
        
        <div className="mt-2 text-xs space-y-1">
          {property.type === 'property' && (
            <>
              <div className="flex justify-between">
                <span>Price:</span>
                <span className="font-medium">${property.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Rent:</span>
                <span className="font-medium">${property.rent[0]}</span>
              </div>
              {property.houseCost && (
                <div className="flex justify-between">
                  <span>House Cost:</span>
                  <span className="font-medium">${property.houseCost}</span>
                </div>
              )}
            </>
          )}
          
          {property.type === 'railroad' && (
            <>
              <div className="flex justify-between">
                <span>Price:</span>
                <span className="font-medium">${property.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Rent:</span>
                <span className="font-medium">${property.rent[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>2 RRs:</span>
                <span className="font-medium">${property.rent[1]}</span>
              </div>
              <div className="flex justify-between">
                <span>4 RRs:</span>
                <span className="font-medium">${property.rent[3]}</span>
              </div>
            </>
          )}
          
          {property.type === 'utility' && (
            <>
              <div className="flex justify-between">
                <span>Price:</span>
                <span className="font-medium">${property.price}</span>
              </div>
              <div className="flex justify-between">
                <span>1 Utility:</span>
                <span className="font-medium">×{property.rent[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>2 Utilities:</span>
                <span className="font-medium">×{property.rent[1]}</span>
              </div>
            </>
          )}
        </div>
        
        {isOwned && (
          <div 
            className="mt-2 py-1 px-2 rounded-full text-xs text-white text-center"
            style={{ backgroundColor: ownerColor }}
          >
            Owned
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
