import { User, VacationRequest } from '../types';
import { Users as UsersIcon, CalendarDays } from 'lucide-react';

interface EmployeeListProps {
  users: User[];
  requests: VacationRequest[];
}

export default function EmployeeList({ users, requests }: EmployeeListProps) {
  const departments = [...new Set(users.map(u => u.department))];

  const getEmployeeVacations = (userId: string) => {
    return requests.filter(r => r.userId === userId && r.status === 'approved');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Funcionários</h1>
        <p className="text-gray-500 mt-1">Lista de todos os funcionários da empresa</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{departments.length}</p>
              <p className="text-xs text-gray-500">Departamentos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {Math.round(users.reduce((acc, u) => acc + (u.vacationDaysTotal - u.vacationDaysUsed), 0) / users.length)}
              </p>
              <p className="text-xs text-gray-500">Média dias disponíveis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Filter */}
      {departments.map(dept => (
        <div key={dept} className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">{dept}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.filter(u => u.department === dept).map(employee => {
              const vacations = getEmployeeVacations(employee.id);
              const remaining = employee.vacationDaysTotal - employee.vacationDaysUsed;
              return (
                <div key={employee.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {employee.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{employee.name}</h3>
                      <p className="text-sm text-gray-500">{employee.email}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Desde {new Date(employee.hireDate).toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-blue-600">{employee.vacationDaysTotal}</p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-amber-600">{employee.vacationDaysUsed}</p>
                      <p className="text-xs text-gray-500">Usados</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-green-600">{remaining}</p>
                      <p className="text-xs text-gray-500">Disponíveis</p>
                    </div>
                  </div>

                  {vacations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Próximas férias aprovadas:</p>
                      {vacations.slice(0, 2).map(v => (
                        <p key={v.id} className="text-xs text-gray-600">
                          {new Date(v.startDate).toLocaleDateString('pt-PT')} → {new Date(v.endDate).toLocaleDateString('pt-PT')} ({v.days} dias)
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
