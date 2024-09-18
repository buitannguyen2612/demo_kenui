import { AxiosResponse } from "axios";
import Client from "../baseClient";
import { ILogoutPayload, ILoutoutResponse, IRegisterPayload, IRegisterResponse, LoginPayload, LoginResponse } from "../IApi/IAuthentication";

const http = new Client()

export const register = async (payload: IRegisterPayload): Promise<AxiosResponse<IRegisterResponse>> => http.post<IRegisterResponse>('user/register', payload)
export const login = async (payload: LoginPayload): Promise<AxiosResponse<LoginResponse>> => http.post<LoginResponse>('user/login', payload)
export const logoutFetch = async (payload: ILogoutPayload): Promise<AxiosResponse<ILoutoutResponse>> => http.delete<ILoutoutResponse>('user/logout', payload)
