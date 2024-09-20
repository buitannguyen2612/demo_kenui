import React, { useEffect, useState } from "react"
import { updateTodo } from "../../rest/api/todoApi"
import { IlistTodoResponse } from "../../rest/IApi/IAuthentication"
import { showToatify } from "../../utils/toastify"
import { TextArea } from "@progress/kendo-react-inputs"

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
            <TextArea placeholder="Type the text here..." rows={3} className="w-full text-normalTxt resize-y" value={value} onChange={(e) => setValue(e.target.value)} />
            {/* <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className='w-full h-full text-normalTxt pl-[0.5rem] outline-none border-none' /> */}
            <div className='w-full flex justify-end gap-5 mt-auto'>
                <button type="submit" className='btn-shape-rounded hover-effect-topleft'
                >UPDATE</button>
                <button type="button" onClick={() => callBack()} className='btn-error-rounded hover-effect-topleft'>CANCEL</button>
            </div>
        </form>
    )
}

export default FormCreate