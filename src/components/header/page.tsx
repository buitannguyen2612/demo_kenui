import { NavLink } from "react-router-dom"

type Props = {}

const Header = (props: Props) => {

    const listComponent = [
        {
            id: 1,
            path: '/',
            label: 'Grid'
        }, {
            id: 2,
            path: '/todo/homepage',
            label: 'HomePage'
        },
    ]
    return (
        <header className='w-full h-[6rem] flex-shrink-0 shadow-xl flex justify-between items-center p-[0_2rem]'>
            <ul className="flex gap-[1rem]">
                {
                    listComponent.map(val => (
                        <NavLink to={val.path} key={val.id} className={({ isActive }) =>
                            isActive ? "font-bold text-[1.5rem] text-white before:content-none before:w-full before:h-[0.2rem] before:bg-black before:bottom-0 before:left-0" : "text-[1.5rem] font-bold text-white"
                        }>
                            {val.label}
                        </NavLink>
                    ))
                }

            </ul>
            <div className="h-full flex justify-center items-center">
                <span>this is logo</span>
            </div>
        </header >
    )
}

export default Header