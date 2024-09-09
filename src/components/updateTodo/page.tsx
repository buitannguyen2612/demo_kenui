import React, { useEffect, useState } from "react"
import { todoActions } from "../../mobX/store"
import { ITodo } from "../../pages/homePage/page"
import { Bounce, toast } from "react-toastify"

type Props = {
    todo?: ITodo
    store: typeof todoActions
    callBack: () => void
}

const FormCreate = ({ todo, store, callBack }: Props) => {

    const [value, setValue] = useState<string>()

    // handle update todo
    const updateString = (id: string, e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (id && value) {
                store.updateTodo(id, value)
                callBack()
                toast.success('🦄 Update successfull!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
            else {
                toast.error('🦄 Dont leave the input empty!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        setValue(todo?.title)
    }, [todo])


    return (
        <form onSubmit={(e) => todo && updateString(todo.id, e)} className='w-[40rem] h-[15rem] flex flex-col items-center p-[1rem] gap-[1rem] rounded-xl shadow-xl box-primary-gradientcolor'>
            <p className='text-[1.8rem] font-bold text-white'>Update todo</p>
            <div className='w-full h-[3rem] rounded-xl  overflow-hidden'>
                <input type="text" value={value ? value : ''} onChange={(e) => setValue(e.target.value)} className='w-full h-full text-[1rem] pl-[0.5rem] outline-none border-none' />
            </div>
            <div className='w-full flex justify-end gap-5 mt-auto'>
                <button type="submit" className='btn-shape-rounded hover-effect-topleft'
                >UPDATE</button>
                <button type="button" onClick={() => callBack()} className='btn-shape-rounded hover-effect-topleft'>CANCEL</button>
            </div>
        </form>
    )
}

export default FormCreate