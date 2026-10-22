import { User, VacationRequest } from '../types';
import { CheckCircle, XCircle, Clock, CalendarDays } from 'lucide-react';

interface MyVacationsProps {
  user: User;
  requests: VacationRequest[];
}

export default function MyVacations({ user, requests }: MyVacationsProps) {
  const myRequests = requests.filter(r => r.userId === user.id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            <CheckCircle className="w-3 h-3" /> Aprovado
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
            <XCircle className="w-3 h-3" /> Rejeitado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
            <Clock className="w-3 h-3" /> Pendente
          </span>
        );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Minhas Férias</h1>
        <p className="text-gray-500 mt-1">Histórico e estado dos seus pedidos de férias</p>
      </div>

      {myRequests.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Ainda não fez nenhum pedido de férias</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Dias</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Data Pedido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {myRequests.map(request => (
                  <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-800">
                        {new Date(request.startDate).toLocaleDateString('pt-PT')}
                      </div>
                      <div className="text-xs text-gray-500">
                        até {new Date(request.endDate).toLocaleDateString('pt-PT')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-blue-600">{request.days} dias</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{request.reason || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString('pt-PT')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
