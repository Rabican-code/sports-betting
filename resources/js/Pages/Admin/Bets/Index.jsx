import AppShell from '@/Components/AppShell';
import StatusBadge from '@/Components/StatusBadge';

export default function Index({ bets }) {
    return (
        <AppShell title="Bets" admin>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-3 font-semibold">User</th>
                                <th className="px-5 py-3 font-semibold">Match</th>
                                <th className="px-5 py-3 font-semibold">Pick</th>
                                <th className="px-5 py-3 text-right font-semibold">Amount</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3 font-semibold">Placed</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {bets.map((b) => (
                                <tr key={b.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-3">
                                        <p className="font-medium text-slate-900">{b.user}</p>
                                        <p className="text-xs text-slate-500">{b.email}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-3 text-slate-700">{b.match}</td>
                                    <td className="px-5 py-3 font-medium text-slate-900">{b.pick}</td>
                                    <td className="px-5 py-3 text-right tabular-nums text-slate-900">
                                        {Number(b.amount).toFixed(2)}
                                    </td>
                                    <td className="px-5 py-3"><StatusBadge status={b.status} /></td>
                                    <td className="whitespace-nowrap px-5 py-3 text-slate-500">{b.placed_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {bets.length === 0 && (
                    <p className="py-14 text-center text-slate-500">No bets placed yet.</p>
                )}
            </div>
        </AppShell>
    );
}
