
import axios, { AxiosResponse } from 'axios';
import { readCookie } from '../utils/cookie';

export default class Client {
    baseUrl
    client
    constructor(server = process.env.REACT_APP_LOCAL_URL) {
        this.baseUrl = server
        this.client = axios.create(
            {
                baseURL: this.baseUrl,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        this.client.interceptors.request.use(async (config) => {
            let access_token = readCookie('access_token')
            config.headers.Authorization = `Bearer ${access_token}`
            return config
        })
    }

    async get<T>(url: string, payload?: object): Promise<AxiosResponse<T>> {
        let res
        try {
            res = await this.client.get(url, payload || {})
        } catch (e) {
            throw e
        }
        return res
    }

    async post<T>(url: string, payload: object, config?: any): Promise<AxiosResponse<T>> {
        let res
        try {
            res = await this.client.post(url, payload || {}, config)
        } catch (e) {
            throw e
        }
        return res
    }

    async put<T>(url: string, payload?: object): Promise<AxiosResponse<T>> {
        let res
        try {
            res = await this.client.put(url, payload || {})
        } catch (e) {
            throw e
        }
        return res
    }

    async delete<T>(url: string, payload?: object): Promise<AxiosResponse<T>> {
        let res
        try {
            res = await this.client.delete(url, payload || {})
        } catch (e) {
            throw e
        }
        return res
    }

    async patch<T>(url: string, payload?: object, config?: any): Promise<AxiosResponse<T>> {
        let res
        try {
            res = await this.client.patch(url, payload || {}, config)
        } catch (e) {
            throw e
        }
        return res
    }

}