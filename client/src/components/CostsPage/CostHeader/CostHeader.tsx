import { useEffect, useState } from "react"
import { Spinner } from "../../Spinner/Spinner"
import { ICostsHeaderProps } from "../../../types"
import { countTotalPrice } from "../../../utils/arrayUtils"
import { useStore } from "effector-react"
import { $totalPrice } from "../../../context"
import styles from './CostsHeader.module.scss'

export const CostHeader: React.FC<ICostsHeaderProps> = ({ costs }: ICostsHeaderProps) => {
	const [spinner, setSpinner] = useState<boolean>(false)
	const totalPrice = useStore($totalPrice)

	useEffect(() => {
		countTotalPrice(costs)
	}, [costs])

    return (
        <div className={styles.costsHeader}>
            <form className="d-flex mb-3">
				<div className={styles.fromItem}>
					<span className="mb-2">Where was it spent</span>
					<input type="text" className="form"/>
				</div>
				<div className={styles.fromItem}>
					<span className="mb-2">How much was spent</span>
					<input type="text" className="form"/>
				</div>
				<div className={styles.fromItem}>
					<span className="mb-2">When was it spent</span>
					<input type="text" className="form"/>
				</div>
				<button className={`btn btn-primary ${styles.addBtn}`}>
                    {spinner ? <Spinner top={5} left={20} /> : 'Add'}
                </button>
			</form>

			<div className={styles.totalDiv}>
				<span>Total: </span>
				<span>{isNaN(parseInt(String(totalPrice))) ? 0 : parseInt(String(totalPrice))}</span>
			</div>
        </div>
    )
}
