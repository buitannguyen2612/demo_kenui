import React, { useEffect, useState } from "react"
import { todoActions } from "../../mobX/store"
import { ITodo } from "../../pages/homePage/page"
import { showToatify } from "../../utils/toastify"

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
                showToatify('🦄 Update successfull!!', 'success')
            }
            else {
                showToatify('🦄 Dont leave the input empty!!', 'error')
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        setValue(todo?.title)
    }, [todo])


    return (
        <form onSubmit={(e) => todo && updateString(todo.id, e)} className='w-[40rem] h-[15rem] flex flex-col items-center p-[1rem] gap-[1rem] rounded-xl shadow-xl bg-skiny'>
            <p className='text-title text-black font-bold'>Update todo</p>
            <div className='w-full h-[4rem] rounded-xl shadow-xl overflow-hidden'>
                <input type="text" value={value ? value : ''} onChange={(e) => setValue(e.target.value)} className='w-full h-full text-normalTxt pl-[0.5rem] outline-none border-none' />
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