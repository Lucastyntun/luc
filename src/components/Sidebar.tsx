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
} from 'lucide-react';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  user: User;
  onLogout: () => void;
}

export default function Sidebar({ currentPage, onPageChange, user, onLogout }: SidebarProps) {
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
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col fixed left-0 top-0 z-30">
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

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.department}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </aside>
  );
}
