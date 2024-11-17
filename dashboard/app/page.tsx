'use client';

import { useEffect, useState } from 'react';
import { Search, ListFilter } from 'lucide-react';
import Sidebar from '@/components/SideBar';
import GroupTable from '@/components/GroupTable';
import SidePanel from '@/components/SidePanel';
import AppHeader from '@/components/Appheader';
import { WhatsAppGroup } from '@/types';
import { fetchGroups } from '@/libs/supabase';

interface SearchHeaderProps {
  className?: string;
}

const SearchHeader = ({ className }: SearchHeaderProps): JSX.Element => (
  <div className={`bg-white border-b border-gray-200 ${className}`}>
    <div className="px-6 py-4 flex items-center justify-between">
      <div className="flex-1 flex items-center space-x-4 max-w-sm">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button className="flex items-center px-3 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50">
          <ListFilter className="w-5 h-5 mr-2" />
          Filter
        </button>
      </div>
      <div className="flex space-x-3">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Bulk message
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Group Actions
        </button>
      </div>
    </div>
  </div>
);

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps): JSX.Element => (
  <div className={`flex items-center justify-center h-full ${className}`}>
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
  </div>
);

interface SidePanelContainerProps {
  isLoading: boolean;
  groups: WhatsAppGroup[];
  selectedGroup: WhatsAppGroup | null;
}

const SidePanelContainer = ({ isLoading, groups, selectedGroup }: SidePanelContainerProps): JSX.Element => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!groups.length) {
    return <div className="p-6 text-center text-gray-500">No groups available</div>;
  }

  if (!selectedGroup) {
    return <div className="p-6 text-center text-gray-500">Select a group to view details</div>;
  }

  return <SidePanel group={selectedGroup} />;
};

export default function Page(): JSX.Element {
  const [groups, setGroups] = useState<WhatsAppGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<WhatsAppGroup | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGroups();
        setGroups(data);
        
        if (data.length > 0) {
          setSelectedGroup(data[0]);
        }
      } catch (error) {
        console.error('Error loading groups:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadGroups();
  }, []); // Removed selectedGroup from dependencies

  const handleGroupSelect = (group: WhatsAppGroup) => {
    setSelectedGroup(group);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <AppHeader />

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col min-w-0">
            <SearchHeader />

            <div className="flex-1 min-h-0">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <GroupTable 
                  groups={groups}
                  selectedGroup={selectedGroup}
                  onGroupSelect={handleGroupSelect}
                />
              )}
            </div>
          </div>

          <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
            <SidePanelContainer 
              isLoading={isLoading}
              groups={groups}
              selectedGroup={selectedGroup}
            />
          </div>
        </div>
      </div>
    </div>
  );
}