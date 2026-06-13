import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { Chip } from '@/components/ui/chip';
import type { Call } from '../types';

interface CallCardProps {
  call: Call;
  isSelected: boolean;
  onClick: () => void;
}

const STATUS_VARIANTS: Record<string, 'warning' | 'success' | 'outline'> = {
  Inquiry: 'warning',
  Feedback: 'warning',
  Request: 'success',
  Approval: 'success',
  Review: 'warning',
};

const getStatusVariant = (status: string) => STATUS_VARIANTS[status] || 'outline';

export function CallCard({ call, isSelected, onClick }: CallCardProps) {

  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-start space-x-4 px-5 py-4 cursor-pointer transition-colors border-b border-neutral-100",
        isSelected ? "bg-neutral-50" : "bg-white hover:bg-neutral-50"
      )}
    >
      <Avatar 
        fallback={call.initials} 
        size="lg" 
        className={cn(call.avatarColorClass || "bg-info-500 text-info-50")}
      />
      
      <div className="flex-1 min-w-0 flex justify-between items-start pt-0.5">
        <div>
          <p className="text-[15px] font-medium text-neutral-900 truncate pr-2">
            {call.contactName}
          </p>
          <div className="mt-1.5">
            <Chip variant={getStatusVariant(call.status)}>
              {call.status}
            </Chip>
          </div>
        </div>
        
        <div className="flex flex-col items-end text-[13px] text-neutral-500 shrink-0">
          <span className="mb-1">
            {call.dateStr}
          </span>
          <span>
            {call.time}
          </span>
        </div>
      </div>
    </div>
  );
}
