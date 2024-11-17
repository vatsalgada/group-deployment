// components/GroupTable.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { WhatsAppGroup, Label } from '../types';
import LabelBadge from './LabelBadge';
import './styles/customScrollbar.css';

const ITEMS_PER_PAGE = 20;

interface GroupTableProps {
  groups: WhatsAppGroup[];
  onGroupSelect: (group: WhatsAppGroup) => void;
  selectedGroup: WhatsAppGroup | null;
}

interface TableBodyProps {
  groups: WhatsAppGroup[];
  selectedGroup: WhatsAppGroup | null;
  onGroupSelect: (group: WhatsAppGroup) => void;
  renderLabels: (labels: Label[]) => React.ReactNode;
  selectedRows: Set<string>;
  onRowSelect: (groupId: string, checked: boolean) => void;
}

interface TableHeaderProps {
  onSelectAll: (checked: boolean) => void;
  isAllSelected: boolean;
  hasPartialSelection: boolean;
}

interface GroupInfoProps {
  group: WhatsAppGroup;
}

interface ProjectBadgeProps {
  project: {
    type: 'Demo' | 'Clients';
    name: string;
  };
}

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalRows: number;
  onPageChange: (page: number) => void;
}

const GroupTable = ({ groups, selectedGroup, onGroupSelect }: GroupTableProps): JSX.Element => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scrollThumbWidth, setScrollThumbWidth] = useState<string>('0%');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (!scrollElement) return;

    const handleScroll = (): void => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollThumbWidth(`${scrollPercentage}%`);
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, []);

  const totalPages = Math.ceil(groups.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGroups = groups.slice(startIndex, endIndex);

  const handleSelectAll = (checked: boolean): void => {
    if (checked) {
      const newSelected = new Set(currentGroups.map(group => group.id));
      setSelectedRows(newSelected);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowSelect = (groupId: string, checked: boolean): void => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(groupId);
    } else {
      newSelected.delete(groupId);
    }
    setSelectedRows(newSelected);
  };

  const isAllSelected = currentGroups.length > 0 && 
    currentGroups.every(group => selectedRows.has(group.id));
    
  const hasPartialSelection = currentGroups.some(group => selectedRows.has(group.id)) && 
    !isAllSelected;

  const renderLabels = (labels: Label[]): React.ReactNode => {
    if (labels.length <= 2) {
      return labels.map((label) => (
        <LabelBadge key={label.id} label={label} />
      ));
    }

    return (
      <>
        <LabelBadge label={labels[0]} />
        <LabelBadge label={labels[1]} />
        <div className="flex items-center px-2 py-1 border border-gray-200 rounded-xl text-xs text-gray-500 cursor-pointer hover:bg-gray-50">
          +{labels.length - 2}
        </div>
      </>
    );
  };

  if (!isClient) {
    return (
      <div className="flex-1 flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full relative">
      <div className="custom-scrollbar-track">
        <div 
          className="custom-scrollbar-thumb" 
          style={{ width: scrollThumbWidth }} 
        />
      </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <TableHeader 
            onSelectAll={handleSelectAll}
            isAllSelected={isAllSelected}
            hasPartialSelection={hasPartialSelection}
          />
        </div>

        <TableBody 
          groups={currentGroups} 
          selectedGroup={selectedGroup} 
          onGroupSelect={onGroupSelect} 
          renderLabels={renderLabels}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
        />
      </div>

      <TablePagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalRows={groups.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const TableHeader = ({ 
  onSelectAll, 
  isAllSelected, 
  hasPartialSelection 
}: TableHeaderProps): JSX.Element => (
  <div className="grid grid-cols-[56px,3fr,1fr,1fr,0.5fr,0.5fr] pl-6 py-3 text-sm text-gray-500 font-medium">
    <div className="flex items-center">
      <input 
        type="checkbox" 
        className="rounded border-gray-300 cursor-pointer"
        checked={isAllSelected}
        ref={input => {
          if (input) {
            input.indeterminate = hasPartialSelection;
          }
        }}
        onChange={(e) => onSelectAll(e.target.checked)}
        aria-label="Select all rows"
      />
    </div>
    <div>Group Name</div>
    <div>Project</div>
    <div>Labels</div>
    <div className="text-center">Members</div>
    <div className="text-center">Last Active</div>
  </div>
);

const TableBody = ({ 
  groups, 
  selectedGroup, 
  onGroupSelect, 
  renderLabels,
  selectedRows,
  onRowSelect 
}: TableBodyProps): JSX.Element => (
  <div>
    {groups.map((group) => (
      <div
        key={group.id}
        onClick={() => onGroupSelect(group)}
        className={`grid grid-cols-[56px,3fr,1fr,1fr,0.5fr,0.5fr] pl-6 py-2 hover:bg-gray-50 cursor-pointer border-gray-100 ${
          selectedGroup?.id === group.id ? 'bg-gray-100' : 'bg-white'
        }`}
      >
        <div 
          className="flex items-center" 
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <input 
            type="checkbox" 
            className="rounded border-gray-300 cursor-pointer"
            checked={selectedRows.has(group.id)}
            onChange={(e) => onRowSelect(group.id, e.target.checked)}
            aria-label={`Select ${group.entityOne}`}
          />
        </div>
        <GroupInfo group={group} />
        <ProjectBadge project={group.project} />
        <div className="flex items-center space-x-2">
          {renderLabels(group.labels)}
        </div>
        <div className="flex items-center justify-center text-sm text-gray-600">
          {group.members}
        </div>
        <div className="flex items-center justify-center text-sm text-gray-400">
          {group.lastActive}
        </div>
      </div>
    ))}
  </div>
);

const GroupInfo = ({ group }: GroupInfoProps): JSX.Element => (
  <div className="flex items-center space-x-3">
    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-gray-600">
      {group.entityOne[0].toUpperCase()}
    </div>
    <div className="flex items-center">
      <div className="text-gray-900">
        {group.entityOne} {'<>'} {group.entityTwo}
      </div>
      {group.isActive && (
        <div className="ml-2">
          <span className="bg-[#25D366] text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
            {group.members}
          </span>
        </div>
      )}
    </div>
  </div>
);

const ProjectBadge = ({ project }: ProjectBadgeProps): JSX.Element => (
  <div className="flex items-center">
    <span className={`px-2 py-1 rounded-2xl text-xs ${
      project.type === 'Demo' 
        ? 'bg-blue-100 text-blue-800'
        : 'bg-orange-100 text-orange-800'
    }`}>
      # {project.name}
    </span>
  </div>
);

const TablePagination = ({ 
  currentPage, 
  totalPages, 
  totalRows, 
  onPageChange 
}: TablePaginationProps): JSX.Element => (
  <div className="h-10 border-t border-gray-200 bg-white">
    <div className="px-4 h-full flex items-center justify-between">
      <div className="flex items-center space-x-2 text-xs text-gray-500">
        <button 
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-gray-500 hover:text-gray-600 disabled:text-gray-300 border border-gray-200 px-1.5 py-0.5 rounded-sm transition-colors"
          aria-label="Previous page"
        >
          ←
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button 
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-gray-500 hover:text-gray-600 disabled:text-gray-300 border border-gray-200 px-1.5 py-0.5 rounded-sm transition-colors"
          aria-label="Next page"
        >
          →
        </button>
        <span className="ml-2 text-gray-400">
          {totalRows} rows
        </span>
      </div>
    </div>
  </div>
);

export default GroupTable;