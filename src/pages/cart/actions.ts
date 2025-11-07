import { CART_FETCH_FAILED, CART_FETCH_REQUESTED, CART_FETCH_SUCCEEDED, CART_TOGGLE, CHECKED_OUT, ITEM_ADDED, ITEMS_REMOVED, ITEM_SELECTED_TOGGLED, QUANTITY_DECREASED, QUANTITY_INCREASED, SELECT_ALL_TOGGLED, CART_SYNC_SUCCEEDED, CART_SYNC_FAILED } from "./actionTypes";
import { CartItem } from "./reducers";

export const fetchCartRequested = (userId: number) => ({
    type: CART_FETCH_REQUESTED,
    payload: { userId }
});

export const fetchCartSucceeded = (items: CartItem[]) => ({
    type: CART_FETCH_SUCCEEDED,
    payload: {
        items
    }
});

export const fetchCartFailed = (message: string) => ({
    type: CART_FETCH_FAILED,
    payload: {
        message
    }
});

export const cartSyncSucceeded = () => ({
    type: CART_SYNC_SUCCEEDED
});

export const cartSyncFailed = (message: string) => ({
    type: CART_SYNC_FAILED,
    payload: {
        message
    }
});

export const itemAdded = (itemId: number, userId: number) => ({
    type: ITEM_ADDED,
    payload: {
        itemId,
        userId
    }
});

export const itemsRemoved = (itemIds: number[], userId: number) => ({
    type: ITEMS_REMOVED,
    payload: {
        itemIds,
        userId
    }
});

export const cartToggled = () => ({
    type: CART_TOGGLE,
});

export const quantityIncreased = (itemId: number, userId: number) => ({
    type: QUANTITY_INCREASED,
    payload: {
        itemId,
        userId
    }
});

export const quantityDecreased = (itemId: number, userId: number) => ({
    type: QUANTITY_DECREASED,
    payload: {
        itemId,
        userId
    }
});

export const itemSelectedToggled = (itemId: number) => (
    {
        type: ITEM_SELECTED_TOGGLED,
        payload: {
            itemId
        }
    }
)

export const selectAllToggled = () => (
    {
        type: SELECT_ALL_TOGGLED,
    }
)

export const checkedOut = (itemIds: number[], userId: number) => (
    {
        type: CHECKED_OUT,
        payload: {
            itemIds,
            userId
        }
    }
)