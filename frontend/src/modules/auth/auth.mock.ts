import { AuthUser } from './auth.typings.ts';


export const AUTH_USERS = [
  { email: 'john@gmail.com', id: '111' },
  { email: 'elena@gmail.com', id: '222' },
  { email: 'oleksandr@gmail.com', id: '333' },
  { email: 'anna@gmail.com', id: '444' }
];

export function getUserByEmail(email: string): AuthUser | undefined {
  return AUTH_USERS.find((u) => u.email === email);
}

export function getUserById(id: string): AuthUser | undefined {
  return AUTH_USERS.find((u) => u.id === id);
}