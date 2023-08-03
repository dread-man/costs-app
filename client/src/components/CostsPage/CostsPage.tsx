import React, { useEffect, useMemo, useRef, useState } from 'react'
import { CostHeader } from './CostHeader/CostHeader'

import styles from './CostsPage.module.scss'
import { Spinner } from '../Spinner/Spinner'
import { getAuthDataFromLS } from '../../utils/auth'
import { getCostFx } from '../../api/costsClient'
import { $costs, setCosts } from '../../context'
import { useStore } from 'effector-react'
import { CostsList } from './CostsList/CostsList'

export const CostsPage: React.FC = () => {
    const [spinner, setSpinner] = useState(false)
    const store = useStore($costs)
    const shouldLoadCosts = useRef(true)

    useEffect(() => {
        if (shouldLoadCosts.current) {
			shouldLoadCosts.current = false
            handleGetCosts()
            console.log(store)
        }
    }, [])

    const handleGetCosts = async () => {
        setSpinner(true)
        const authData = getAuthDataFromLS()

        const costs = await getCostFx({
            url: '/cost',
            token: authData.access_token,
        })

        setSpinner(false)
        setCosts(costs)
    }

    return (
        <div className="container">
            <h2 className={styles.mainTitle}>My Costs</h2>
			{useMemo(() => <CostHeader costs={store} />, [store])}
            <div style={{ position: 'relative' }}>
                {spinner && <Spinner top={0} left={0} />}
				{useMemo(() => <CostsList costs={store}/>, [store])}
				{(!spinner && !store.length) && <h2>List of expenses is empty</h2> }
            </div>
        </div>
    )
}
