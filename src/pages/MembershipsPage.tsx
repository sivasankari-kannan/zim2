import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import MembershipCard from '../components/membership/MembershipCard';
import { memberships } from '../data/mockData';
import { Membership } from '../types';

const MembershipsPage: React.FC = () => {
  const navigate = useNavigate();
  const [membershipsList, setMembershipsList] = useState(memberships);

  const handleEdit = (membership: Membership) => {
    navigate(`/memberships/${membership.id}/edit`);
  };

  const handleDelete = (membership: Membership) => {
    // In a real app, this would call an API
    setMembershipsList(prev => prev.filter(m => m.id !== membership.id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader 
        title="Memberships" 
        description="Manage your gym membership plans"
        action={
          <Link to="/memberships/new">
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              Create Plan
            </Button>
          </Link>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
        {membershipsList.map((membership, idx) => (
          <MembershipCard 
            key={membership.id} 
            membership={membership}
            isPopular={idx === 1}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MembershipsPage;