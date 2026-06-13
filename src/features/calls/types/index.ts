export type CallStatus = 'Inquiry' | 'Feedback' | 'Request' | 'Approval' | 'Review';

export interface Call {
  id: string;
  contactName: string;
  initials: string;
  status: CallStatus;
  time: string;
  dateStr: string; // e.g., 'Yesterday' or 'Today'
  isIncoming: boolean;
  avatarColorClass?: string; // Tailwind class for avatar background
}
