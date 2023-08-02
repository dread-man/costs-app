import { ISpinnerProps } from "../../types"
import styles from './Spinner.module.scss'

export const Spinner: React.FC<ISpinnerProps> = ({ top, left }: ISpinnerProps) => {
    return (
        <div
            style={{ top: `${top}px`, left: `${left}px` }}
            className={`spinner-border ${styles.mainSpinner}`}
            role="status"
        ></div>
    )
}
