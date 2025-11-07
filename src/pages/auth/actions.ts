import { TOKEN_ADDED, TOKEN_REMOVED } from "./actionTypes"

export const tokenAdded = (token: string) => ({ type: TOKEN_ADDED, payload: { token } })

export const tokenRemoved = () => ({ type: TOKEN_REMOVED })