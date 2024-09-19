import { observer } from 'mobx-react-lite'
import React from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../components/header/page'
import { loginAction } from '../mobX/authen'

type Props = {
    children: React.ReactNode
}

const AdminLayout = observer((props: Props) => {
    const authActions = loginAction
    const { isLogin, infoUser } = authActions
    
    if (!isLogin || infoUser.role !== 'admin') {
        return <Navigate to={'/'} />
    }
    return (
        <div className='w-full h-screen flex flex-col backdrop-blur-xl '>
            <Header />
            <div className='flex-1'>{props.children}</div>
        </div >
    )


})

export default AdminLayout