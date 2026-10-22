import { useState } from 'react';
import { router, useForm, usePage } from '@inertiajs/react';
import AppShell from '@/Components/AppShell';
import Field from '@/Components/Field';
import Button from '@/Components/Button';
import MatchCard from '@/Components/MatchCard';

export default function Index({ sports }) {
    const [showForm, setShowForm] = useState(false);
    const pageErrors = usePage().props.errors;
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        team_a: '',
        team_b: '',
        score_a: '',
        score_b: '',
    });

    const close = () => {
        reset();
        clearErrors();
        setShowForm(false);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.sports.store'), { onSuccess: close });
    };

    const markWinner = (sport, winner) => {
        const name = winner === 'a' ? sport.team_a : sport.team_b;
        if (confirm(`Mark "${name}" as the winner? This can't be undone.`)) {
            router.post(route('admin.sports.result', sport.id), { winner }, { preserveScroll: true });
        }
    };

    return (
        <AppShell
            title="Sports"
            admin
            actions={
                !showForm && (
                    <Button onClick={() => setShowForm(true)}>
                        <span className="text-lg leading-none">+</span> Create Sports
                    </Button>
                )
            }
        >
            {pageErrors?.winner && (
                <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{pageErrors.winner}</p>
            )}

            {showForm && (
                <form onSubmit={submit} className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <h2 className="mb-5 text-base font-semibold text-slate-900">New match</h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Team A" name="team_a" value={data.team_a}
                            onChange={(e) => setData('team_a', e.target.value)} error={errors.team_a} autoFocus />
                        <Field label="Team B" name="team_b" value={data.team_b}
                            onChange={(e) => setData('team_b', e.target.value)} error={errors.team_b} />
                        <Field label="Score A" name="score_a" type="number" min="0" value={data.score_a}
                            onChange={(e) => setData('score_a', e.target.value)} error={errors.score_a} />
                        <Field label="Score B" name="score_b" type="number" min="0" value={data.score_b}
                            onChange={(e) => setData('score_b', e.target.value)} error={errors.score_b} />
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Button type="submit" disabled={processing}>Save</Button>
                        <Button type="button" variant="secondary" onClick={close}>Cancel</Button>
                    </div>
                </form>
            )}

            <div className="space-y-3">
                {sports.map((s) => (
                    <MatchCard key={s.id} sport={s}>
                        {!s.winner && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                <Button variant="secondary" onClick={() => markWinner(s, 'a')} className="flex-1">
                                    {s.team_a} won
                                </Button>
                                <Button variant="secondary" onClick={() => markWinner(s, 'b')} className="flex-1">
                                    {s.team_b} won
                                </Button>
                            </div>
                        )}
                    </MatchCard>
                ))}

                {sports.length === 0 && (
                    <div className="rounded-2xl border-2 border-dashed border-slate-300 py-14 text-center">
                        <p className="font-medium text-slate-700">No matches yet</p>
                        <p className="mt-1 text-sm text-slate-500">Press “Create Sports” to add the first one.</p>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
