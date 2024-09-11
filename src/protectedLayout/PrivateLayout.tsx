import React from 'react'
import Header from '../components/header/page'

type Props = {
    children: React.ReactNode
}

const PrivateLayout = (props: Props) => {
    return (
        <div className='w-full h-screen flex flex-col'>
            <Header />
            <div className='flex-1'>{props.children}</div>
        </div >
    )
}

export default PrivateLayout