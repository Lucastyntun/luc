import { User, VacationRequest } from './types';

const USERS_KEY = 'vacationhub_users';
const REQUESTS_KEY = 'vacationhub_requests';
const AUTH_KEY = 'vacationhub_auth';

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    email: 'admin@vacationhub.pt',
    password: 'admin123',
    role: 'admin',
    department: 'Recursos Humanos',
    hireDate: '2020-01-15',
    vacationDaysTotal: 22,
    vacationDaysUsed: 5,
  },
  {
    id: '2',
    name: 'Ana Rodrigues',
    email: 'ana@vacationhub.pt',
    password: '123456',
    role: 'employee',
    department: 'Engenharia',
    hireDate: '2021-03-10',
    vacationDaysTotal: 22,
    vacationDaysUsed: 8,
  },
  {
    id: '3',
    name: 'Pedro Santos',
    email: 'pedro@vacationhub.pt',
    password: '123456',
    role: 'employee',
    department: 'Marketing',
    hireDate: '2019-07-22',
    vacationDaysTotal: 22,
    vacationDaysUsed: 12,
  },
  {
    id: '4',
    name: 'Maria Oliveira',
    email: 'maria@vacationhub.pt',
    password: '123456',
    role: 'employee',
    department: 'Engenharia',
    hireDate: '2022-01-05',
    vacationDaysTotal: 22,
    vacationDaysUsed: 3,
  },
  {
    id: '5',
    name: 'João Ferreira',
    email: 'joao@vacationhub.pt',
    password: '123456',
    role: 'employee',
    department: 'Financeiro',
    hireDate: '2020-11-18',
    vacationDaysTotal: 22,
    vacationDaysUsed: 15,
  },
  {
    id: '6',
    name: 'Sofia Costa',
    email: 'sofia@vacationhub.pt',
    password: '123456',
    role: 'employee',
    department: 'Design',
    hireDate: '2023-02-14',
    vacationDaysTotal: 22,
    vacationDaysUsed: 0,
  },
];

const defaultRequests: VacationRequest[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Ana Rodrigues',
    department: 'Engenharia',
    startDate: '2025-07-01',
    endDate: '2025-07-10',
    days: 10,
    reason: 'Férias de verão com a família',
    status: 'approved',
    createdAt: '2025-05-15',
    reviewedBy: 'Carlos Silva',
    reviewedAt: '2025-05-16',
  },
  {
    id: '2',
    userId: '3',
    userName: 'Pedro Santos',
    department: 'Marketing',
    startDate: '2025-08-05',
    endDate: '2025-08-16',
    days: 12,
    reason: 'Viagem ao estrangeiro',
    status: 'pending',
    createdAt: '2025-06-01',
  },
  {
    id: '3',
    userId: '4',
    userName: 'Maria Oliveira',
    department: 'Engenharia',
    startDate: '2025-09-01',
    endDate: '2025-09-05',
    days: 5,
    reason: 'Assuntos pessoais',
    status: 'pending',
    createdAt: '2025-06-10',
  },
  {
    id: '4',
    userId: '5',
    userName: 'João Ferreira',
    department: 'Financeiro',
    startDate: '2025-07-20',
    endDate: '2025-07-25',
    days: 6,
    reason: 'Descanso e lazer',
    status: 'rejected',
    createdAt: '2025-05-20',
    reviewedBy: 'Carlos Silva',
    reviewedAt: '2025-05-22',
  },
];

export function initializeData(): void {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
  if (!localStorage.getItem(REQUESTS_KEY)) {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(defaultRequests));
  }
}

export function getUsers(): User[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : defaultUsers;
}

export function getUserById(id: string): User | undefined {
  return getUsers().find(u => u.id === id);
}

export function getRequests(): VacationRequest[] {
  const data = localStorage.getItem(REQUESTS_KEY);
  return data ? JSON.parse(data) : defaultRequests;
}

export function addRequest(request: VacationRequest): void {
  const requests = getRequests();
  requests.push(request);
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

export function updateRequestStatus(id: string, status: 'approved' | 'rejected', reviewedBy: string): void {
  const requests = getRequests();
  const idx = requests.findIndex(r => r.id === id);
  if (idx !== -1) {
    requests[idx].status = status;
    requests[idx].reviewedBy = reviewedBy;
    requests[idx].reviewedAt = new Date().toISOString().split('T')[0];
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));

    if (status === 'approved') {
      const users = getUsers();
      const userIdx = users.findIndex(u => u.id === requests[idx].userId);
      if (userIdx !== -1) {
        users[userIdx].vacationDaysUsed += requests[idx].days;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    }
  }
}

export function login(email: string, password: string): User | null {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ userId: user.id }));
    return user;
  }
  return null;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function getCurrentUser(): User | null {
  const auth = localStorage.getItem(AUTH_KEY);
  if (!auth) return null;
  const { userId } = JSON.parse(auth);
  return getUserById(userId) || null;
}

export function resetData(): void {
  localStorage.removeItem(USERS_KEY);
  localStorage.removeItem(REQUESTS_KEY);
  localStorage.removeItem(AUTH_KEY);
  initializeData();
}
