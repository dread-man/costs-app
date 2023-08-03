import { ICost } from '../../../types'
import { CostsItem } from '../CostsItem/CostItem'

export const CostsList: React.FC<{ costs: ICost[] }> = ({
    costs,
}: {
    costs: ICost[]
}) => {
    return (
        <ul className="list-group">
            {costs.map((cost, index) => (
                <CostsItem key={index} cost={cost} index={index + 1} />
            ))}
        </ul>
    )
}
