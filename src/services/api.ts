import { STATUS } from "@/constants/api";
import { LOADING_STYLE } from "@/constants/ui";
import { hideLoading, showLoading } from "@/pages/layout/ui/uiActions";
import store from "@/store/store";
import { notify } from "@/utils/helpers";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 10_000,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken

    if (token) config.headers.Authorization = `Bearer ${token}`;

    if (config.method === "put")
        store.dispatch(showLoading(LOADING_STYLE.NOTIFICATION))
    else
        store.dispatch(showLoading())

    return config;
}, (error) => {
    store.dispatch(showLoading())
    notify({ status: STATUS.FAIL, message: error.message, duration: 3 })
});

api.interceptors.response.use((config) => {
    store.dispatch(hideLoading())
    return config
}, (error) => {
    store.dispatch(hideLoading())
    notify({ status: STATUS.FAIL, message: error.message, duration: 3 })
})

export default api