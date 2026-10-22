import { Head } from '@inertiajs/react';
import Logo from '@/Components/Logo';

export default function AuthShell({ title, subtitle, badge, footer, children }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-12">
            <Head title={title} />

            <div className="w-full max-w-md">
                <div className="mb-8 flex flex-col items-center text-center">
                    <Logo />
                    <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
                    {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}
                    {badge && (
                        <span className="mt-3 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-200">
                            {badge}
                        </span>
                    )}
                </div>

                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">{children}</div>

                {footer && <p className="mt-6 text-center text-sm text-slate-500">{footer}</p>}
            </div>
        </div>
    );
}
