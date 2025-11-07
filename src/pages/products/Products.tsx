import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect, useRef } from "react"
import ProductGrid from "./components/ProductGrid"
import { itemAdded } from "../cart/actions"
import { selectProducts, selectProductsError, selectProductsStatus } from "./selectors"
import { fetchProductsRequested } from "./actions"
import SimpleErrorPage from "../layout/SimpleErrorPage"
import LoadingSpinner from "@/components/LoadingSpinner"
import { notify } from "@/utils/helpers"
import useUserInfo from "@/hooks/useUserInfo"

const Products = () => {
    const dispatch = useDispatch()
    const status = useSelector(selectProductsStatus)
    const error = useSelector(selectProductsError)
    const products = useSelector(selectProducts)

    const { userId } = useUserInfo()

    const isFetching = useRef(false)

    let content

    if (!userId) {
        notify({ status: "failed", message: "UserId is not existed" })
        return
    }

    useEffect(() => {
        if (status === 'idle' && !isFetching.current) {
            dispatch(fetchProductsRequested())
            isFetching.current = true
        }
        notify({ status, error, message: "Fetch products successfully" })
    }, [status, error, dispatch])

    const onAddToCart = useCallback((productId: number) => {
        dispatch(itemAdded(productId, userId))
        notify({ status: "succeeded", error, message: 'Your product have added' })
    }, [dispatch, error])

    const onRetry = useCallback(() => {
        dispatch(fetchProductsRequested())
    }, [dispatch])


    if (status === 'succeeded')
        content = <ProductGrid products={products} onAddToCart={onAddToCart} />

    if (status === 'failed')
        content = <SimpleErrorPage message={error ?? ""} onRetry={onRetry}></SimpleErrorPage >

    if (status === "loading")
        content = <LoadingSpinner overlay label="Loading page" size={"lg"} />

    return <section className="product-section">{content}</section>
}

export default Products