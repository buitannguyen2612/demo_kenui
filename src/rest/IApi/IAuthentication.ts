export interface LoginPayload {
    userName: string;
    password: string;
}

export interface LoginResponse {
    error: boolean;
    infomationUser: {
        _id: string;
        name: string;
        role: string;
        mail: string;
        iat: number;
        exp: number;
    };
    accessToken: string;
    refreshToken: string;
    message: string;
    tokenLifespan: number;
}


export interface IRegisterPayload {
    userName: string;
    password: string;
    email: string;
    role: string;
}

export interface IRegisterResponse {
    saveUser?: object;
    message: string;
}

export interface ILogoutPayload {
    refreshToken: string | null
}

export interface ILoutoutResponse {
    error: boolean;
    message: string;
}

export interface IlistTodoResponse {
    _id: string;
    name: string;
    isComplete: boolean;
    user: string;
    __v: number;
}

export interface IAddTodoPayload {
    name: string;
    isComplete: boolean;
}


export interface IListUserReponse {
    _id: string;
    userName: string;
    email: string;
    password: string;
    role:string;
    todo:number;
    __v: number;
}




