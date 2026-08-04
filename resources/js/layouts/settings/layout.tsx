import { Link, usePage } from '@inertiajs/react';
import { User, KeyRound, Settings as SettingsIcon } from 'lucide-react';
import type { SharedData, UserRole } from '@/types';
import RoleFooter from '@/components/bimbingan/RoleFooter';

const sidebarNavItems = [
    {
        title: 'Profil Saya',
        url: '/settings/profile',
        icon: User,
        description: 'Informasi nama & email',
    },
    {
        title: 'Keamanan Password',
        url: '/settings/password',
        icon: KeyRound,
        description: 'Ubah kata sandi akun',
    },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const page = usePage<SharedData>();
    const currentPath = window.location.pathname;
    const authUser = page.props?.auth?.user;
    const userRole = (((authUser as any)?.roles?.[0] as UserRole) || (authUser as any)?.role || 'student') as UserRole;

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-gray-50/50 dark:bg-zinc-950/50">
            <div className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Navigation Sidebar Card */}
                    <div className="lg:col-span-3 w-full shrink-0 space-y-4">
                        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-5 shadow-xs space-y-4">
                            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-zinc-800">
                                <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                    <SettingsIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">
                                        Pengaturan Akun
                                    </h3>
                                    <p className="text-[11px] text-muted-foreground">
                                        Kelola profil & keamanan
                                    </p>
                                </div>
                            </div>

                            <nav className="space-y-1.5">
                                {sidebarNavItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = currentPath === item.url || currentPath.startsWith(item.url);

                                    return (
                                        <Link
                                            key={item.url}
                                            href={item.url}
                                            prefetch
                                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                                                isActive
                                                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                                                    : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium'
                                            }`}
                                        >
                                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                                            <div className="min-w-0">
                                                <div className="text-xs truncate">{item.title}</div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="lg:col-span-9 min-w-0 space-y-6">
                        {children}
                    </div>
                </div>
            </div>

            <RoleFooter role={userRole} currentUser={authUser ? ({ id: String(authUser.id), name: authUser.name, email: authUser.email, role: userRole } as any) : undefined} />
        </div>
    );
}
