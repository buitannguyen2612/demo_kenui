import { Skeleton } from "@progress/kendo-react-indicators";
import { AxiosResponse } from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import CardTodo from '../../components/cardTodo/page';
import FormCreate from '../../components/updateTodo/page';
import UsePopup from '../../hooks/usePopup';
import { todoAction } from '../../mobX/todoStore';
import { getAllTodo, postTodoElement } from '../../rest/api/todoApi';
import { IAddTodoPayload, IlistTodoResponse } from '../../rest/IApi/IAuthentication';
import { showToatify } from '../../utils/toastify';
import UseCondition from "../../hooks/useConditions";

type Props = {
}

const HomePage = observer((props: Props) => {
    const actionTodo = todoAction

    const [valueInput, setValueInput] = useState<string>('')
    const [openPopup, setOpenPopup] = useState<boolean>(false)
    const [todos, setTodos] = useState<IlistTodoResponse>()

    //* catch the string of input and pass it to state
    const onChangeValue = (val: string) => {
        setValueInput(val)
    }

    //* adidng new string to todo in store
    const triggerAdd = (e: React.FormEvent) => {
        e.preventDefault()
        const stringLength = valueInput.length
        if (stringLength > 0) {
            const payload: IAddTodoPayload = {
                name: valueInput.trim(),
                isComplete: false
            }
            fetchAddTodo(payload)
            setValueInput('')
        }
        else {
            showToatify('🦄 Do not leave this empty!!', 'error')
            return
        }
    }

    //* handle close popup
    const closePopup = () => {
        setOpenPopup(false)
    }

    //* getting data from the card and open popup
    const storeData = (val: IlistTodoResponse) => {
        setOpenPopup(true)
        setTodos(val)
    }

    // * Fetch get all todolist
    const fetchAllTodo = async () => {
        actionTodo.setLoading(true)
        try {
            const res: AxiosResponse<Array<IlistTodoResponse>> = await getAllTodo()
            const data = res.data
            actionTodo.addListTodo(data)
        } catch (error) {
            console.log(error);
        }
        finally {
            actionTodo.setLoading(false)
        }

    }

    // * refetch get data
    const reFetch = async () => {
        try {
            const res: AxiosResponse<Array<IlistTodoResponse>> = await getAllTodo()
            const data = res.data
            actionTodo.addListTodo(data)
        } catch (error) {
            console.log(error);
        }
    }

    // * Fetch add new todo
    const fetchAddTodo = async (payload: IAddTodoPayload) => {
        try {
            await postTodoElement(payload)
            fetchAllTodo()
        } catch (error) {
            console.log(error);
        }
    }

    // * calling api
    useEffect(() => {
        fetchAllTodo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <article className='w-full h-full flex justify-center items-center bg-transparent md:p-[0_1rem]'>
                <div className='w-[40rem] h-[30rem] flex flex-col gap-[2rem] p-[1rem] rounded-xl shadow-2xl bg-skiny'>

                    {/* Input text adding new todo */}
                    <form onSubmit={triggerAdd} className='w-full h-auto shrink-0 flex flex-col gap-2'>
                        <div className='w-full h-[4rem] flex rounded-xl overflow-hidden shadow-xl bg-white'>
                            <input onChange={(e) => onChangeValue(e.target.value)} value={valueInput} type="text" className='w-[85%] h-full shrink-0 pl-[0.5rem] text-normalTxt border-none outline-none sm:shrink' placeholder='Enter your todo' />
                            <div className='flex-1 p-[0.5rem] bg-transparent'>
                                <button type='submit' className='btn-shape-rounded hover-effect-topleft h-full w-full'>ADD</button>
                            </div>
                        </div>
                    </form>
                    {/* Input text adding new todo */}

                    <hr className='w-full h-[2px] bg-[#a6a6a6] border-none' />


                    {/* render list todo */}
                    <div className='w-full flex-1 overflow-y-auto p-[0.2rem] no-scrollbar'>
                        <div className='h-auto w-full flex flex-col gap-[1rem] '>
                            {
                                actionTodo.loading ?
                                    Array.from(new Array(4)).map((_, idx) => (
                                        <Skeleton key={idx} shape={"rectangle"} className='w-full h-[3rem] rounded-xl' style={{ margin: "0" }} />
                                    )) :
                                    <UseCondition isTrue={actionTodo.listTodo.length > 0} falseValue={'Dont have any todo'} styleString={'w-full h-full flex justify-center items-center'}>
                                        <>
                                            {actionTodo.listTodo.map(val => (
                                                <CardTodo key={val._id} items={val} holdingData={storeData} fetchAllTodo={reFetch} />
                                            ))}
                                        </>
                                    </UseCondition>

                            }
                        </div>
                    </div>
                    {/* render list todo */}


                </div>
            </article>


            {/* Render popup with boolean */}
            <UsePopup isOpen={openPopup} callBack={closePopup}>
                <FormCreate todo={todos} callBack={closePopup} fetchAllTodo={fetchAllTodo} />
            </UsePopup>
            {/* Render popup with boolean */}
        </>
    )
})
export default HomePage