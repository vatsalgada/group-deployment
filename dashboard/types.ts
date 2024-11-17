// types.ts
export interface WhatsAppGroup {
  id: string;
  entityOne: string;
  entityTwo: string;
  isActive: boolean;
  project: {
    type: 'Demo' | 'Clients';
    name: string;
  };
  labels: Label[];
  members: number;
  lastActive: string;
  disappearingMessages: 'ON' | 'OFF';
  sendMessagePermission: 'All' | 'Admins Only';
  issueLog?: IssueLog;
}

export interface Label {
  id: string;
  name: string;
  type: 'HighValue' | 'Priority' | 'Pilot' | 'Warm';
}

// Updated mock data with proper types
const mockGroups: WhatsAppGroup[] = [
  ...Array(20).fill(null).map((_, index) => ({
    id: `generated-${index + 3}`,
    entityOne: `Company ${index + 3}`,
    entityTwo: 'Periskope',
    isActive: Math.random() > 0.5,
    project: {
      type: Math.random() > 0.5 ? 'Demo' : 'Clients',
      name: Math.random() > 0.5 ? 'Demo' : 'Clients'
    },
    labels: [
      { 
        id: `label-${index}-1`, 
        name: 'High Value', 
        type: 'HighValue'
      },
      { 
        id: `label-${index}-2`, 
        name: 'Priority', 
        type: 'Priority'
      }
    ],
    members: Math.floor(Math.random() * 10) + 1,
    lastActive: 'Yesterday',
    disappearingMessages: 'OFF',
    sendMessagePermission: 'All',
  })) as WhatsAppGroup[]
];


export interface IssueLog {
  id: string;
  groupId: string;
  groupReference: string;
  title: string;
  timestamp: string;
  tags: string[];
  status: 'open' | 'closed';
}
  

  
  export interface SidebarItem {
    id: string;
    name: string;
    icon: React.ReactDOM;
    isActive?: boolean;
    count?: number;
  }