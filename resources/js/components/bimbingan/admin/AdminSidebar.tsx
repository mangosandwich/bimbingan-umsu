// bimbingan/admin/AdminSidebar.tsx
import { GraduationCap, Layers, FileText, BookOpen, Users } from 'lucide-react';
import { AppUser } from '@/types';

interface AdminSidebarProps {
  currentUser: AppUser;
  activeTab: 'overview' | 'proposals' | 'theses' | 'users';
  setActiveTab: (tab: 'overview' | 'proposals' | 'theses' | 'users') => void;
  pendingProposals: number;
  pendingSupervisors: number;
}

export default function AdminSidebar({
  currentUser,
  activeTab,
  setActiveTab,
  pendingProposals,
  pendingSupervisors,
}: AdminSidebarProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm h-fit space-y-6 text-left w-full">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          currentUser.role === 'superadmin' ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
        }`}>
          <GraduationCap className="w-5 h-5 shrink-0" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm truncate">
            {currentUser.role === 'superadmin' ? 'Admin Portal' : 'Kaprodi Portal'}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {currentUser.role === 'superadmin' ? 'Administrator' : (currentUser.department || 'Program Studi')}
          </p>
        </div>
      </div>

      <nav className="space-y-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'overview' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
          }`}
          id="nav-overview"
        >
          <Layers className="w-4 h-4 shrink-0" />
          <span className="truncate">Ringkasan Sistem</span>
        </button>

        {(currentUser.role === 'prodi' || currentUser.role === 'superadmin') && (
          <button
            onClick={() => setActiveTab('proposals')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'proposals' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
            }`}
            id="nav-proposals"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span className="truncate">Seleksi Judul</span>
            {pendingProposals > 0 && (
              <span className="ml-auto bg-amber-500 text-white font-bold text-2xs px-2 py-0.5 rounded-full shrink-0">
                {pendingProposals}
              </span>
            )}
          </button>
        )}

        <button
          onClick={() => setActiveTab('theses')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'theses'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
          }`}
          id="nav-theses"
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span className="truncate">Skripsi & Pembimbing</span>
          {pendingSupervisors > 0 && (
            <span className="ml-auto bg-red-500 text-white font-bold text-2xs px-2 py-0.5 rounded-full shrink-0">
              {pendingSupervisors}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'users'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
          }`}
          id="nav-users"
        >
          <Users className="w-4 h-4 shrink-0" />
          <span className="truncate">Akun & Verifikasi</span>
          {currentUser.role === 'prodi' && (
            <span className="ml-auto bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 font-semibold text-[10px] px-1.5 py-0.5 rounded-md shrink-0">
              View Only
            </span>
          )}
        </button>
      </nav>
    </div>
  );
}