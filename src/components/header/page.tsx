import { NavLink, useMatch } from "react-router-dom"
import logoImage from '../../images/logoImage.jpg'
import { memo } from "react"

type Props = {}

const Header = (props: Props) => {

    const isHomePage = useMatch('/todo/homepage')
    const isGrid = useMatch('/todo/grid')


    const listComponent = [
        {
            id: 1,
            path: '/todo/login',
            label: 'Login'
        }, {
            id: 2,
            path: '/',
            label: 'Register'
        },
    ]

    const privateList = [
        {
            id: 1,
            path: '/todo/homepage',
            label: 'TodoList'
        },
        {
            id: 2,
            path: '/todo/grid',
            label: 'GridTable'
        }
    ]
    return (
        <header className='w-full h-[4rem] flex-shrink-0 bg-[#fff] shadow-xl flex justify-between items-center p-[0_2rem]'>
            <ul className="flex gap-[1rem]">
                {
                    (isHomePage || isGrid ? privateList : listComponent).map(val => (
                        <NavLink to={val.path} key={val.id} className={({ isActive, isPending }) =>
                            isActive ? "relative text-[1.2rem] font-bold text-black before:content-[''] before:absolute before:bottom-0 before:left-0 before:bg-[#6a85b6] before:h-[0.2rem] before:w-full" : "text-[1.2rem] font-normal text-black "
                        }>
                            {val.label}
                        </NavLink>
                    ))
                }

            </ul>
            {
                (isHomePage || isGrid) &&
                <div className="h-full flex justify-center items-center">
                    <span className="h-[3rem] w-[3rem] cursor-pointer rounded-full overflow-hidden"><img src={logoImage} alt="Logo" className="w-full h-full object-cover object-center" /></span>
                </div>
            }
        </header >
    )
}

export default memo(Header)