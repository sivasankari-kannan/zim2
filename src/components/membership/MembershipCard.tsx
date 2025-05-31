import React from 'react';
import { Check, Edit, Trash2 } from 'lucide-react';
import { Membership } from '../../types';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

interface MembershipCardProps {
  membership: Membership;
  isPopular?: boolean;
  onEdit?: (membership: Membership) => void;
  onDelete?: (membership: Membership) => void;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ 
  membership, 
  isPopular = false, 
  onEdit,
  onDelete
}) => {
  return (
    <div className={cn(
      "relative rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md p-6 animate-enter",
      isPopular && "border-primary-500 ring-1 ring-primary-500"
    )}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center mb-4",
        membership.color
      )}>
        <span className="text-white font-bold text-xl">
          {membership.name.charAt(0)}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-dark-900">{membership.name}</h3>
      
      <div className="mt-2 mb-5">
        <span className="text-3xl font-bold">${membership.price}</span>
        <span className="text-gray-500 ml-1">/ {membership.duration} days</span>
      </div>
      
      <p className="text-gray-500 mb-6">{membership.description}</p>
      
      <ul className="mb-8 space-y-3">
        {membership.features.map((feature, index) => (
          <li key={index} className="flex">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex gap-2">
        <Button 
          variant={isPopular ? "primary" : "outline"} 
          className="flex-1"
          onClick={() => onEdit && onEdit(membership)}
          leftIcon={<Edit size={16} />}
        >
          Edit Plan
        </Button>
        <Button 
          variant="outline" 
          className="text-red-500 hover:bg-red-50"
          onClick={() => onDelete && onDelete(membership)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default MembershipCard;