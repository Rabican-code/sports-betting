import { useForm } from '@inertiajs/react';
import AuthShell from '@/Components/AuthShell';
import Field from '@/Components/Field';
import Button from '@/Components/Button';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login.store'), { onFinish: () => reset('password') });
    };

    return (
        <AuthShell title="Admin sign in" subtitle="Manage sports and scores" badge="Admin area">
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

                <Button type="submit" disabled={processing} className="w-full">
                    Sign in
                </Button>
            </form>
        </AuthShell>
    );
}
