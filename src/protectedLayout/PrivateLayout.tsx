import React from 'react'
import Header from '../components/header/page'
import { observer } from 'mobx-react-lite'
import { loginAction } from '../mobX/authen'
import { Navigate, useMatch } from 'react-router-dom'

type Props = {
    children: React.ReactNode
}

const PrivateLayout = observer((props: Props) => {
    const authActions = loginAction
    const { isLogin } = authActions
    const isLoginPage = useMatch('/todo/login')
    const isRegisterPage = useMatch('/')

    if (!isLogin) {
        return <Navigate to={'/todo/login'} />
    }
    else if (isLogin && isLoginPage && isRegisterPage) {
        return
    }
    return (
        <div className='w-full h-screen flex flex-col backdrop-blur-xl '>
            <Header />
            <div className='flex-1'>{props.children}</div>
        </div >
    )


})

export default PrivateLayout