import { useState, ReactNode } from 'react';
import { Search, Filter, MessageSquare, Users, Settings, HelpCircle, Home, MessageCircle, Clock, FileText, LogOut } from 'lucide-react';
import { WhatsAppGroup } from '../types';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [selectedGroup, setSelectedGroup] = useState<WhatsAppGroup | null>(null);
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="flex items-center px-4 py-6 border-b border-gray-200">
          <div className="font-semibold text-lg">Periskope</div>
        </div>
        
        <nav className="px-4 py-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button className={`flex items-center w-full px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ${
                  item.isActive ? 'bg-gray-100' : ''
                }`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                  {item.count && (
                    <span className="ml-auto bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                      {item.count}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-64 px-4 py-4 border-t border-gray-200">
          <button className="flex items-center w-full px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            <HelpCircle className="w-5 h-5 mr-3" />
            <span>Help & Support</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 space-x-4">
              <div className="relative flex-1 max-w-2xl">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5 mr-2" />
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
        </header>

        {/* Render children in main content area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const sidebarItems = [
  { id: '1', name: 'Dashboard', icon: Home, isActive: false },
  { id: '2', name: 'Chats', icon: MessageCircle, count: 12, isActive: false },
  { id: '3', name: 'Groups', icon: Users, isActive: true },
  { id: '4', name: 'Contacts', icon: MessageSquare, isActive: false },
  { id: '5', name: 'Logs', icon: Clock, isActive: false },
  { id: '6', name: 'Files', icon: FileText, isActive: false },
  { id: '7', name: 'Settings', icon: Settings, isActive: false },
];

export default DashboardLayout;