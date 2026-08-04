import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import InputError from '@/components/input-error';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                <Trash2 className="w-4 h-4" />
                <span>Hapus Akun Permanen</span>
            </div>

            <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4 dark:border-rose-950/40 dark:bg-rose-950/20 text-xs space-y-2">
                <div className="flex items-start gap-2 text-rose-700 dark:text-rose-300">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold">Peringatan Penting</p>
                        <p className="text-muted-foreground mt-0.5 leading-relaxed">
                            Setelah akun Anda dihapus, semua data profil dan riwayat bimbingan Anda akan dihapus secara permanen dari sistem.
                        </p>
                    </div>
                </div>

                <div className="pt-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Hapus Akun Saya</span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="rounded-3xl max-w-md">
                            <DialogTitle className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-rose-600" />
                                <span>Apakah Anda yakin ingin menghapus akun?</span>
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
                                Tindakan ini tidak dapat dibatalkan. Masukkan kata sandi Anda untuk mengonfirmasi penghapusan akun secara permanen.
                            </DialogDescription>
                            <form className="space-y-4 pt-2" onSubmit={deleteUser}>
                                <div className="space-y-1.5">
                                    <label htmlFor="password" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Kata Sandi Akun
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Masukkan kata sandi Anda"
                                        autoComplete="current-password"
                                        className="w-full p-2.5 rounded-xl text-xs bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-rose-500 font-medium"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <DialogFooter className="flex items-center gap-2 pt-2">
                                    <DialogClose asChild>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-xs font-bold transition-all cursor-pointer"
                                        >
                                            Batal
                                        </button>
                                    </DialogClose>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
                                    >
                                        Hapus Permanen
                                    </button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
