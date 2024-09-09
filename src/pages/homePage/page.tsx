import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import CardTodo from '../../components/cardTodo/page';
import PopupForm from '../../components/popup/page';
import FormCreate from '../../components/updateTodo/page';
import { todoActions } from '../../mobX/store';
import { useLocation } from 'react-router-dom';

export interface ITodo {
    id: string
    title: string
    complete: boolean
}

type Props = {
}

const HomePage = observer((props: Props) => {
    const store = todoActions

    const [valueInput, setValueInput] = useState<string>('')
    const [openPopup, setOpenPopup] = useState<boolean>(false)
    const [todos, setTodos] = useState<ITodo>()


    // catch the string of input and pass it to state
    const onChangeValue = (val: string) => {
        setValueInput(val)
    }

    // adidng new string to todo in store
    const triggerAdd = (e: React.FormEvent) => {
        e.preventDefault()
        const stringLength = valueInput.length
        if (stringLength > 0) {
            setValueInput('')
            store.addTodo(valueInput.trim())
        }
        else {
            toast.error('🦄 Do not leave this empty!!', {
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
            return
        }
    }

    // clean all of todo 
    const deleteAll = (e: React.FormEvent) => {
        e.stopPropagation()
        store.clearAllTodo()
    }

    // handle close popup
    const closePopup = () => {
        setOpenPopup(false)
    }

    // getting data from the card and open popup
    const storeData = (val: ITodo) => {
        setOpenPopup(true)
        setTodos(val)
    }


    // we can get this searching query for calling api or do something we want
    const location = useLocation()
    useEffect(() => {
        console.log(location);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <article className='w-full h-screen flex justify-center items-center bg-transparent'>
                <div className='w-[40rem] h-[30rem] flex flex-col gap-[2rem] p-[1rem] rounded-xl shadow-xl backdrop-blur-xl bg-white/30'>
                    {/* input todo */}
                    <form onSubmit={triggerAdd} className='w-full h-auto flex-shrink-0 flex flex-col gap-2'>
                        <div className='w-full h-[2rem] rounded-xl overflow-hidden'>
                            <input onChange={(e) => onChangeValue(e.target.value)} value={valueInput} type="text" className='w-full h-full border-none outline-none pl-[0.5rem] text-[1rem]' placeholder='Enter your todo' />
                        </div>
                        <div className='w-full flex gap-2 justify-start pl-[0.2rem]'>
                            <button type='submit' className='btn-shape-rounded hover-effect-topleft'>ADD</button>
                            <button type='button' onClick={(e) => deleteAll(e)} className='btn-shape-rounded hover-effect-topleft'>CLEAR ALL</button>
                        </div>
                    </form>
                    {/* input todo */}


                    {/* list todo */}
                    <div className='w-full flex-1 overflow-y-auto p-[0.2rem]'>
                        <div className='h-auto w-full flex flex-col gap-[1rem]'>
                            {
                                store.todos.map(val => (
                                    <CardTodo key={val.id} items={val} store={store} holdingData={storeData} />
                                ))
                            }
                        </div>
                    </div>
                    {/* list todo */}

                </div>
            </article>


            <PopupForm isOpen={openPopup} callBack={closePopup}>
                <FormCreate todo={todos} store={store} callBack={closePopup} />
            </PopupForm>
        </>
    )
})
export default HomePage