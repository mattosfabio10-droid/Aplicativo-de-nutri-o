
import { User } from '../types';

export const AuthorizedUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Fábio Mattos',
    email: 'fabio@nutri.com',
    password: '123456', // Em produção, usar hash
    crn: '33174',
    role: 'nutritionist'
  }
];
