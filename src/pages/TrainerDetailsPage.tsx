import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, Award, Users } from 'lucide-react';
import { trainers, members } from '../data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { formatDate } from '../lib/utils';

const TrainerDetailsPage: React.FC = () => {
  const { id } = useParams();
  const trainer = trainers.find(t => t.id === id);
  
  // In a real app, this would be filtered based on the trainer's ID
  const assignedMembers = members.slice(0, 3); // Mock data: showing first 3 members

  if (!trainer) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Trainer not found</h2>
          <p className="mt-2 text-gray-600">The trainer you're looking for doesn't exist.</p>
          <Link to="/members" className="mt-4 inline-block">
            <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
              Back to Members
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src={trainer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(trainer.name)}&background=0EA5E9&color=fff`}
              alt={trainer.name}
              className="h-16 w-16 rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">{trainer.name}</h1>
              <div className="mt-1 flex items-center">
                <Badge variant={trainer.status === 'active' ? 'success' : 'danger'}>
                  {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
                </Badge>
                <span className="ml-2 text-sm text-gray-500">Trainer ID: {trainer.trainerId}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </dt>
                    <dd className="text-sm text-gray-900">{trainer.email}</dd>
                  </div>
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </dt>
                    <dd className="text-sm text-gray-900">{trainer.phone}</dd>
                  </div>
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Calendar className="h-4 w-4 mr-2" />
                      Joined
                    </dt>
                    <dd className="text-sm text-gray-900">{formatDate(trainer.joinDate)}</dd>
                  </div>
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Award className="h-4 w-4 mr-2" />
                      Experience
                    </dt>
                    <dd className="text-sm text-gray-900">{trainer.experience}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{trainer.specialization}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Assigned Members</span>
                  <Button variant="outline" size="sm">
                    Assign New Member
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-gray-200">
                  {assignedMembers.map((member) => (
                    <div key={member.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
                          alt={member.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <Link to={`/members/${member.id}`}>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetailsPage;