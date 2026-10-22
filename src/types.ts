export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'employee';
  department: string;
  avatar?: string;
  hireDate: string;
  vacationDaysTotal: number;
  vacationDaysUsed: number;
}

export interface VacationRequest {
  id: string;
  userId: string;
  userName: string;
  department: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export type Page = 'dashboard' | 'my-vacations' | 'request' | 'employees' | 'calendar' | 'approvals' | 'profile';
