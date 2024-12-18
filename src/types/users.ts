export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Guest = 'Guest',
}

export interface Role {
  role_id: number;
  role_name: string;
  created_at: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  last_login: string;
  is_active: boolean;
  roles?: Role[];
}
