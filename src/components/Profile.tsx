import { User } from '../types';
import { UserCircle, Mail, Building2, Calendar, Clock, Award } from 'lucide-react';

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  const remainingDays = user.vacationDaysTotal - user.vacationDaysUsed;
  const usagePercent = Math.round((user.vacationDaysUsed / user.vacationDaysTotal) * 100);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
        <p className="text-gray-500 mt-1">Informações pessoais e resumo de férias</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
            <span className="text-3xl font-bold text-white">{user.name.charAt(0)}</span>
          </div>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <p className="text-blue-100 mt-1">{user.department}</p>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
            user.role === 'admin' ? 'bg-amber-400/20 text-amber-100' : 'bg-white/20 text-white'
          }`}>
            {user.role === 'admin' ? 'Administrador' : 'Funcionário'}
          </span>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-800">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Building2 className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Departamento</p>
              <p className="text-sm font-medium text-gray-800">{user.department}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Data de Admissão</p>
              <p className="text-sm font-medium text-gray-800">
                {new Date(user.hireDate).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <UserCircle className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">ID Funcionário</p>
              <p className="text-sm font-medium text-gray-800">#{user.id.padStart(4, '0')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vacation Summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          Resumo de Férias
        </h3>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-3xl font-bold text-blue-600">{user.vacationDaysTotal}</p>
            <p className="text-xs text-blue-500 mt-1">Total Anual</p>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-xl">
            <p className="text-3xl font-bold text-amber-600">{user.vacationDaysUsed}</p>
            <p className="text-xs text-amber-500 mt-1">Utilizados</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-3xl font-bold text-green-600">{remainingDays}</p>
            <p className="text-xs text-green-500 mt-1">Disponíveis</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progresso de utilização</span>
            <span className="font-medium text-gray-800">{usagePercent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${
                usagePercent > 80 ? 'bg-red-500' : usagePercent > 50 ? 'bg-amber-500' : 'bg-green-500'
              }`}
              style={{ width: `${usagePercent}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Ano de referência: {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
