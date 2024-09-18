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
    const { isLogin } = authActions

    if (isLogin) {
        return <Navigate to={'/todo/homepage'} />
    }
    return (
        <div className='w-full h-screen flex flex-col'>
            {/* <Header /> */}
            <div className='flex-1'>{props.children}</div>
        </div >
    )
})

export default PublicLayout