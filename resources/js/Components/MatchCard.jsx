import { Link } from '@inertiajs/react';
import StatusBadge from '@/Components/StatusBadge';

function Team({ name, dim, align = 'left' }) {
    return (
        <div className={`min-w-0 flex-1 ${align === 'right' ? 'text-right' : ''}`}>
            <p className={`truncate font-semibold ${dim ? 'text-slate-400' : 'text-slate-900'}`}>{name}</p>
        </div>
    );
}

export default function MatchCard({ sport, href, children }) {
    const bet = sport.bets?.[0];
    const decided = !!sport.winner;
    const winnerName = sport.winner === 'a' ? sport.team_a : sport.team_b;

    const body = (
        <>
            <div className="flex items-center gap-4">
                <Team name={sport.team_a} dim={decided && sport.winner !== 'a'} />
                <div className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-lg font-bold tabular-nums text-white">
                    <span>{sport.score_a}</span>
                    <span className="text-slate-500">:</span>
                    <span>{sport.score_b}</span>
                </div>
                <Team name={sport.team_b} dim={decided && sport.winner !== 'b'} align="right" />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                {decided ? (
                    <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                        {winnerName} won
                    </span>
                ) : (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                        Open for bets
                    </span>
                )}
                {bet && <StatusBadge status={bet.status} prefix="Your bet" />}
                {sport.bets_count !== undefined && (
                    <span className="ml-auto text-sm text-slate-500">
                        {sport.bets_count} {sport.bets_count === 1 ? 'bet' : 'bets'}
                    </span>
                )}
            </div>
        </>
    );

    const base = 'block rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200';

    if (href) {
        return (
            <Link href={href} className={`${base} transition hover:shadow-md hover:ring-indigo-300`}>
                {body}
            </Link>
        );
    }

    return (
        <div className={base}>
            {body}
            {children}
        </div>
    );
}
