export interface IUser {
  email: string;
  name: string;
  password: string;
  confirmPassword?: string;
  address?: string;
  phone?: number;
  city?: string;
}
