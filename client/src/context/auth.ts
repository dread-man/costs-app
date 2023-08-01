import { createStore, createDomain, createEvent } from "effector";

const auth = createDomain()

const setAuth = auth.createEvent<boolean>()

export const $auth = auth.createStore<boolean>(false)
	.on(setAuth, (_, value) => value)



