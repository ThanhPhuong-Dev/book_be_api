export class UserModel {
  email: string;
  name: string;
  isAdmin?: boolean;
  password: string;
  address?: string;
  userId?: number;
  constructor(data: UserModel) {
    this.email = data.email;
    this.name = data.name;
    this.isAdmin = data.isAdmin || false;
    this.password = data.password;
    this.address = data.address;
    this.userId = data.userId || 12444;
  }
}
