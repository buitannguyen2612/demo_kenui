import { Button } from '@progress/kendo-react-buttons';
import styles from './page.module.css'

type Props = {
    isDisable?: boolean
    title: string
    trigger?: () => void
    btnType: string
    size: string
    isButton?: boolean
    callBack?: Function
}

const CustomButton = ({ isDisable, title, isButton = false, callBack = () => { }, trigger = () => { }, size, btnType }: Props) => {
    const handeOnclick = () => {
        callBack()
    }
    return (
        <Button onClick={handeOnclick} type={isButton ? 'button' : 'submit'} style={{ width: `${size}` }} className={`${btnType === 'primary' ? styles.submitButton : styles.errorButton}`} disabled={isDisable}>{title}</Button>
    )
}

export default CustomButton