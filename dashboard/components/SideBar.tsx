import { 
  Home, MessageCircle, Users, Phone, Clock, FileText, 
  Settings, ChevronUpIcon, ChevronDownIcon 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: Home, current: false },
  { name: 'Chats', icon: MessageCircle, current: false, count: '99+' },
  { name: 'Groups', icon: Users, current: true },
  { name: 'Contacts', icon: Phone, current: false },
  { name: 'Logs', icon: Clock, current: false },
  { name: 'Files', icon: FileText, current: false },
  { name: 'Settings', icon: Settings, current: false },
];

const Sidebar = () => (
  <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Periskope" className="h-12 w-12" />
        <div>
          <span className="font-semibold text-lg">Periskope</span>
          <p className="text-xs text-gray-500">bharat@hashlabs.dev</p>
        </div>
        <div className="inline-flex flex-col items-center text-gray-400">
          <button className="flex items-center justify-center w-5 h-5 text-gray-500 hover:text-gray-700">
            <ChevronUpIcon className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center w-5 h-5 text-gray-500 hover:text-gray-700">
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <nav className="flex-1 px-4 py-4">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.name}>
            <a href="#" className={`flex items-center font-semibold px-3 py-2 text-sm rounded-lg ${
              item.current ? 'bg-gray-100 text-[#106e33]' : 'text-gray-600 hover:bg-gray-50'
            }`}>
              <item.icon className="mr-2 h-5 w-5" />
              <span>{item.name}</span>
              {item.count && (
                <span className="ml-auto bg-[#25D366] text-white text-xs font-medium px-2 py-0.5 rounded-2xl">
                  {item.count}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>

    <div className="px-4 py-4">
      <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50">
        <img src="./whatsapp.png" alt="" className="mr-3 h-5 w-5" />
        <span>Help & Support</span>
      </a>
    </div>
  </div>
);

export default Sidebar;