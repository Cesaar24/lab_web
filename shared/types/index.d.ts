// 1. Esto es vital: convierte el archivo en un módulo para que TS
// permita el uso de 'declare global'
declare global {
  // Aquí tus interfaces, tipos o enums
  type Role = "User" | "Admin";
  type Subscription = "Free" | "Basic" | "Standard" | "Premium";

  interface User {
    name: string;
    lastName?: string;
    username?: string;
    password: string;
    email: string;
    id: string;
    role: Role;
    subscription?: Subscription;
    isAdmin: boolean;
  }

  interface userProfileForm {
    id: string;
    name: string;
    email: string;
    role?: Role;
    subscription?: Subscription;
    isAdmin: boolean;
  }

  interface UserState {
    user: {
      credentials: {
        logged: boolean;
        ip: string | null;
        infoConnection: object;
      };
      profile: userProfileForm | {};
    };
  }

  interface UserRegisterForm {
    name: string;
    lastName?: string;
    username?: string;
    password: string;
    email: string;
    isAdmin?: boolean;
  }
  interface UserInput {
    email: string;
    password: string;
  }
}
export {};
