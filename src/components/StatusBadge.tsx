import { cn } from '@/lib/utils';

export default function StatusBadge({ status }: { status: string }) {
  let badgeColor = 'bg-gray-100 text-gray-800';

  if (status === 'Pending Verification') {
    badgeColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
  } else if (status === 'Verified') {
    badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
  } else if (status === 'Tokenized') {
    badgeColor = 'bg-green-100 text-green-800 border-green-200';
  } else if (status === 'Rejected') {
    badgeColor = 'bg-red-100 text-red-800 border-red-200';
  }

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', badgeColor)}>
      {status}
    </span>
  );
}
