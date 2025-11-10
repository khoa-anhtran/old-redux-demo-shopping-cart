import { FetchStatus, PayloadAction } from "@/types"
import { PRODUCTS_FETCH_FAILED, PRODUCTS_FETCH_REQUESTED, PRODUCTS_FETCH_SUCCEEDED } from "./actionTypes"
import { STATUS } from "@/constants/api"

export type Product = {
    id: number,
    title: string,
    price: number,
    thumbnail: string
}

export type ProductState = {
    products: Record<number, Product>,
    status: string,
    error: string | null
}

const initialState: ProductState = {
    products: [],
    status: STATUS.IDLE,
    error: null
}

type ProductPayloadAction = PayloadAction<{ products: Record<number, Product> } | { message: string }>

const productReducer = (state = initialState, action: ProductPayloadAction): ProductState => {
    switch (action.type) {
        case PRODUCTS_FETCH_REQUESTED: {
            return {
                ...state,
                status: STATUS.LOADING
            };
        }

        case PRODUCTS_FETCH_SUCCEEDED: {
            const { products } = action.payload as { products: Record<number, Product> };

            return {
                ...state,
                products: { ...state.products, ...products },
                status: STATUS.SUCCESS
            };
        }

        case PRODUCTS_FETCH_FAILED: {
            const { message } = action.payload as { message: string };

            return {
                ...state,
                error: message,
                status: STATUS.FAIL
            };
        }

        default:
            return state;
    }
}

export default productReducer