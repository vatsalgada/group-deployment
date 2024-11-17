import { useState } from 'react';
import { X, MessageSquare, Users, Clock, Download, LogOut, AlertCircle, Plus, ChevronDown, RefreshCw  } from 'lucide-react';
import { WhatsAppGroup, IssueLog } from '../types';
import IssueCard from './IssueCard';
import LabelBadge from './LabelBadge';

interface SidePanelProps {
  group: WhatsAppGroup;
}

const SidePanel = ({ group }: SidePanelProps) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Members' | 'Logs'>('Overview');

  const getInitials = (name: string) => {
    return name?.charAt(0)?.toUpperCase() || '';
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-6 space-y-6">
        {/* Title and Refresh */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">
              {getInitials(group.entityOne)}
            </div>
            <h2 className="text-xs font-bold text-gray-600">
              {group.entityOne} {'<>'} {group.entityTwo}
            </h2>
          </div>
          <div className='flex  text-gray-400 text-xs gap-1'>
            
          <button className="text-gray-400 hover:text-gray-600">
            <RefreshCw className="w-4 h-4" />
          </button>
          Refresh
          </div>
          
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200">
          {(['Overview', 'Members', 'Logs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium ${
                activeTab === tab
                  ? 'text-green-700 border-b-2 border-green-700'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'Overview' && (
          <div className="p-6 space-y-3">
            {/* Info Grid */}
            <div className="grid grid-cols-[2fr,1fr] gap-y-4 text-xs text-gray-600 font-medium pb-4 border-b border-gray-200">
              <div className="text-gray-400">Last Active</div>
              <div>{group.lastActive}</div>
              
              <div className="text-gray-400">Disappearing Messages</div>
              <div className="flex items-center justify-between">
                <span>{group.disappearingMessages}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="text-gray-400">Send Message Permission</div>
              <div className="flex items-center justify-between">
                <span>{group.sendMessagePermission}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="text-gray-400">Project</div>
              <div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  group.project.type === 'Demo'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  # {group.project.name}
                </span>
              </div>
              
              <div className="text-gray-400">Labels</div>
              <div className="space-y-2 w-16">
                {group.labels?.map((label) => (
                  <LabelBadge key={label.id} label={label} />
                ))}
                <button className="flex w-24 items-center text-xs text-gray-500 gap-1 border border-gray-200 rounded-full px-2 py-1">
                  <span>+</span> Add Label
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 text-sm">
              <button className="flex items-center gap-2 py-1 text-gray-600 rounded-lg ">
                <Download className="w-4 h-4" />
                Export Chat
              </button>
              <button className="flex items-center gap-2  text-red-600 rounded-lg ">
                <LogOut className="w-4 h-4" />
                Exit Group
              </button>
            </div>

            {/* Issue Card */}
            {group.issueLog && (
              <div className="pt-4">
                <IssueCard issueLog={group.issueLog} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'Members' && (
          <div className="p-6">
            <p className="text-sm text-gray-500">Members list will be implemented later</p>
          </div>
        )}

        {activeTab === 'Logs' && (
          <div className="p-6">
            <p className="text-sm text-gray-500">Logs will be implemented later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanel;