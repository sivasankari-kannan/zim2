import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Edit, Trash2, UserPlus, ExternalLink } from 'lucide-react';
import { Member, Trainer } from '../../types';
import { members, trainers, memberships } from '../../data/mockData';
import { formatDate } from '../../lib/utils';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const MemberList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [membersList, setMembersList] = useState(members);
  const [trainersList, setTrainersList] = useState(trainers);
  
  const filteredMembers = membersList.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.memberId.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter ? member.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const filteredTrainers = trainersList.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.phone.includes(searchTerm) ||
      trainer.trainerId.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter ? trainer.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  const getMembershipName = (id: string) => {
    const membership = memberships.find((m) => m.id === id);
    return membership ? membership.name : 'Unknown';
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      setMembersList(prev => prev.filter(member => member.id !== id));
    }
  };

  const handleDeleteTrainer = (id: string) => {
    if (confirm('Are you sure you want to delete this trainer?')) {
      setTrainersList(prev => prev.filter(trainer => trainer.id !== id));
    }
  };

  const handleWhatsAppMessage = (phone: string, name: string) => {
    const message = `Hi ${name}, this is a message from your gym.`;
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-4 animate-enter">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Input
          placeholder="Search by name, email, phone or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search size={18} />}
          className="sm:max-w-xs"
        />
      </div>

      <div className="bg-white shadow rounded-lg border border-gray-200 mb-8">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Members List</h2>
          <Link to="/members/new">
            <Button variant="primary" leftIcon={<UserPlus size={16} />}>
              Add Member
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membership
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.memberId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
                          alt={member.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getMembershipName(member.membershipId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(member.joinDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusBadgeVariant(member.status)}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleWhatsAppMessage(member.phone, member.name)}
                      >
                        <ExternalLink size={16} />
                      </Button>
                      <Link to={`/members/${member.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Trainers List</h2>
          <Link to="/trainers/new">
            <Button variant="primary" leftIcon={<UserPlus size={16} />}>
              Add Trainer
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trainer ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trainer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialization
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTrainers.map((trainer) => (
                <tr key={trainer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trainer.trainerId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={trainer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(trainer.name)}&background=0EA5E9&color=fff`}
                          alt={trainer.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{trainer.name}</div>
                        <div className="text-gray-500">{trainer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trainer.specialization}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trainer.experience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusBadgeVariant(trainer.status)}>
                      {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleWhatsAppMessage(trainer.phone, trainer.name)}
                      >
                        <ExternalLink size={16} />
                      </Button>
                      <Link to={`/trainers/${trainer.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteTrainer(trainer.id)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberList;