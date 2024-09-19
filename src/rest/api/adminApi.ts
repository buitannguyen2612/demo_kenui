import { AxiosResponse } from "axios";
import Client from "../baseClient";
import { IAddTodoPayload, IListUserReponse, IUserUpatePayload } from "../IApi/IAuthentication";

const http = new Client()

export const getAllUser = async (): Promise<AxiosResponse<Array<IListUserReponse>>> => http.get<Array<IListUserReponse>>('admin/getall')
export const deleteUser = async (id: string): Promise<AxiosResponse<any>> => http.delete<any>(`admin/remove-user/${id}`)
export const putUser = async (id: string, payload: IUserUpatePayload): Promise<AxiosResponse<any>> => http.put<any>(`admin/update-user/${id}`, payload)

export const deleteTodoElement = async (id: string): Promise<AxiosResponse<any>> => http.delete<any>(`todo/delete/${id}`)
export const completeTodo = async (id: string, payload: { isComplete: boolean }): Promise<AxiosResponse<any>> => http.patch<any>(`todo/complete/${id}`, payload)
export const unComPleteTodo = async (id: string, payload: { isComplete: boolean }): Promise<AxiosResponse<any>> => http.patch<any>(`todo/uncomplete/${id}`, payload)

