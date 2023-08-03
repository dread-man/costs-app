export interface IAlert {
    alertText: string
    alertStatus: string
}

export interface IAlertProps {
    props: IAlert
}

export interface ISpinnerProps {
    top: number
    left: number
}

export interface ICostsHeaderProps {
    costs: ICost[]
}

export interface ICost {
    text: string
    price: number
    date: Date | string
    _id?: number | string
}

interface IBaseEffectArgs {
    url: string
    token: string
}

export interface ICreateCost extends IBaseEffectArgs {
    cost: ICost
}

export interface IGetCost extends IBaseEffectArgs {}

export interface IRefreshToken extends IBaseEffectArgs {
    username: string
}

export interface IDeleteCost extends IBaseEffectArgs {
	id: string | number
}

export interface IUpdateCost extends IBaseEffectArgs {
	cost: ICost
	id: string | number
}

export interface IHandleAxiosErrorPayload {
	type: string
	createCost?: Partial<ICreateCost>
	getCosts?: Partial<IBaseEffectArgs>
	deleteCost?: Partial<IDeleteCost>
	updateCost?: Partial<IUpdateCost>
}

export interface ICostsItemProps {
	cost: ICost
	index: number
}
