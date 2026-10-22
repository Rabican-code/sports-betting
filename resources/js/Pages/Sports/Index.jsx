import AppShell from '@/Components/AppShell';
import MatchCard from '@/Components/MatchCard';

export default function Index({ sports }) {
    return (
        <AppShell title="Sports">
            <div className="space-y-3">
                {sports.map((s) => (
                    <MatchCard key={s.id} sport={s} href={route('sports.show', s.id)} />
                ))}

                {sports.length === 0 && (
                    <div className="rounded-2xl border-2 border-dashed border-slate-300 py-14 text-center">
                        <p className="font-medium text-slate-700">No matches yet</p>
                        <p className="mt-1 text-sm text-slate-500">Check back soon for scores.</p>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
