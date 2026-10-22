const styles = {
    pending: 'bg-amber-50 text-amber-700 ring-amber-200',
    won: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    lost: 'bg-red-50 text-red-700 ring-red-200',
};

const labels = { pending: 'Pending', won: 'Won', lost: 'Lost' };

export default function StatusBadge({ status, prefix }) {
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}>
            {prefix ? `${prefix}: ` : ''}{labels[status]}
        </span>
    );
}
