
import type { IResponseLogin, IResponseProfile, IResponseRegister } from '@/interfaces/auth'
// import {IResponseLogin, IResponseProfile, IResponseRegister} from "@/interfaces/auth";
import { useApi } from '@/composables/useApi.ts'

const url = "/api/auth";

class AuthService {
  async login(
    email: string,
    password: string
  ): Promise<IResponseLogin> {
    const resp = await useApi(`${url}/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    // const json = await data.json();
    console.log('data', resp);

    return resp;
  }

  async register(body: IRegisterUser): Promise<IResponseRegister> {
    const data = await useApi(`${url}/register`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return data;
  }

  async profile(): Promise<IResponseProfile> {
    const data = await useApi(`${url}/profile`, {
      method: "GET",
    });
    return data;
  }
}
export default new AuthService();
