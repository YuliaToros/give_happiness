import { axiosInstance, setAccessToken } from "@/shared/lib/axiosInstance";
import { UserWithoutPasswordType, RoleList, UserList } from "../model";

enum API_ROUTES {
  REG_PATH = "/auth/registration",
  AUTH_PATH = "/auth/authorization",
  LOGOUT_PATH = "/auth/logout",
  REFRESH_PATH = "/auth/refresh",
  UPDATE_PATH = "/auth/update",
}

export class UserService {
  // ---Взять роли для пользователя---
  static async getRoles(): Promise<RoleList> {
    const response = await axiosInstance.get("/role");
    return response.data.role;
  }

  static async getUsers(): Promise<UserList>  {
    const response = await axiosInstance.get("/user");
    console.log("Response data:", response.data);

    if (response.status === 200) {
      return response.data; // Данные получены, возвращаем их
    } else {
      return [];
    }
  }

  static async registration(
    email: string, 
    password: string, 
    name:string, 
    role_id:number
    ): Promise<{ accessToken: string, user: UserWithoutPasswordType }> {
      const response = await axiosInstance.post(API_ROUTES.REG_PATH, {
          email,
          password,
          name,
          role_id
      });
  setAccessToken(response.data.accessToken);
  return response.data;
  }

  static async authorization(
    email: string,
    password: string
  ): Promise<{ accessToken: string; user: UserWithoutPasswordType }> {
    const response = await axiosInstance.post(API_ROUTES.AUTH_PATH, {
      email,
      password,
    });

    setAccessToken(response.data.accessToken);
    return response.data;
  }

  static async logout(): Promise<void> {
    await axiosInstance.delete(API_ROUTES.LOGOUT_PATH);
    setAccessToken("");
  }

  static async refreshAccessToken(): Promise<{
    accessToken: string;
    user: UserWithoutPasswordType;
  }> {
    const response = await axiosInstance.get(API_ROUTES.REFRESH_PATH);
    setAccessToken(response.data.accessToken);
    return response.data;
  }

  // добавить сервис на апдейт
  // принимает данные с формы из санки
  // стручится put ручкой на бэк
  // возвращает response.data.user и setAccessToken(response.data.accessToken)

  static async updateUser(
    name: string,
    email: string,
    phone: number,
    company_name: string,
    company_description: string
  ): Promise<{ accessToken: string; user: UserWithoutPasswordType }> {
    const response = await axiosInstance.post(API_ROUTES.UPDATE_PATH, {
      name,
      email,
      phone,
      company_name,
      company_description,
    });
    //
    const tokenResponse = await axiosInstance.get(API_ROUTES.REFRESH_PATH);
    setAccessToken(tokenResponse.data.accessToken); // или просто передать refreshAccessToken() ??
    return response.data;
  }
}
