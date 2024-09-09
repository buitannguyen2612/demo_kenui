import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

const TestParam = (props: Props) => {

    // get the param when pasisng the data to another page
    const param = useParams()
    useEffect(() => {
        console.log('this is param', param);
    }, [param])

    return (
        <div>TestParam</div>
    )
}

export default TestParam