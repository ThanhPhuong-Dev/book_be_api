export interface IEnvConfig {
  mongoSettings: {
    mongoUrl: string;
    mongoDatabase: string;
  };
  jsonWebToken: {
    access_token: string;
    refresh_token: string;
  };

  nodemailer: {
    email: string;
    password: string;
  };
}
