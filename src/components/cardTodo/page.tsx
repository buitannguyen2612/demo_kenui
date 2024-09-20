import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { observer } from 'mobx-react-lite';
import { IlistTodoResponse } from '../../rest/IApi/IAuthentication';
import { completeTodo, deleteTodoElement, unComPleteTodo } from '../../rest/api/todoApi';
import { showToatify } from '../../utils/toastify';
import modalStore from '../../mobX/modal';


// define the props type when passing into this component
type Props = {
  items: IlistTodoResponse,
  holdingData: (val: IlistTodoResponse) => void
  fetchAllTodo: Function
}

const CardTodo = observer((props: Props) => {
  const modalAction = modalStore
  const { items, holdingData, fetchAllTodo } = props

  // *Fetch complete todo
  const fetchComplete = async (id: string) => {
    try {
      await completeTodo(id, { isComplete: true })
      fetchAllTodo()
    } catch (error) {
      console.log(error);
    }
  }

  // *Fetch unComplete todo
  const fetchUnComplete = async (id: string) => {
    try {
      await unComPleteTodo(id, { isComplete: false })
      fetchAllTodo()
    } catch (error) {
      console.log(error);
    }
  }

  //* calling to method of the mobx and update the init state
  const handleCheck = async (id: string, isComplete: boolean) => {
    isComplete ? fetchUnComplete(id) : fetchComplete(id)

  }

  //* calling to method of the mobx and remove field from the current state
  const removeTodo = async (id: string, e: React.FormEvent) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      await deleteTodoElement(id)
      showToatify('Delete successful', 'success')
      fetchAllTodo()
    } catch (error) {
      showToatify('Delete fail!!', 'error')
    }
  }

  //* get the data object and pass to the the parent
  const passData = (val: IlistTodoResponse, e: React.FormEvent) => {
    e.stopPropagation()
    e.preventDefault()
    holdingData(
      val
    )
  }

  return (
    <>
      <div onClick={() => handleCheck(items._id, items.isComplete)} className={`max-w-full h-[auto] min-h-[3rem] p-[0_1rem]  flex items-center rounded-xl shadow-md group hover:translate-y-[-1px] ease-linear-transition ${items.isComplete && 'line-through'} border-solid border-mainCorlor border-[2px]`}>
        <p className='w-[90%] text-normalTxt text-black flex-shrink-1 break-words'>{items.name}</p>
        <span className='flex-1 flex ml-auto opacity-0 group-hover:opacity-100 gap-2 ease-linear-transition'>
          <DriveFileRenameOutlineIcon className='text-txtMainColor cursor-pointer'
            onClick={(e) => {
              passData(items, e)
            }}
          />
          <DeleteIcon className='text-error cursor-pointer'
            onClick={(e) => removeTodo(items._id, e)}
          />
        </span>
      </div >
    </>
  )
})

export default CardTodo