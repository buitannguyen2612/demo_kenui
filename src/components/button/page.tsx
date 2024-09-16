import { Button } from '@progress/kendo-react-buttons';
import styles from './page.module.css'

type Props = {
    isDisable: boolean
    title: string
    trigger?: () => void
}

const CustomButton = ({ isDisable, title, trigger = () => { } }: Props) => {
    return (
        <Button className={`w-[50%]  ${styles.submitButton}`} disabled={isDisable}>{title}</Button>
    )
}

export default CustomButton