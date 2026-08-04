import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import { type BreadcrumbItem } from '@/types';
import { Palette } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tampilan Theme',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tampilan Theme — Sistem Bimbingan Skripsi UMSU" />

            <SettingsLayout>
                <div className="space-y-6">
                    {/* Header Banner */}
                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xs">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
                            <Palette className="w-3.5 h-3.5" />
                            <span>Personalisasi Visual</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                            Pengaturan Tampilan Aplikasi
                        </h2>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">
                            Pilih mode tampilan terang atau gelap sesuai kenyamanan mata Anda saat mengakses portal.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xs">
                        <AppearanceTabs />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
