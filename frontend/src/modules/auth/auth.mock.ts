import { AuthUser } from './auth.typings.ts';


export const AUTH_USERS = [
  { email: 'john@gmail.com', id: '111', avatar: '/avatars/1.jpg' },
  { email: 'elena@gmail.com', id: '222', avatar: '/avatars/3.jpg' },
  { email: 'oleksandr@gmail.com', id: '333', avatar: '/avatars/2.jpg' },
  { email: 'anna@gmail.com', id: '444', avatar: '/avatars/7.jpg' }
];

export function getUserByEmail(email: string): AuthUser | undefined {
  return AUTH_USERS.find((u) => u.email === email);
}

export function getUserById(id: string): AuthUser | undefined {
  return AUTH_USERS.find((u) => u.id === id);
}