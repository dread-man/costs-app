import { useState, useRef, MutableRefObject } from 'react'
import { ICostsItemProps } from '../../../types'
import styles from './CostItem.module.scss'
import { getAuthDataFromLS, handleAlertMessage } from '../../../utils/auth'
import { deleteCostFx, updateCostFx } from '../../../api/costsClient'
import { removeCost, updatedCost } from '../../../context'
import { Spinner } from '../../Spinner/Spinner'
import { formatDate } from '../../../utils/arrayUtils'
import { validationInputs } from '../../../utils/validation'

export const CostsItem: React.FC<ICostsItemProps> = ({
    cost,
    index,
}: ICostsItemProps) => {
    const [edit, setEdit] = useState(false)
    const [deleteSpinner, setDeleteSpinner] = useState(false)
    const [editSpinner, setEditSpinner] = useState(false)
    const [newText, setNewText] = useState(cost.text)
    const [newPrice, setNewPrice] = useState<string | number>(cost.price)
    const [newDate, setNewDate] = useState(cost.date)
    const textRef = useRef() as MutableRefObject<HTMLInputElement>
    const priceRef = useRef() as MutableRefObject<HTMLInputElement>
    const dateRef = useRef() as MutableRefObject<HTMLInputElement>

    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
        setNewText(event.target.value)
    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) =>
        setNewPrice(event.target.value)
    const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) =>
        setNewDate(event.target.value)

    const allowEditCost = () => setEdit(true)

    const cancelEditCost = () => {
        setEditSpinner(false)
        setEdit(false)
    }

    const handleEditCost = async () => {
        setEditSpinner(true)

        if (
            newText === cost.text &&
            +newPrice === +cost.price &&
            newDate === cost.date
        ) {
            setEditSpinner(false)
            setEdit(false)
            return
        }

        if (!validationInputs(textRef, priceRef, dateRef)) {
            setEditSpinner(false)
            return
        }

        const authData = getAuthDataFromLS()

        const editedCost = await updateCostFx({
            url: '/cost',
            token: authData.access_token,
            cost: { text: newText, price: +newPrice, date: newDate },
            id: cost._id as string,
        })

        if (!editedCost) {
            setEditSpinner(false)
            setEdit(false)
            return
        }

        setEdit(false)
        setEditSpinner(false)
        updatedCost(editedCost)
        handleAlertMessage({
            alertText: 'Successfully updated!',
            alertStatus: 'success',
        })
    }

    const deleteCost = async () => {
        setDeleteSpinner(true)

        const authData = getAuthDataFromLS()

        await deleteCostFx({
            url: '/cost',
            token: authData.access_token,
            id: cost._id as string,
        })

        setDeleteSpinner(false)
        removeCost(cost._id as string)
        handleAlertMessage({
            alertText: 'Successfully removed!',
            alertStatus: 'success',
        })
    }
    return (
        <li
            className={`${styles.costItem} d-flex list-group-item justify-content-between align-items-center`}
            id={cost._id as string}
        >
            <div className={`${styles.costItemLeft} `}>
                <span>{index} Shop: </span>
                {edit ? (
                    <input
                        ref={textRef}
                        onChange={handleChangeText}
                        value={newText}
                        type="text"
                        className={`form-control ${styles.costItemShopInput}`}
                    />
                ) : (
                    <span>"{cost.text}" </span>
                )}

                {edit ? (
                    <input
                        ref={dateRef}
                        onChange={handleChangeDate}
                        value={new Date(newDate).toISOString().split('T')[0]}
                        type="date"
                        className={`form-control ${styles.costItemDateInput}`}
                    />
                ) : (
                    <span className={styles.costDate}>
                        Date: {formatDate(cost.date as string)}
                    </span>
                )}
            </div>
            <div
                className={`${styles.costItemRight} d-flex align-items-center`}
            >
                {edit ? (
                    <input
                        ref={priceRef}
                        onChange={handleChangePrice}
                        value={newPrice}
                        type="text"
                        className={`form-control ${styles.costItemPriceInput}`}
                    />
                ) : (
                    <span style={{ marginRight: '10px' }}>
                        Amount of money: {cost.price}
                    </span>
                )}
                {edit ? (
                    <div className={styles.btnBlockInner}>
                        <button
                            className={`btn btn-success ${styles.btnSave}`}
                            onClick={handleEditCost}
                        >
                            {editSpinner ? (
                                <Spinner top={5} left={38} />
                            ) : (
                                'Save'
                            )}
                        </button>
                        <button
                            className={`btn btn-danger ${styles.btnCancel}`}
                            onClick={cancelEditCost}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        style={{ marginRight: '10px' }}
                        className={`btn btn-primary ${styles.btnEdit}`}
                        onClick={allowEditCost}
                    >
                        Edit
                    </button>
                )}
                {!edit && (
                    <button
                        className={`btn btn-danger ${styles.btnDelete}`}
                        onClick={deleteCost}
                    >
                        {deleteSpinner ? (
                            <Spinner top={5} left={7} />
                        ) : (
                            <span>&times;</span>
                        )}
                    </button>
                )}
            </div>
        </li>
    )
}
