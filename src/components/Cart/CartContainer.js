import React from "react";
import Cart  from "./Cart";
import {connect} from "react-redux";
import {onAddItemQuantity, onOrderItems, onRemoveItemQuantity, setTotalPrice} from "../../redux/cartReducer";

class CartContainer extends React.Component {
    render() {

        const { cartItems, currentCurrencyIndex, onAddItemQuantity, onRemoveItemQuantity,
                totalPrice, selectedOptions, onOrderItems} = this.props;

        return (
            <Cart
                cartItems={cartItems}
                currentCurrency={currentCurrencyIndex}
                onAdd={onAddItemQuantity}
                onRemove={onRemoveItemQuantity}
                totalPrice={totalPrice}
                selectedOptions={selectedOptions}
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
        selectedOptions: state.cart.selectedOptions
    }
};

export default connect(mapStateToProps, {onAddItemQuantity, onRemoveItemQuantity, setTotalPrice, onOrderItems})(CartContainer);
