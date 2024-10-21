// src/types/userTypes.ts

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string; // Optional
  address?: string;
  phone?: string;
  roleData?: {
    code: string;
  };
};

export type UserType = {
  current: User | null;
  getCurrent: () => Promise<void>;
  clearCurrent: () => void;
};
