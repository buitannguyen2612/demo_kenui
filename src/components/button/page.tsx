import { Button } from '@progress/kendo-react-buttons';
import styles from './page.module.css'

type Props = {
    isDisable: boolean
    title: string
    trigger?: () => void
    btnType: string
    size: string
}

const CustomButton = ({ isDisable, title, trigger = () => { }, size, btnType }: Props) => {
    return (
        <Button style={{ width: `${size}` }} className={`${btnType === 'primary' ? styles.submitButton : styles.errorButton}`} disabled={isDisable}>{title}</Button>
    )
}

export default CustomButton