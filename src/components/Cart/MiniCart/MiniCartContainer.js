import React from "react";
import { connect } from "react-redux";
import MiniCart from "./MiniCart";
import {onAddItemQuantity, onRemoveItemQuantity, setMiniCartActive, setTotalPrice} from "../../../redux/cartReducer";
import {withRouter} from "../../../ReactRouterWrapper/ReactRouterWrapper";


class MiniCartContainer extends React.Component {

    render() {

        const { cartItems, currentCurrencyIndex, isMiniCartActive, onAddItemQuantity, onRemoveItemQuantity,
                setTotalPrice, totalPrice, navigate, setMiniCartActive, selectedOptions } = this.props;

        return(
            <MiniCart
                cartItems={cartItems}
                currentCurrency={currentCurrencyIndex}
                active={isMiniCartActive}
                onAdd={onAddItemQuantity}
                onRemove={onRemoveItemQuantity}
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
                navigate={navigate}
                setMiniCartActive={setMiniCartActive}
                selectedOptions={selectedOptions}
            />
        )
    }
}


let mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems,
        currentCurrencyIndex: state.cart.currentCurrency,
        totalPrice: state.cart.totalPrice,
        isMiniCartActive: state.cart.isMiniCartActive,
        selectedOptions: state.cart.selectedOptions

    }
};

let CartModalContainerWithRouter = withRouter(MiniCartContainer);

export default connect(mapStateToProps, {onAddItemQuantity, onRemoveItemQuantity, setTotalPrice, setMiniCartActive})(CartModalContainerWithRouter);