import React, { useEffect } from 'react';
import { useMatch } from 'react-router-dom';

type Props = {
    children: React.ReactNode
}

const PublicLayout = (props: Props) => {

    // demo for useRoutMatch
    const match = useMatch('/todo/login')
    useEffect(() => {
        console.log('this is for testing useMatch', match);
    }, [match])



    return (
        <div>{props.children} hello</div>
    )
}

export default PublicLayout