import { createDomain } from "effector";

const costs = createDomain()

export const setTotalPrice = costs.createEvent<number>()

export const $totalPrice = costs.createStore<number>(0)
	.on(setTotalPrice, (_, value) => value)
