import { useState } from 'react';
import { Page, User } from '../types';
import {
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  Users,
  Calendar,
  ClipboardCheck,
  UserCircle,
  LogOut,
  Briefcase,
  ArrowLeftRight,
  Eye,
  Shield,
} from 'lucide-react';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  user: User;
  onLogout: () => void;
  onSwitchUser: (userId: string) => void;
  allUsers: User[];
}

export default function Sidebar({ currentPage, onPageChange, user, onLogout, onSwitchUser, allUsers }: SidebarProps) {
  const [showUserSwitcher, setShowUserSwitcher] = useState(false);

  const menuItems: { page: Page; label: string; icon: React.ReactNode; adminOnly?: boolean }[] = [
    { page: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { page: 'request', label: 'Pedir Férias', icon: <PlusCircle className="w-5 h-5" /> },
    { page: 'my-vacations', label: 'Minhas Férias', icon: <CalendarDays className="w-5 h-5" /> },
    { page: 'calendar', label: 'Calendário', icon: <Calendar className="w-5 h-5" /> },
    { page: 'employees', label: 'Funcionários', icon: <Users className="w-5 h-5" />, adminOnly: true },
    { page: 'approvals', label: 'Aprovações', icon: <ClipboardCheck className="w-5 h-5" />, adminOnly: true },
    { page: 'profile', label: 'Perfil', icon: <UserCircle className="w-5 h-5" /> },
  ];

  const filteredItems = menuItems.filter(item => !item.adminOnly || user.role === 'admin');

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col relative">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-800">VacationHub</h1>
            <p className="text-xs text-gray-500">Gestão de Férias</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {filteredItems.map(item => (
          <button
            key={item.page}
            onClick={() => onPageChange(item.page)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              currentPage === item.page
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        {/* Current user info */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
            <div className="flex items-center gap-1">
              {user.role === 'admin' && <Shield className="w-3 h-3 text-amber-500" />}
              <p className="text-xs text-gray-500 truncate">
                {user.role === 'admin' ? 'Administrador' : user.department}
              </p>
            </div>
          </div>
        </div>

        {/* Switch User button (Admin only) */}
        {user.role === 'admin' && (
          <div className="relative">
            <button
              onClick={() => setShowUserSwitcher(!showUserSwitcher)}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <Eye className="w-4 h-4" />
              Ver como...
            </button>

            {/* User switcher dropdown */}
            {showUserSwitcher && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden z-50">
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Selecionar funcionário
                  </p>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {allUsers.filter(u => u.id !== user.id).map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        onSwitchUser(u.id);
                        setShowUserSwitcher(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{u.name}</p>
                        <p className="text-xs text-gray-500 truncate">{u.department}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={() => setShowUserSwitcher(false)}
                    className="w-full text-center text-xs text-gray-500 hover:text-gray-700 py-2"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Switch Account button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
        >
          <ArrowLeftRight className="w-4 h-4" />
          Trocar Conta
        </button>

        {/* Logout button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Terminar Sessão
        </button>
      </div>
    </aside>
  );
}
