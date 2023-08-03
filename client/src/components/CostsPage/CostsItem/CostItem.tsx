import { ICostsItemProps } from '../../../types'
import styles from './CostsItem.module.scss'

export const CostsItem: React.FC<ICostsItemProps> = ({
    cost,
    index,
}: ICostsItemProps) => {
    return (
        <li
            className={`${styles.costItem} d-flex list-group-item justify-content-between align-items-center`}
            id={cost._id as string}
        >
            <div className={`${styles.costItemLeft} `}>
                <span>{index} Shop</span>
                <span>"{cost.text}" Shop</span>
                <span className={styles.costDate}>
                    Date "{cost.date as string}" Shop
                </span>
            </div>
            <div
                className={`${styles.costItemRight} d-flex align-items-center`}
            >
                <span className={styles.costDate}>
                    Amount of money {cost.price}
                </span>
                <button className={`btn btn-primary ${styles.btnEdit}`}>
                    Edit
                </button>
                <button className={`btn btn-danger ${styles.btnDelete}`}>
                    <span>&times;</span>
                </button>
            </div>
        </li>
    )
}
