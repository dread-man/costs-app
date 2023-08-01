import { IAlertProps } from '../../types'
import styles from './Alert.module.scss'

export const Alert: React.FC<IAlertProps> = ({ props }: IAlertProps) => {
    return (
        <div className={`alert ${styles.alertWrapper} alert-${props.alertStatus}`}>
            {props.alertText}
        </div>
    )
}
