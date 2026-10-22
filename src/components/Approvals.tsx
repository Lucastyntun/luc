import { User, VacationRequest } from '../types';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { updateRequestStatus } from '../data';

interface ApprovalsProps {
  user: User;
  requests: VacationRequest[];
  onUpdate: () => void;
}

export default function Approvals({ user, requests, onUpdate }: ApprovalsProps) {
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const reviewedRequests = requests.filter(r => r.status !== 'pending');

  const handleApprove = (id: string) => {
    updateRequestStatus(id, 'approved', user.name);
    onUpdate();
  };

  const handleReject = (id: string) => {
    updateRequestStatus(id, 'rejected', user.name);
    onUpdate();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Aprovações</h1>
        <p className="text-gray-500 mt-1">Gerir pedidos de férias pendentes</p>
      </div>

      {/* Pending */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-gray-800">Pendentes ({pendingRequests.length})</h2>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
            <p className="text-gray-500">Nenhum pedido pendente de aprovação</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {pendingRequests.map(request => (
              <div key={request.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {request.userName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{request.userName}</h3>
                      <p className="text-sm text-gray-500">{request.department}</p>
                    </div>
                  </div>

                  <div className="flex-1 md:text-center">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{new Date(request.startDate).toLocaleDateString('pt-PT')}</span>
                      {' → '}
                      <span className="font-medium">{new Date(request.endDate).toLocaleDateString('pt-PT')}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{request.days} dias • {request.reason || 'Sem motivo'}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Aprovar
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Rejeitar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <h2 className="text-lg font-semibold text-gray-800">Histórico</h2>
        </div>

        {reviewedRequests.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
            <p className="text-gray-500">Sem histórico de aprovações</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Funcionário</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Período</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Dias</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {reviewedRequests.map(request => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <div className="text-sm font-medium text-gray-800">{request.userName}</div>
                        <div className="text-xs text-gray-500">{request.department}</div>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600">
                        {new Date(request.startDate).toLocaleDateString('pt-PT')} → {new Date(request.endDate).toLocaleDateString('pt-PT')}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600">{request.days}</td>
                      <td className="px-6 py-3">
                        {request.status === 'approved' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <CheckCircle className="w-3 h-3" /> Aprovado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                            <XCircle className="w-3 h-3" /> Rejeitado
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
