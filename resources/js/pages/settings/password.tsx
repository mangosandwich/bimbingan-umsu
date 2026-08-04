import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { KeyRound, Lock, CheckCircle2, Save, ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Keamanan Password',
        href: '/settings/password',
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Keamanan Kata Sandi — Sistem Bimbingan Skripsi UMSU" />

            <SettingsLayout>
                <div className="space-y-6">
                    {/* Header Banner */}
                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xs">
                        <div className="flex items-center justify-between gap-4 mb-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                                <KeyRound className="w-3.5 h-3.5" />
                                <span>Keamanan Akun</span>
                            </div>

                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Kembali</span>
                            </Link>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                            Pembaruan Kata Sandi
                        </h2>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">
                            Pastikan akun Anda menggunakan kata sandi yang kuat dan aman untuk menjaga keamanan data bimbingan.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                        <form onSubmit={updatePassword} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Kata Sandi Saat Ini *</span>
                                </label>
                                <input
                                    id="current_password"
                                    ref={currentPasswordInput}
                                    value={data.current_password}
                                    onChange={(e) => setData('current_password', e.target.value)}
                                    type="password"
                                    className="w-full p-3 rounded-2xl text-xs bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                                    autoComplete="current-password"
                                    placeholder="Masukkan kata sandi saat ini"
                                />
                                <InputError message={errors.current_password} />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                    <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Kata Sandi Baru *</span>
                                </label>
                                <input
                                    id="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    type="password"
                                    className="w-full p-3 rounded-2xl text-xs bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                                    autoComplete="new-password"
                                    placeholder="Masukkan kata sandi baru"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Konfirmasi Kata Sandi Baru *</span>
                                </label>
                                <input
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    type="password"
                                    className="w-full p-3 rounded-2xl text-xs bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                                    autoComplete="new-password"
                                    placeholder="Ulangi kata sandi baru"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 py-2.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>Simpan Kata Sandi</span>
                                </button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Berhasil disimpan!
                                    </span>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
