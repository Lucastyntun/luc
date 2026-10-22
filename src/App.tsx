import { useState, useEffect, useCallback } from 'react';
import { User, Page, VacationRequest } from './types';
import { initializeData, getCurrentUser, logout, getUsers, getRequests } from './data';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import VacationRequestForm from './components/VacationRequestForm';
import MyVacations from './components/MyVacations';
import Approvals from './components/Approvals';
import EmployeeList from './components/EmployeeList';
import VacationCalendar from './components/VacationCalendar';
import Profile from './components/Profile';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<VacationRequest[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeData();
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      refreshData();
    }
    setLoading(false);
  }, []);

  const refreshData = useCallback(() => {
    setUsers(getUsers());
    setRequests(getRequests());
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    refreshData();
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setCurrentPage('dashboard');
  };

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} requests={requests} users={users} />;
      case 'request':
        return <VacationRequestForm user={user} onSubmit={refreshData} />;
      case 'my-vacations':
        return <MyVacations user={user} requests={requests} />;
      case 'approvals':
        return <Approvals user={user} requests={requests} onUpdate={refreshData} />;
      case 'employees':
        return <EmployeeList users={users} requests={requests} />;
      case 'calendar':
        return <VacationCalendar requests={requests} />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <Dashboard user={user} requests={requests} users={users} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="font-bold text-gray-800">VacationHub</h1>
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          {user.name.charAt(0)}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar
          currentPage={currentPage}
          onPageChange={handlePageChange}
          user={user}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile close button */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-4 md:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
