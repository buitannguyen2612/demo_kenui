import { AxiosResponse } from "axios";
import Client from "../baseClient";
import { IAddTodoPayload, IListUserReponse } from "../IApi/IAuthentication";

const http = new Client()

export const getAllUser = async (): Promise<AxiosResponse<Array<IListUserReponse>>> => http.get<Array<IListUserReponse>>('admin/getall')
export const postTodoElement = async (payload: IAddTodoPayload): Promise<AxiosResponse<any>> => http.post<any>('todo/addnew', payload)
export const deleteTodoElement = async (id: string): Promise<AxiosResponse<any>> => http.delete<any>(`todo/delete/${id}`)
export const updateTodo = async (id: string, payload: { name: string }): Promise<AxiosResponse<any>> => http.patch<any>(`todo/update/${id}`, payload)
export const completeTodo = async (id: string, payload: {isComplete: boolean}): Promise<AxiosResponse<any>> => http.patch<any>(`todo/complete/${id}`, payload)
export const unComPleteTodo = async (id: string, payload: {isComplete: boolean}): Promise<AxiosResponse<any>> => http.patch<any>(`todo/uncomplete/${id}`, payload)

