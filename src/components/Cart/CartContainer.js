import React from "react";
import Cart  from "./Cart";
import {connect} from "react-redux";
import {onAddItemQuantity, onOrderItems, onRemoveItemQuantity, setTotalPrice} from "../../redux/cartReducer";

class CartContainer extends React.Component {
    render() {

        const { cartItems, currentCurrencyIndex, onAddItemQuantity, onRemoveItemQuantity,
                totalPrice, onOrderItems} = this.props;

        return (
            <Cart
                cartItems={cartItems}
                currentCurrency={currentCurrencyIndex}
                onAdd={onAddItemQuantity}
                onRemove={onRemoveItemQuantity}
                totalPrice={totalPrice}
                onOrderItems={onOrderItems}
            />
        )
    }
}


let mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems,
        currentCurrencyIndex: state.cart.currentCurrency,
        totalPrice: state.cart.totalPrice,
    }
};

export default connect(mapStateToProps, {onAddItemQuantity, onRemoveItemQuantity, setTotalPrice, onOrderItems})(CartContainer);
