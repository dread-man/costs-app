import { useEffect, useState, MutableRefObject, useRef } from 'react'
import { Spinner } from '../../Spinner/Spinner'
import { ICostsHeaderProps } from '../../../types'
import { countTotalPrice } from '../../../utils/arrayUtils'
import { useStore } from 'effector-react'
import { $totalPrice, createCost } from '../../../context'
import styles from './CostsHeader.module.scss'
import { validationInputs } from '../../../utils/validation'
import { getAuthDataFromLS, handleAlertMessage } from '../../../utils/auth'
import { createCostFx } from '../../../api/costsClient'

export const CostHeader: React.FC<ICostsHeaderProps> = ({
    costs,
}: ICostsHeaderProps) => {
    const [spinner, setSpinner] = useState<boolean>(false)
    const textRef = useRef() as MutableRefObject<HTMLInputElement>
    const priceRef = useRef() as MutableRefObject<HTMLInputElement>
    const dateRef = useRef() as MutableRefObject<HTMLInputElement>

    const totalPrice = useStore($totalPrice)

    useEffect(() => {
        countTotalPrice(costs)
    }, [costs])

    const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSpinner(true)

        const textInputValue = textRef.current.value
        const priceInputValue = priceRef.current.value
        const dateInputValue = dateRef.current.value

        if (!validationInputs(textRef, priceRef, dateRef)) {
            setSpinner(false)
            return
        }

        const authData = getAuthDataFromLS()

        const cost = await createCostFx({
            url: '/cost',
            cost: {
                text: textInputValue,
                price: parseInt(priceInputValue),
                date: dateInputValue,
            },
            token: authData.access_token,
        })

        if (!cost) {
            setSpinner(false)
            return
        }

        setSpinner(false)
        createCost(cost)
        handleAlertMessage({
            alertText: 'Created success',
            alertStatus: 'success',
        })
    }

    return (
        <div className={styles.costsHeader}>
            <form className="d-flex mb-3" onSubmit={formSubmit}>
                <div className={styles.fromItem}>
                    <span className="mb-2">Where was it spent</span>
                    <input ref={textRef} type="text" className="form" />
                </div>
                <div className={styles.fromItem}>
                    <span className="mb-2">How much was spent</span>
                    <input ref={priceRef} type="text" className="form" />
                </div>
                <div className={styles.fromItem}>
                    <span className="mb-2">When was it spent</span>
                    <input ref={dateRef} type="date" className="form" />
                </div>
                <button className={`btn btn-primary ${styles.addBtn}`}>
                    {spinner ? <Spinner top={5} left={20} /> : 'Add'}
                </button>
            </form>

            <div className={styles.totalDiv}>
                <span>Total: </span>
                <span>
                    {isNaN(parseInt(String(totalPrice)))
                        ? 0
                        : parseInt(String(totalPrice))}
                </span>
            </div>
        </div>
    )
}
