import React, { useEffect } from 'react';
import { useMatch } from 'react-router-dom';

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
        // todo: Using grid layout of kendoUI for styling the header
        // todo: creating header component
        <div>{props.children}</div>
    )
}

export default PublicLayout