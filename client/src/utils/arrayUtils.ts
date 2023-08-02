import { setTotalPrice } from '../context'
import { ICosts } from '../types'

export const countTotalPrice = (costs: ICosts[]) => {
    if (costs === undefined) return
    setTotalPrice(
        costs.reduce((defaultCount, item) => defaultCount + item.price, 0)
    )
}
