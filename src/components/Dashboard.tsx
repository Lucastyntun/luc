import { User, VacationRequest } from '../types';
import { CalendarDays, Users, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

interface DashboardProps {
  user: User;
  requests: VacationRequest[];
  users: User[];
}

export default function Dashboard({ user, requests, users }: DashboardProps) {
  const myRequests = requests.filter(r => r.userId === user.id);
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const approvedRequests = requests.filter(r => r.status === 'approved');
  const remainingDays = user.vacationDaysTotal - user.vacationDaysUsed;

  const upcomingVacations = approvedRequests
    .filter(r => new Date(r.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Olá, {user.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Bem-vindo ao seu painel de gestão de férias</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Dias Disponíveis</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{remainingDays}</p>
              <p className="text-xs text-gray-400 mt-1">de {user.vacationDaysTotal} dias</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CalendarDays className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Dias Utilizados</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{user.vacationDaysUsed}</p>
              <p className="text-xs text-gray-400 mt-1">este ano</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {user.role === 'admin' && (
          <>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pedidos Pendentes</p>
                  <p className="text-3xl font-bold text-amber-600 mt-1">{pendingRequests.length}</p>
                  <p className="text-xs text-gray-400 mt-1">aguardam aprovação</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Funcionários</p>
                  <p className="text-3xl font-bold text-purple-600 mt-1">{users.length}</p>
                  <p className="text-xs text-gray-400 mt-1">na empresa</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </>
        )}

        {user.role === 'employee' && (
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pedidos</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{myRequests.length}</p>
                <p className="text-xs text-gray-400 mt-1">total de pedidos</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Progresso de Férias</h3>
          <span className="text-sm text-gray-500">{user.vacationDaysUsed}/{user.vacationDaysTotal} dias</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(user.vacationDaysUsed / user.vacationDaysTotal) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>0 dias</span>
          <span>{user.vacationDaysTotal} dias</span>
        </div>
      </div>

      {/* Upcoming Vacations */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Próximas Férias</h3>
        {upcomingVacations.length === 0 ? (
          <p className="text-gray-500 text-sm">Nenhuma férias agendada</p>
        ) : (
          <div className="space-y-3">
            {upcomingVacations.map(vacation => (
              <div key={vacation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">
                      {vacation.userName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {user.role === 'admin' ? vacation.userName : 'Férias'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(vacation.startDate).toLocaleDateString('pt-PT')} - {new Date(vacation.endDate).toLocaleDateString('pt-PT')}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {vacation.days} dias
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Atividade Recente</h3>
        <div className="space-y-3">
          {myRequests.slice(0, 5).map(request => (
            <div key={request.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
              {request.status === 'approved' && <CheckCircle className="w-5 h-5 text-green-500" />}
              {request.status === 'rejected' && <XCircle className="w-5 h-5 text-red-500" />}
              {request.status === 'pending' && <Clock className="w-5 h-5 text-amber-500" />}
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  {request.startDate} → {request.endDate}
                </p>
                <p className="text-xs text-gray-500">{request.reason}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                request.status === 'approved' ? 'bg-green-50 text-green-700' :
                request.status === 'rejected' ? 'bg-red-50 text-red-700' :
                'bg-amber-50 text-amber-700'
              }`}>
                {request.status === 'approved' ? 'Aprovado' :
                 request.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
              </span>
            </div>
          ))}
          {myRequests.length === 0 && (
            <p className="text-gray-500 text-sm">Sem atividade recente</p>
          )}
        </div>
      </div>
    </div>
  );
}
