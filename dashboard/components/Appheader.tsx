import { BellIcon, CircleHelp, Users } from 'lucide-react';

const AppHeader = () => {
  return (
    <div className="h-12 px-4 border-b border-gray-200 bg-white flex items-center justify-between">
      {/* Left side - just "groups" text */}
      <div className='flex items-center gap-2'>
      <Users className="h-4 w-4 text-gray-500" />
      <span className=" text-sm font-medium text-gray-500">groups</span>
      </div>
   

      {/* Right side */}
      <div className="flex items-center gap-4 ">
        <div className='flex items-center gap-2  border border-gray-200 rounded p-1 font-medium	'> 
        <CircleHelp className="h-4 w-4 text-gray-500" />
        <div className="text-xs text-gray-500 hover:text-gray-700 ">
          Docs
        </div>
        </div>
        

        <div className="flex items-center gap-2 border border-gray-200 rounded p-1 font-medium">
          <div>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-700"></span>
          </span>
          </div>
          <span className="text-xs text-gray-600">+91 90043 89372</span>
        </div>

        <button className="text-gray-500 hover:text-gray-700 border border-gray-200 rounded p-1 font-medium">
          <BellIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AppHeader;