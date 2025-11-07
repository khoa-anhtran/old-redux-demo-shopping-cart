import { call, debounce, put, select, takeLatest } from 'redux-saga/effects'

import { CART_FETCH_REQUESTED, CHECKED_OUT, ITEM_ADDED, ITEMS_REMOVED, QUANTITY_DECREASED, QUANTITY_INCREASED } from './actionTypes'
import { SagaIterator } from 'redux-saga';
import { CartItem } from './reducers';
import { cartSyncFailed, cartSyncSucceeded, fetchCartFailed, fetchCartSucceeded } from './actions';
import { selectCart } from './selectors';
// import { selectAuth } from '../auth/selectors';
// import { refreshTokenSaga } from '../auth/middlewares';
import { fetchCart, putCartItems } from '@/services/cartService';
import { Action } from 'redux';
import { PayloadAction } from '@/types';


function* fetchCartSaga(action: PayloadAction<{ userId: number }>): SagaIterator {
    try {
        const { userId } = action.payload
        const items: CartItem[] = yield call(fetchCart, userId)
        yield put(fetchCartSucceeded(items));
    } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        yield put(fetchCartFailed(`Fetch cart failed: ${message}`));
    }
}

function* putCartSaga(action: PayloadAction<{ userId: number }>): SagaIterator {
    try {
        const { userId } = action.payload
        const items: CartItem[] = yield select(selectCart);
        yield call(putCartItems, { userId, items })
        yield put(cartSyncSucceeded());
    } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        yield put(cartSyncFailed(`Sync cart failed: ${message}`));
    }
}

function* cartSaga() {
    yield takeLatest(CART_FETCH_REQUESTED, fetchCartSaga)
    yield debounce(600, [QUANTITY_INCREASED, QUANTITY_DECREASED, ITEM_ADDED, ITEMS_REMOVED, CHECKED_OUT], putCartSaga)
}

export default cartSaga
