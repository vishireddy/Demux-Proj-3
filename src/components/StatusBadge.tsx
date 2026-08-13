type Status = 'pending' | 'sending' | 'sent' | 'delivered' | 'failed';

const config: Record<Status, { label: string; cls: string }> = {
  pending:   { label: 'Pending',   cls: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  sending:   { label: 'Sending',   cls: 'bg-blue-100 text-blue-700 border-blue-200' },
  sent:      { label: 'Sent',      cls: 'bg-green-100 text-green-700 border-green-200' },
  delivered: { label: 'Delivered', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  failed:    { label: 'Failed',    cls: 'bg-red-100 text-red-700 border-red-200' },
};

export default function StatusBadge({ status }: { status: Status }) {
  const c = config[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${c.cls}`}>
      {c.label}
    </span>
  );
}
