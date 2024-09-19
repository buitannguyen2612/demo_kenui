import React from 'react';
import Header from '../components/header/page';
import { loginAction } from '../mobX/authen';
import { Navigate, useMatch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

type Props = {
    children: React.ReactNode
}

const PublicLayout = observer((props: Props) => {
    const authActions = loginAction
    const { isLogin, infoUser } = authActions
    const isAdmin = infoUser.role === 'admin'

    if (isLogin) {
        if (isAdmin) {
            return <Navigate to={'/todo/user-manage'} />
        }
        else {
            return <Navigate to={'/todo/homepage'} />
        }
    }

    return (
        <div className='w-full h-screen flex flex-col'>
            {/* <Header /> */}
            <div className='flex-1'>{props.children}</div>
        </div >
    )
})

export default PublicLayout