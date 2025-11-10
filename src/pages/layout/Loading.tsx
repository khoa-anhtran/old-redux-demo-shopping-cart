import LoadingSpinner from "@/components/LoadingSpinner"
import { useSelector } from "react-redux"
import { selectIsShowLoading, selectLoadingStyle } from "./ui/uiSelectors"
import { notification } from "antd"
import { LOADING_STYLE } from "@/constants/ui"
import { useRef } from "react"

const Loading = () => {
    const prevState = useRef(false)
    const showLoading = useSelector(selectIsShowLoading)
    const loadingStyle = useSelector(selectLoadingStyle)

    if (!showLoading) {
        prevState.current = showLoading
        return
    }

    if (showLoading !== prevState.current) {
        if (loadingStyle === LOADING_STYLE.NOTIFICATION)
            notification.open({ message: <LoadingSpinner size={'sm'} label='Loading'></LoadingSpinner>, duration: 2 })

        if (loadingStyle === LOADING_STYLE.OVERLAY)
            return <LoadingSpinner overlay size={'lg'} label='Loading'></LoadingSpinner>

        prevState.current = showLoading
    }
}

export default Loading