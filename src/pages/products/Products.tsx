import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect, useRef } from "react"
import ProductGrid from "./components/ProductGrid"
import { itemAdded } from "../cart/actions"
import { useProducts } from "@/hooks/useProducts"

const Products = () => {
    const dispatch = useDispatch()
    const { products, isLoading } = useProducts()

    const onAddToCart = useCallback((productId: number) => {
        dispatch(itemAdded(productId))
    }, [dispatch])

    if (!isLoading)
        return <section className="product-section">
            <ProductGrid products={products} onAddToCart={onAddToCart} />
        </section>

}

export default Products