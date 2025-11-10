import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect, useRef } from "react"
import ProductGrid from "./components/ProductGrid"
import { itemAdded } from "../cart/actions"
import { useProducts } from "@/hooks/useProducts"
import useUserInfo from "@/hooks/useUserInfo"

const Products = () => {
    const dispatch = useDispatch()
    const { products, isLoading } = useProducts()
    const { userId } = useUserInfo()

    if (!userId)
        throw new Error("User id is not existed")

    const onAddToCart = useCallback((productId: number) => {
        dispatch(itemAdded(productId, userId))
    }, [dispatch])

    if (!isLoading)
        return <section className="product-section">
            <ProductGrid products={products} onAddToCart={onAddToCart} />
        </section>

}

export default Products