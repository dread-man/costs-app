import { ISpinnerProps } from "../../types"

export const Spinner: React.FC<ISpinnerProps> = ({ top, left }: ISpinnerProps) => {
    return (
        <div
            style={{ top: `${top}px`, left: `${left}px` }}
            className="spinner-border main-spinner"
            role="status"
        ></div>
    )
}
