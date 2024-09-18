import { jwtDecode } from "jwt-decode";
import { action, makeAutoObservable, observable } from "mobx";
import { clearCookie, createCookie, parseDiffDay, readCookie } from "../utils/cookie";


let access_token = readCookie('access_token')

class authenSlice {
    token: string = ''
    refreshToken: string = ''
    tokenLifeSpan: number = 0
    userName: string = ''
    isLogin: boolean = Boolean(access_token)
    infoUser: object = {}

    constructor() {
        makeAutoObservable(this,
            {
                token: observable,
                refreshToken: observable,
                tokenLifeSpan: observable,
                isLogin: observable,
                infoUser: observable,
                userName: observable,
                login: action,
                logout: action,
            }

        )
    }

    login(token: string,
        refreshToken: string,
        tokenLifeSpan: number,
        userName: string
    ) {
        const day = parseDiffDay(tokenLifeSpan)
        createCookie('access_token', token, day)
        createCookie('refresh_token', refreshToken, day)
        this.isLogin = true
        this.infoUser = jwtDecode(token) || null
        this.userName = userName
    }

    logout() {
        this.isLogin = false
        clearCookie('access_token')
        clearCookie('refresh_token')
    }

}


export const loginAction = new authenSlice()