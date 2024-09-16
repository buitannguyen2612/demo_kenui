import React from 'react'

type Props = {
    children: React.ReactNode
    isOpen: boolean
    callBack: Function
}

const PopupForm: React.FC<Props> = ({ children, isOpen, callBack }) => {

    const closeTrigger = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        callBack()
    }

    return (
        <>
            {
                isOpen ?
                    <>
                        <div id='container' onClick={closeTrigger} className='fixed pt-5 inset-0 z-10 bg-black bg-opacity-25 backdrop-blur-sm' >
                        </div>
                        <div className='absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                            {children}
                        </div>
                    </>
                    : null
            }

        </>
    )
}

export default PopupForm