import {
    Popover,
    PopoverActionsBar,
} from "@progress/kendo-react-tooltip";
import { observer } from "mobx-react-lite";
import { memo, useCallback, useRef, useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
import logoImage from '../../images/logoImage.jpg';
import { loginAction } from "../../mobX/authen";
import { logoutFetch } from "../../rest/api/authentication";
import { readCookie } from "../../utils/cookie";
import { todoAction } from "../../mobX/todoStore";
import { showToatify } from "../../utils/toastify";

type Props = {}

const Header = observer((props: Props) => {
    const authAction = loginAction
    const acitonTodo = todoAction
    const anchor = useRef<HTMLSpanElement>(null);
    const [show, setShow] = useState(false);

    const triggerShowBtn = useCallback(() => {
        setShow(!show);
    }, [setShow, show]);

    const isHomePage = useMatch('/todo/homepage')
    const isGrid = useMatch('/todo/grid')
    const isManage = useMatch('/todo/user-manage')

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
        },
        {
            id: 3,
            path: '/todo/user-manage',
            label: 'userManage'
        }
    ]

    // * fetch logout
    const fetchLogout = async () => {
        try {
            await logoutFetch({ refreshToken: readCookie('refresh_token') })
            authAction.logout()
            acitonTodo.clearState()
        } catch (error) {
            showToatify('Logout fail huhu!!', 'success')
            console.log(error);
        }
    }

    // * Logout and clear cookie with token and refresh token
    const triggerLogout = () => {
        fetchLogout()
    }
    return (
        <>
            <header className='w-full h-[4rem] flex-shrink-0 bg-[#fff] shadow-xl flex justify-between items-center p-[0_5rem]'>
                <ul className="flex gap-[1rem]">
                    {
                        ((isHomePage || isGrid || isManage) ? privateList : listComponent).map(val => (
                            <NavLink to={val.path} key={val.id} className={({ isActive, isPending }) =>
                                isActive ? "relative text-[1.2rem] font-bold text-black before:content-[''] before:absolute before:bottom-0 before:left-0 before:bg-[#6a85b6] before:h-[0.2rem] before:w-full" : "text-[1.2rem] font-normal text-black "
                            }>
                                {val.label}
                            </NavLink>
                        ))
                    }

                </ul>
                {
                    (isHomePage || isGrid || isManage) &&
                    <div className="h-full flex justify-center items-center">
                        <span className="h-[3rem] w-[3rem] cursor-pointer rounded-full overflow-hidden" ref={anchor} onClick={() => triggerShowBtn()}><img src={logoImage} alt="Logo" className="w-full h-full object-cover object-center" /></span>
                    </div>
                }


            </header >

            <Popover
                show={show}
                anchor={anchor.current}
                position="bottom"
            >
                <ul className="w-[5rem] flex justify-center">
                    <li className="cursor-pointer hover:scale-110 hover:font-bold ease-linear-transition select-none" onClick={() => triggerLogout()}>Logout</li>
                </ul>
                <PopoverActionsBar>
                    <button onClick={triggerShowBtn} className="btn-shape-rounded">
                        Close
                    </button>
                </PopoverActionsBar>
            </Popover >
        </>
    )
})

export default memo(Header)