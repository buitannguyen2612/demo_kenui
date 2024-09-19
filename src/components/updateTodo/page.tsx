import React, { useEffect, useState } from "react"
import { updateTodo } from "../../rest/api/todoApi"
import { IlistTodoResponse } from "../../rest/IApi/IAuthentication"
import { showToatify } from "../../utils/toastify"

type Props = {
    todo?: IlistTodoResponse
    callBack: () => void
    fetchAllTodo: Function
}

const FormCreate = ({ todo, callBack, fetchAllTodo }: Props) => {

    const [value, setValue] = useState<string>()


    // * Fetch update todo
    const fetchUpdateUser = async (id: string, name: string) => {
        try {
            await updateTodo(id, { name })
            showToatify('🦄 Update successfull!!', 'success')
            fetchAllTodo()
        } catch (error) {
            console.log(error);

        }
    }

    // handle update todo
    const updateString = (id: string, e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (id && value) {
                fetchUpdateUser(id, value)
                callBack()
            }
            else {
                showToatify('🦄 Dont leave the input empty!!', 'error')
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        setValue(todo?.name)
    }, [todo])


    return (
        <form onSubmit={(e) => todo && updateString(todo._id, e)} className='w-[40rem] h-[15rem] flex flex-col items-center p-[1rem] gap-[1rem] rounded-xl shadow-xl bg-skiny'>
            <p className='text-title text-txtMainColor font-bold'>Update todo</p>
            <div className='w-full h-[4rem] rounded-xl shadow-xl overflow-hidden'>
                {/* 
                    // Todo: Change default input by Input of react kendo ui
                */}
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className='w-full h-full text-normalTxt pl-[0.5rem] outline-none border-none' />
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