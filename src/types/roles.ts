export enum UserRole {
    Admin = 'Admin',
    User = 'User',
    Guest = 'Guest',
  }
  
  export interface User {
    id: string;
    username: string;
    role: UserRole;
  }
  