import { Circle, Signal } from 'lucide-react';
import { IssueLog } from '@/types';

interface IssueCardProps {
  issueLog: IssueLog;
}

const IssueCard = ({ issueLog }: IssueCardProps) => (
  <div className="space-y-3 rounded-lg p-2 shadow-[0_3px_10px_rgb(0,0,0,0.08)]">
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-400">{issueLog.groupReference}</span>
      <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-xs text-white">
        H
      </div>
    </div>
    <div className="rounded-lg">
      <div className="flex gap-3">
        <Circle color="#fd2626" strokeWidth={3} className="w-4 h-4 text-red-500 flex-shrink-0" />
        <div className="text-sm text-gray-900">{issueLog.title}</div>
      </div>
      <div className="flex flex-wrap gap-1.5 py-2 justify-between">
        <div className="flex gap-1">
          <Signal strokeWidth={3} color="#454545" className="w-5 h-5 flex-shrink-0 border border-gray-200 rounded-sm p-0.5 font-bold" />
          {issueLog.tags.map((tag, index) => (
            <div key={index} className="text-xs p-0.5 flex items-center gap-1 h-5 border border-gray-200 rounded-sm font-medium">
              {tag}
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-400">3 days</div>
      </div>
    </div>
  </div>
);

export default IssueCard;