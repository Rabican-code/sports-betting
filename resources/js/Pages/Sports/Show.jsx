import { Link, useForm } from '@inertiajs/react';
import AppShell from '@/Components/AppShell';
import Field from '@/Components/Field';
import Button from '@/Components/Button';
import StatusBadge from '@/Components/StatusBadge';

export default function Show({ sport, myBet }) {
    const { data, setData, post, processing, errors } = useForm({ team: '', amount: '' });

    const decided = !!sport.winner;
    const nameOf = (t) => (t === 'a' ? sport.team_a : sport.team_b);

    const submit = (e) => {
        e.preventDefault();
        post(route('bets.store', sport.id));
    };

    const TeamButton = ({ value }) => {
        const selected = data.team === value;
        return (
            <button
                type="button"
                onClick={() => setData('team', value)}
                className={`rounded-xl px-4 py-4 text-left transition ring-1 ring-inset ${selected
                    ? 'bg-indigo-50 ring-2 ring-indigo-600'
                    : 'bg-white ring-slate-300 hover:bg-slate-50'
                    }`}
            >
                <span className="block text-xs font-medium uppercase tracking-wide text-slate-500">
                    {value === 'a' ? 'Team A' : 'Team B'}
                </span>
                <span className="mt-1 block truncate text-base font-semibold text-slate-900">{nameOf(value)}</span>
            </button>
        );
    };

    return (
        <AppShell
            title={`${sport.team_a} vs ${sport.team_b}`}
            actions={
                <Link href={route('sports.index')} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    ← All sports
                </Link>
            }
        >
            {/* Scoreboard */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center gap-4">
                    <p className={`min-w-0 flex-1 truncate text-lg font-semibold ${decided && sport.winner !== 'a' ? 'text-slate-400' : 'text-slate-900'}`}>
                        {sport.team_a}
                    </p>
                    <div className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xl font-bold tabular-nums text-white">
                        <span>{sport.score_a}</span>
                        <span className="text-slate-500">:</span>
                        <span>{sport.score_b}</span>
                    </div>
                    <p className={`min-w-0 flex-1 truncate text-right text-lg font-semibold ${decided && sport.winner !== 'b' ? 'text-slate-400' : 'text-slate-900'}`}>
                        {sport.team_b}
                    </p>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3">
                    {decided ? (
                        <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                            {nameOf(sport.winner)} won
                        </span>
                    ) : (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                            Open for bets
                        </span>
                    )}
                </div>
            </div>

            {/* Bet panel */}
            <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                {myBet ? (
                    <>
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold text-slate-900">Your bet</h2>
                            <StatusBadge status={myBet.status} />
                        </div>
                        <p className="mt-3 text-slate-700">
                            You bet <span className="font-semibold">{Number(myBet.amount).toFixed(2)}</span> on{' '}
                            <span className="font-semibold">{nameOf(myBet.team)}</span>.
                        </p>
                        {myBet.status === 'won' && (
                            <p className="mt-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                                🎉 You won this bet!
                            </p>
                        )}
                        {myBet.status === 'lost' && (
                            <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                You lost this bet. Better luck next time.
                            </p>
                        )}
                        {myBet.status === 'pending' && (
                            <p className="mt-3 text-sm text-slate-500">Waiting for the match result.</p>
                        )}
                    </>
                ) : decided ? (
                    <p className="text-slate-600">Betting is closed. This match has finished.</p>
                ) : (
                    <form onSubmit={submit} className="space-y-5">
                        <h2 className="text-base font-semibold text-slate-900">Place your bet</h2>

                        <div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <TeamButton value="a" />
                                <TeamButton value="b" />
                            </div>
                            {errors.team && <p className="mt-1.5 text-sm text-red-600">{errors.team}</p>}
                        </div>

                        <Field
                            label="Amount"
                            name="amount"
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="e.g. 100"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            error={errors.amount}
                        />

                        <Button type="submit" disabled={processing || !data.team} className="w-full">
                            Place bet
                        </Button>
                    </form>
                )}
            </div>
        </AppShell>
    );
}
