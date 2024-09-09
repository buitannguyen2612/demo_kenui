import React from 'react'

type Props = {
    children: React.ReactNode
}

const PrivateLayout = (props: Props) => {
    return (
        <div>{props.children}</div>
    )
}

export default PrivateLayout