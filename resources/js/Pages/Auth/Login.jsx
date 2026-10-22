import { Link, useForm } from '@inertiajs/react';
import AuthShell from '@/Components/AuthShell';
import Field from '@/Components/Field';
import Button from '@/Components/Button';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <AuthShell
            title="Welcome back"
            subtitle="Sign in to see the latest scores"
            footer={
                route().has('register') && (
                    <>
                        New here?{' '}
                        <Link href={route('register')} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Create an account
                        </Link>
                    </>
                )
            }
        >
            {status && <p className="mb-4 text-sm font-medium text-emerald-600">{status}</p>}

            <form onSubmit={submit} className="space-y-5">
                <Field
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    autoFocus
                />

                <Field
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                />

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        Remember me
                    </label>
                    {canResetPassword && (
                        <Link href={route('password.request')} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </Link>
                    )}
                </div>

                <Button type="submit" disabled={processing} className="w-full">
                    Sign in
                </Button>
            </form>
        </AuthShell>
    );
}
