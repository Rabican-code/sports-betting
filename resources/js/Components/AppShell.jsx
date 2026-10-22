import { Head, Link, usePage } from '@inertiajs/react';
import Logo from '@/Components/Logo';

export default function AppShell({ title, admin = false, sidebar = admin, actions, children }) {
    const page = usePage();
    const user = page.props.auth?.user;
    const url = page.url || '';
    const logoutHref = admin ? route('admin.logout') : route('logout');

    const content = (
        <main className="flex-1">
            <div className="mx-auto max-w-3xl px-5 py-8 md:px-10 md:py-12">
                <div className="mb-8 flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
                    {actions}
                </div>
                {children}
            </div>
        </main>
    );

    // No sidebar: slim top bar (user pages)
    if (!sidebar) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Head title={title} />
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3 md:px-10">
                        <Link href={route('sports.index')} className="flex items-center gap-3">
                            <Logo size="sm" />
                            <span className="font-semibold text-slate-900">Sports Hub</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            {user && <span className="hidden text-sm text-slate-500 sm:block">{user.email}</span>}
                            <Link
                                href={logoutHref}
                                method="post"
                                as="button"
                                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                            >
                                Log out
                            </Link>
                        </div>
                    </div>
                </header>
                {content}
            </div>
        );
    }

    // Sidebar layout (admin pages)
    const nav = [
        { label: 'Sports', href: route('admin.sports.index'), match: '/admin/sports' },
        { label: 'Bets', href: route('admin.bets.index'), match: '/admin/bets' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 md:flex">
            <Head title={admin ? `Admin · ${title}` : title} />

            <aside className="flex flex-wrap items-center justify-between bg-slate-900 px-5 py-4 md:min-h-screen md:w-64 md:flex-col md:flex-nowrap md:items-stretch md:justify-start md:px-4 md:py-6">
                <div className="flex items-center gap-3 md:px-2">
                    <Logo size="sm" />
                    <span className="font-semibold text-white">Sports Hub</span>
                    {admin && (
                        <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-300">
                            Admin
                        </span>
                    )}
                </div>

                <nav className="order-last mt-3 flex w-full gap-2 md:order-none md:mt-8 md:w-auto md:flex-col">
                    {nav.map((item) => {
                        const active = url.startsWith(item.match);
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="md:mt-auto">
                    {user && (
                        <p className="mb-2 hidden truncate px-3 text-xs text-slate-400 md:block">{user.email}</p>
                    )}
                    <Link
                        href={logoutHref}
                        method="post"
                        as="button"
                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                        Log out
                    </Link>
                </div>
            </aside>

            {content}
        </div>
    );
}
