import React from "react";

type CartHeaderProps = {
    onClickCloseCart: () => void,
    totalQty: number
}

const CartHeader = ({ onClickCloseCart, totalQty }: CartHeaderProps) => {
    return <header className="cart-modal__header">
        <button className="cart-close" aria-label="Close" onClick={onClickCloseCart}>✕</button>
        <div id="cart-title" className="cart-title">
            Cart (<span role="status" aria-live="polite" aria-label="total items">{totalQty}</span>)
        </div>
    </header>
}

export default React.memo(CartHeader);
