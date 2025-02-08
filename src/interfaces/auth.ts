export interface IResponseLogin {
  data: {
    access_token: string;
    expires_in: number;
    token_type: string;
    user: IUserAuth
  };
  message: string;
  status: boolean;
}

export interface IUserAuth {
  id: number;
  name: string;
  email: string;
  birth_date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILogin {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface StoreAuth {
  user: IUserAuth | null;
  token: string | null;
  authenticated: boolean;
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  // phone: string;
}

export interface IResponseRegister {
  data: {
    accessToken: string;
  };
  message: string;
  status: boolean;
}

export interface IResponseProfile {
  data: IUserAuth;
  message: string;
  status: boolean;
}
