import React, { useState } from 'react'
import Hamburger from 'hamburger-react'

type Props = {}

const HambergurHeader = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div>
            <Hamburger size={18} toggled={open} toggle={setOpen} />
            {
                open &&
                <div className='fixed pt-5 inset-0 z-10 bg-white backdrop-blur-sm'>
                    <header className='w-full flex justify-start items-center fixed'>
                        <Hamburger size={18} toggled={open} toggle={setOpen} />
                    </header>
                    <div className='w-full h-full flex justify-center items-center'>
                        this is the header
                    </div>
                </div>
            }
        </div>
    )
}

export default HambergurHeader