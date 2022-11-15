export interface AuthModuleParams {
  kaibaseEndpoint: string;
  clientId: string;
  clientSecret: string;
}

export interface RegisterUserParams {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string
}