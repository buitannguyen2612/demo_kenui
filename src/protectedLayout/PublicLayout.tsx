import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { loginAction } from '../mobX/authen';

type Props = {
    children: React.ReactNode
}

const PublicLayout = observer((props: Props) => {
    const authActions = loginAction
    const { isLogin } = authActions
    const isAdmin = authActions.infoUser.role === 'admin'

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