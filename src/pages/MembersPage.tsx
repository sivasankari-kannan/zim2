import React from 'react';
import { UserPlus } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import MemberList from '../components/member/MemberList';
import { Link } from 'react-router-dom';

const MembersPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader 
        title="Members / Trainers" 
        description="Manage your gym members and trainers"
      />
      
      <MemberList />
    </div>
  );
};

export default MembersPage;