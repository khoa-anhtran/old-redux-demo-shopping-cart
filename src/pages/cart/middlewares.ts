import { call, debounce, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects'

import { CART_FETCH_FAILED, CART_FETCH_REQUESTED, CART_FETCH_SUCCEEDED, CART_SYNC_FAILED, CART_SYNC_SUCCEEDED, CHECKED_OUT, ITEM_ADDED, ITEMS_REMOVED, QUANTITY_DECREASED, QUANTITY_INCREASED } from './actionTypes'
import { SagaIterator } from 'redux-saga';
import { CartItem } from './reducers';
import { cartSyncFailed, cartSyncSucceeded, fetchCartFailed, fetchCartSucceeded } from './actions';
import { selectCart } from './selectors';
import { selectAuth } from '../auth/selectors';
import { refreshTokenSaga } from '../auth/middlewares';
import { fetchCart, putCartItems } from '@/services/cartService';
import { notify } from '@/utils/helpers';
import { STATUS } from '@/constants/api';
import { PayloadAction } from '@/types';


function* fetchCartSaga(): SagaIterator {
    try {
        const { userId } = yield select(selectAuth);
        const items: CartItem[] = yield call(
            callApiWithRefresh,
            () => fetchCart(userId)
        );
        yield put(fetchCartSucceeded(items));
    } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        yield put(fetchCartFailed(`Fetch cart failed: ${message}`));
    }
}

function* putCartSaga(): SagaIterator {
    try {
        const items: CartItem[] = yield select(selectCart);
        const { userId } = yield select(selectAuth);

        yield call(
            callApiWithRefresh,
            (token) => putCartItems({ userId, items, accessToken: token })
        );

        yield put(cartSyncSucceeded());
    } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        yield put(cartSyncFailed(`Sync cart failed: ${message}`));
    }
}

function* callApiWithRefresh<T>(
    thunk: (token: string) => Promise<T>
): SagaIterator<T> {
    let { accessToken } = yield select(selectAuth);

    try {
        return (yield call(thunk, accessToken)) as T;
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);

        if (!msg.match(/Invalid or expired token|401/)) throw e;
    }

    const ok: boolean = yield call(refreshTokenSaga);
    if (!ok) throw new Error("Token refresh failed");

    ({ accessToken } = yield select(selectAuth));
    return (yield call(thunk, accessToken)) as T;
}

function* cartSaga() {
    yield takeLatest(CART_FETCH_REQUESTED, fetchCartSaga)
    yield debounce(600, [QUANTITY_INCREASED, QUANTITY_DECREASED, ITEM_ADDED, ITEMS_REMOVED, CHECKED_OUT], putCartSaga)

    yield takeEvery(CART_FETCH_SUCCEEDED, () => {
        notify({ status: STATUS.SUCCESS, message: "Fetch cart successfully" })
    })
    yield takeEvery(CART_SYNC_SUCCEEDED, () => {
        notify({ status: STATUS.SUCCESS, message: "Sync cart successfully" })
    })
    yield takeEvery(ITEM_ADDED, () => { notify({ status: STATUS.SUCCESS, message: 'Add item successfully' }) })
    yield takeEvery(ITEMS_REMOVED, () => { notify({ status: STATUS.SUCCESS, message: 'Remove successfully' }) })
    yield takeEvery(CHECKED_OUT, () => { notify({ status: STATUS.SUCCESS, message: 'Check out successfully' }) })

    yield takeEvery([CART_FETCH_FAILED, CART_SYNC_FAILED],
        (action: PayloadAction<{ message: string }>) => notify({ message: action.payload?.message, status: STATUS.FAIL, duration: 3 })
    )

}

export default cartSaga
