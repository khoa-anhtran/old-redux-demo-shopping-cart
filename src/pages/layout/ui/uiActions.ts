import { HIDE_LOADING, SHOW_LOADING } from "./uiActionTypes";

export const showLoading = (loadingStyle?: string) => ({ type: SHOW_LOADING, payload: { loadingStyle } })

export const hideLoading = (loadingStyle?: string) => ({ type: HIDE_LOADING, payload: { loadingStyle } })