import React, { useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import Header from '../components/header/page';

type Props = {
    children: React.ReactNode
}

const PublicLayout = (props: Props) => {

    //* demo for useRoutMatch
    const isRegisterPage = useMatch('/')
    const isHomePage = useMatch('/todo/homepage')
    const isLoginPage = useMatch('/todo/login')
    // todo: using routematch for checking the current route and showing what they need to showss


    return (
        <div className='w-full h-screen flex flex-col'>
            <Header />
            <div className='flex-1'>{props.children}</div>
        </div >
    )
}

export default PublicLayout