import { useState } from 'react';
import { VacationRequest } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VacationCalendarProps {
  requests: VacationRequest[];
}

export default function VacationCalendar({ requests }: VacationCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday start
  const daysInMonth = lastDay.getDate();

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getVacationsForDay = (day: number) => {
    const date = new Date(year, month, day);
    return requests.filter(r => {
      if (r.status !== 'approved') return false;
      const start = new Date(r.startDate);
      const end = new Date(r.endDate);
      return date >= start && date <= end;
    });
  };

  const today = new Date();
  const isToday = (day: number) =>
    today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

  const calendarDays = [];
  // Empty cells before first day
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null);
  }
  // Days of month
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Calendário de Férias</h1>
        <p className="text-gray-500 mt-1">Visualize as férias de todos os funcionários</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">
            {monthNames[month]} {year}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {dayNames.map(day => (
            <div key={day} className="p-3 text-center text-xs font-semibold text-gray-500 uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="min-h-[100px] border-b border-r border-gray-50 bg-gray-50/50"></div>;
            }

            const vacations = getVacationsForDay(day);
            const todayClass = isToday(day) ? 'bg-blue-50' : '';

            return (
              <div
                key={`day-${day}`}
                className={`min-h-[100px] border-b border-r border-gray-50 p-1.5 ${todayClass}`}
              >
                <div className={`text-sm font-medium mb-1 w-7 h-7 flex items-center justify-center rounded-full ${
                  isToday(day) ? 'bg-blue-600 text-white' : 'text-gray-700'
                }`}>
                  {day}
                </div>
                <div className="space-y-0.5">
                  {vacations.slice(0, 3).map(v => (
                    <div
                      key={v.id}
                      className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded truncate"
                      title={`${v.userName}: ${v.startDate} → ${v.endDate}`}
                    >
                      {v.userName.split(' ')[0]}
                    </div>
                  ))}
                  {vacations.length > 3 && (
                    <div className="text-xs text-gray-400 px-1.5">+{vacations.length - 3} mais</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-100 rounded"></div>
          <span>Férias aprovadas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span>Hoje</span>
        </div>
      </div>
    </div>
  );
}
