import {
    Popover,
    PopoverActionsBar,
} from "@progress/kendo-react-tooltip";
import Hamburger from "hamburger-react";
import { observer } from "mobx-react-lite";
import { memo, useCallback, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import useViewPortWith from "../../hooks/useViewPortWith";
import logoImage from '../../images/logoImage.jpg';
import { loginAction } from "../../mobX/authen";
import { logoutFetch } from "../../rest/api/authentication";
import { readCookie } from "../../utils/cookie";
import { showToatify } from "../../utils/toastify";
import CustomButton from "../button/page";

type Props = {}

const Header = observer((props: Props) => {
    const authAction = loginAction
    const currentWidth = useViewPortWith()
    const anchor = useRef<HTMLSpanElement>(null);
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false);

    const triggerShowBtn = useCallback(() => {
        setShow(!show);
    }, [setShow, show]);


    const privateList = [
        {
            id: 1,
            path: '/todo/homepage',
            label: 'Home'
        },
    ]

    const adminList = [
        {
            id: 1,
            path: '/todo/user-manage',
            label: 'User Management'
        }
    ]

    // * fetch logout
    const fetchLogout = async () => {
        try {
            await logoutFetch({ refreshToken: readCookie('refresh_token') })
            authAction.logout()
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
        <>{
            currentWidth < 600 ? <Hamburger size={18} toggled={open} toggle={setOpen} /> :
                <header className='w-full h-[4rem] flex-shrink-0 bg-[#fff] shadow-xl flex justify-between items-center p-[0_5rem]'>
                    <ul className="flex gap-[1rem]">
                        {
                            ((authAction.infoUser.role === 'admin') ? adminList : privateList).map(val => (
                                <NavLink to={val.path} key={val.id} className={({ isActive, isPending }) =>
                                    isActive ? "relative text-[1.2rem] font-bold text-black before:content-[''] before:absolute before:bottom-0 before:left-0 before:bg-[#97baf5] before:h-[0.2rem] before:w-full" : "text-[1.2rem] font-normal text-black "
                                }>
                                    {val.label}
                                </NavLink>
                            ))
                        }
                    </ul>
                    {
                        authAction.isLogin &&
                        <div className="h-full flex justify-center items-center">
                            <span className="h-[3rem] w-[3rem] cursor-pointer rounded-full overflow-hidden" ref={anchor} onClick={() => triggerShowBtn()}><img src={logoImage} alt="Logo" className="w-full h-full object-cover object-center" /></span>
                        </div>
                    }


                </header >
        }

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
            {
                open && <div className="w-[13rem] h-auto fixed rounded-xl overflow-hidden shadow-xl z-10 top-[3rem] left-[1rem] bg-white">
                    <span className="w-full h-full flex flex-col gap-[1rem]">
                        <ul className="w-full flex flex-col ">
                            {
                                ((authAction.infoUser.role === 'admin') ? adminList : privateList).map(val => (
                                    <NavLink to={val.path} key={val.id}
                                        className={({ isActive, isPending }) =>
                                            isActive ? "w-full h-[2rem] bg-skiny  text-black text-[1rem] font-bold flex justify-center items-center cursor-pointer" : "w-full h-[2rem] hover:bg-skiny  text-black text-[1rem] font-normal flex justify-center items-center cursor-pointer ease-linear-transition"
                                        }
                                    >
                                        {val.label}
                                    </NavLink>
                                ))
                            }
                            <li onClick={() => fetchLogout()} className="w-full h-[2rem]  hover:bg-skiny text-black text-[1rem] font-bold flex justify-center items-center cursor-pointer ease-linear-transition">Logout</li>
                        </ul>
                    </span>

                </div>
            }

        </>
    )
})

// className={({ isActive, isPending }) =>
//     isActive ? "relative text-[1.2rem] font-bold text-black before:content-[''] before:absolute before:bottom-0 before:left-0 before:bg-[#97baf5] before:h-[0.2rem] before:w-full" : "text-[1.2rem] font-normal text-black "
// }

export default memo(Header)