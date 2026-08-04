import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { User, Mail, ShieldAlert, CheckCircle2, Save, UserCheck, ArrowLeft } from 'lucide-react';

import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan Profil',
        href: '/settings/profile',
    },
];

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Profil — Sistem Bimbingan Skripsi UMSU" />

            <SettingsLayout>
                <div className="space-y-6">
                    {/* Header Banner */}
                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xs">
                        <div className="flex items-center justify-between gap-4 mb-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                                <UserCheck className="w-3.5 h-3.5" />
                                <span>Informasi Akun Utama</span>
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
                            Pengaturan Profil Pengguna
                        </h2>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">
                            Perbarui nama lengkap dan alamat email yang terhubung dengan akun sistem bimbingan skripsi Anda.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                        <form onSubmit={submit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Nama Lengkap *</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full p-3 rounded-2xl text-xs bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="Masukkan nama lengkap Anda"
                                />
                                <InputError className="mt-1" message={errors.name} />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Alamat Email *</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full p-3 rounded-2xl text-xs bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                    placeholder="nama@umsu.ac.id"
                                />
                                <InputError className="mt-1" message={errors.email} />
                            </div>

                            {mustVerifyEmail && auth.user.email_verified_at === null && (
                                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 text-xs space-y-2">
                                    <p className="flex items-center gap-2 font-medium">
                                        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                                        <span>Alamat email Anda belum diverifikasi.</span>
                                    </p>
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="font-bold underline hover:text-amber-800 dark:hover:text-amber-100 cursor-pointer"
                                    >
                                        Klik di sini untuk mengirim ulang email verifikasi.
                                    </Link>

                                    {status === 'verification-link-sent' && (
                                        <div className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>Link verifikasi baru telah dikirimkan ke alamat email Anda.</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 py-2.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>Simpan Perubahan</span>
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

                    {/* Delete User Section */}
                    <DeleteUser />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
