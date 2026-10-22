import React, { useState } from 'react';
import { User, VacationRequest } from '../types';
import { addRequest } from '../data';
import { Send, Calendar, Info } from 'lucide-react';

interface VacationRequestFormProps {
  user: User;
  onSubmit: () => void;
}

export default function VacationRequestForm({ user, onSubmit }: VacationRequestFormProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const remainingDays = user.vacationDaysTotal - user.vacationDaysUsed;

  const calculateDays = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

  const days = calculateDays(startDate, endDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!startDate || !endDate) {
      setError('Por favor, preencha as datas.');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError('A data de fim deve ser posterior à data de início.');
      return;
    }

    if (days > remainingDays) {
      setError(`Não tem dias suficientes. Disponíveis: ${remainingDays}`);
      return;
    }

    const request: VacationRequest = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      department: user.department,
      startDate,
      endDate,
      days,
      reason,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    addRequest(request);
    setSuccess(true);
    setStartDate('');
    setEndDate('');
    setReason('');
    setTimeout(() => {
      setSuccess(false);
      onSubmit();
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pedir Férias</h1>
        <p className="text-gray-500 mt-1">Preencha o formulário para solicitar férias</p>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-blue-800 font-medium">Dias disponíveis: {remainingDays}</p>
          <p className="text-xs text-blue-600 mt-0.5">Total: {user.vacationDaysTotal} | Utilizados: {user.vacationDaysUsed}</p>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-6">
          ✓ Pedido de férias submetido com sucesso! Aguarde a aprovação.
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4 inline mr-1" />
              Data de Início
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4 inline mr-1" />
              Data de Fim
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>
        </div>

        {days > 0 && (
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <span className="text-sm text-gray-600">Total de dias: </span>
            <span className="text-lg font-bold text-blue-600">{days}</span>
            {days > remainingDays && (
              <span className="text-xs text-red-500 ml-2">(excede os dias disponíveis!)</span>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Motivo (opcional)</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            placeholder="Descreva o motivo do pedido de férias..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Submeter Pedido
        </button>
      </form>
    </div>
  );
}
