import { Link, usePage } from '@inertiajs/react';
import {
  GraduationCap,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Layers,
  Mail,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { DB } from '@/db';
import type { AppUser, SharedData, UserRole } from '@/types';

interface RoleFooterProps {
  role?: UserRole;
  currentUser?: AppUser;
}

export default function RoleFooter({ role: propRole, currentUser: propUser }: RoleFooterProps) {
  const page = usePage<SharedData>();
  const authUser = page.props?.auth?.user;

  // Determine user and role from props, local DB, or auth
  const currentUser: AppUser | null =
    propUser ||
    (typeof window !== 'undefined' ? DB.getCurrentUser() : null) ||
    (authUser
      ? {
          id: String(authUser.id),
          name: authUser.name,
          email: authUser.email,
          role: (((authUser as any).roles?.[0] as UserRole) || 'student'),
          avatar: authUser.avatar,
        }
      : null);

  const role: UserRole = propRole || currentUser?.role || 'guest';

  // Role Configurations for green dark theme
  const roleConfig: Record<
    UserRole,
    {
      label: string;
      bgBadge: string;
      description: string;
      quickLinks: { label: string; href: string }[];
      supportText: string;
      contactEmail: string;
    }
  > = {
    superadmin: {
      label: 'Super Admin Portal',
      bgBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      description:
        'Portal Utama Administrator Sistem Skripsi UMSU. Mengelola hak akses pengguna, verifikasi pendaftar Google SSO, konfigurasi master data, serta pemantauan audit trail.',
      quickLinks: [
        { label: 'Ringkasan Statistik Sistem', href: '/dashboard' },
        { label: 'Manajemen Pengguna & Verifikasi', href: '/dashboard' },
        { label: 'Seleksi Judul Proposal Skripsi', href: '/dashboard' },
        { label: 'Penugasan SK Pembimbing', href: '/dashboard' },
      ],
      supportText: 'Tim IT Administrator & Support UMSU',
      contactEmail: 'superadmin@umsu.ac.id',
    },
    admin: {
      label: 'Admin Portal',
      bgBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      description:
        'Portal Administrator Utama Sistem Skripsi UMSU. Mengelola hak akses pengguna, verifikasi pendaftar Google SSO, konfigurasi master data, serta pemantauan audit trail.',
      quickLinks: [
        { label: 'Ringkasan Statistik Sistem', href: '/dashboard' },
        { label: 'Manajemen Pengguna & Verifikasi', href: '/dashboard' },
        { label: 'Seleksi Judul Proposal Skripsi', href: '/dashboard' },
        { label: 'Penugasan SK Pembimbing', href: '/dashboard' },
      ],
      supportText: 'Tim IT Administrator & Support UMSU',
      contactEmail: 'admin@umsu.ac.id',
    },
    prodi: {
      label: 'Program Studi Portal',
      bgBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      description:
        'Portal Program Studi UMSU. Digunakan untuk persetujuan usulan judul skripsi, penetapan dosen pembimbing I & II, serta pengesahan SK Dekan.',
      quickLinks: [
        { label: 'Validasi Proposal Judul', href: '/dashboard' },
        { label: 'Plotting Dosen Pembimbing', href: '/dashboard' },
        { label: 'Unggah SK Pembimbing', href: '/dashboard' },
        { label: 'Monitoring Progres Mahasiswa', href: '/dashboard' },
      ],
      supportText: 'Sekretariat Prodi UMSU',
      contactEmail: 'prodi@umsu.ac.id',
    },
    lecturer: {
      label: 'Dosen Pembimbing Portal',
      bgBadge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      description:
        'Portal Dosen Pembimbing Skripsi UMSU. Tempat verifikasi catatan logbook bimbingan mahasiswa, pengesahan progres skripsi, dan pengaturan jadwal konsultasi.',
      quickLinks: [
        { label: 'Daftar Mahasiswa Bimbingan', href: '/dosen/mahasiswa-bimbingan' },
        { label: 'Persetujuan Permohonan Bimbingan', href: '/dosen/persetujuan-jadwal' },
        { label: 'Atur Ketersediaan Slot Waktu', href: '/dosen/ketersediaan-waktu' },
        { label: 'Verifikasi Logbook Catatan', href: '/dosen/mahasiswa-bimbingan' },
      ],
      supportText: 'Layanan Akademik Dosen Pembimbing UMSU',
      contactEmail: 'lecturer@umsu.ac.id',
    },
    student: {
      label: 'Mahasiswa Portal',
      bgBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      description:
        'Portal Akademik Skripsi Mahasiswa UMSU. Pengajuan usulan 3 judul skripsi, pemantauan status persetujuan Kaprodi, pengisian logbook, dan booking jadwal dosen.',
      quickLinks: [
        { label: 'Pengajuan Judul Proposal', href: '/mahasiswa/pengajuan-judul' },
        { label: 'Cek Status Persetujuan Judul', href: '/mahasiswa/status-judul' },
        { label: 'Catatan Logbook Bimbingan', href: '/mahasiswa/log-bimbingan' },
        { label: 'Booking Jadwal Konsultasi', href: '/mahasiswa/booking-jadwal' },
      ],
      supportText: 'Helpdesk Akademik Skripsi Mahasiswa UMSU',
      contactEmail: 'student@umsu.ac.id',
    },
    guest: {
      label: 'Pendaftaran & Verifikasi',
      bgBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      description:
        'Portal Aktivasi Akun Pendaftar UMSU. Akun terhubung via Google SSO. Mohon tunggu proses verifikasi identitas (NPM / NIDN) oleh Sekretariat Prodi / Admin UMSU.',
      quickLinks: [
        { label: 'Cek Status Verifikasi Akun', href: '/dashboard' },
        { label: 'Panduan Google SSO UMSU', href: '#' },
        { label: 'Kontak Admin Program Studi', href: '#' },
      ],
      supportText: 'Helpdesk Pendaftaran & Verifikasi UMSU',
      contactEmail: 'helpdesk@umsu.ac.id',
    },
  };

  const currentConfig = roleConfig[role] || roleConfig.guest;

  return (
    <footer className="w-full mt-auto bg-emerald-800 dark:bg-emerald-950 text-emerald-100 border-t border-emerald-900/60 shadow-lg text-left">
      {/* Main Footer Container */}
      <div className="mx-auto px-4 md:max-w-7xl py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Branding & Role Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 dark:bg-emerald-900 text-white flex items-center justify-center shrink-0 border border-emerald-600/40">
                <GraduationCap className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base tracking-tight leading-tight">
                  Sistem Skripsi & Bimbingan
                </h3>
                <p className="text-xs text-emerald-200/90 font-medium">
                  Universitas Muhammadiyah Sumatera Utara
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-md">
              {currentConfig.description}
            </p>
          </div>

          {/* Column 2: Navigation tailored for active Role */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-200 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-emerald-300" />
              <span>Navigasi Utama</span>
            </h4>

            <ul className="grid grid-cols-1 gap-2 text-xs">
              {currentConfig.quickLinks.map((link: { label: string; href: string }, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-emerald-100/90 hover:text-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform"></span>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: System Status & Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-200 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Layanan & Support</span>
            </h4>

            <div className="bg-emerald-900/50 dark:bg-emerald-900/30 rounded-xl p-3.5 border border-emerald-700/40 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-200/80 font-medium">Status Server</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-200 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Operasional
                </span>
              </div>

              <div className="border-t border-emerald-700/40 pt-2 text-xs">
                <p className="text-emerald-300/70 text-[10px] font-medium uppercase tracking-wider">
                  Bantuan / Contact Support
                </p>
                <a
                  href={`mailto:${currentConfig.contactEmail}`}
                  className="font-semibold text-white hover:text-emerald-200 transition-colors flex items-center gap-1.5 mt-0.5"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{currentConfig.contactEmail}</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="border-t border-emerald-900/60 bg-emerald-900/40 dark:bg-emerald-950/60 py-3.5">
        <div className="mx-auto px-4 md:max-w-7xl flex items-center justify-center gap-2 text-xs text-emerald-200/80 text-center font-medium">
          <Building2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
          <span>
            &copy; {new Date().getFullYear()} <strong className="text-white font-semibold">Universitas Muhammadiyah Sumatera Utara (UMSU)</strong>. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
