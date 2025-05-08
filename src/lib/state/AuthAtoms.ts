import { atom } from 'jotai';

export interface User {
  id: string;
  username: string;
  name?: string;
  email?: string;
}

export const userAtom = atom<User | null>(null);

export const authLoadingAtom = atom<boolean>(true);
