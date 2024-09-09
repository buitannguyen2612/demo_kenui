import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { observer } from 'mobx-react-lite';
import { todoActions } from '../../mobX/store';
import { ITodo } from '../../pages/homePage/page';


// define the props type when passing into this component
type Props = {
  items: ITodo,
  store: typeof todoActions
  holdingData: (val: ITodo) => void
}

const CardTodo = observer((props: Props) => {
  const { items, store, holdingData } = props

  // calling to method of the mobx and update the init state
  const toggleComplete = (id: string) => {
    store.triggerComplete(id)
  }

  // calling to method of the mobx and remove field from the current state
  const removeTodo = (id: string, e: React.FormEvent) => {
    e.stopPropagation()
    store.removeTodo(id)
  }

  // get the data object and pass to the the parent
  const passData = (val: ITodo, e: React.FormEvent) => {
    e.stopPropagation()
    holdingData(
      val
    )
  }

  return (
    <>
      <div onClick={() => toggleComplete(items.id)} className={`max-w-full h-[auto] min-h-[3rem] p-[0_1rem]  flex items-center rounded-xl box-primary-gradientcolor shadow-xl group hover:translate-y-[-1px] ease-linear-transition ${items.complete && 'line-through'}`}>
        <p className='w-[90%] text-[1rem] text-white flex-shrink-0 '>{items.title}</p>
        <span className='flex-1 ml-auto hidden group-hover:flex gap-2 ease-linear-transition'>
          <EditIcon sx={{
            color: "#E2DAD6",
            cursor: "pointer"
          }}
            onClick={(e) => {
              passData(items, e)
            }}
          />
          <DeleteIcon sx={{
            color: "#C7253E",
            cursor: "pointer"
          }}
            onClick={(e) => removeTodo(items.id, e)}
          />
        </span>
      </div >
    </>
  )
})

export default CardTodo