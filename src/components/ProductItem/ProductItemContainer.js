import React from "react";
import ProductItem from "./ProductItem";
import { withRouter } from "../../ReactRouterWrapper/ReactRouterWrapper";
import {getRequestedProduct} from "../../redux/productsReducer";
import {setCartItems, setSelectedOptions} from "../../redux/cartReducer";
import {connect} from "react-redux";
class ProductItemContainer extends React.Component {

    componentDidMount() {
        this.props.getRequestedProduct(this.props.params.id)
    }

    render() {

        const { requestedProduct, currentCurrencyIndex, setCartItems, setSelectedOptions, selectedOptions } = this.props;

        return (
            <ProductItem
                productInfo={requestedProduct}
                currentCurrency={currentCurrencyIndex}
                onItemAdd={setCartItems}
                setSelectedOptions={setSelectedOptions}
                selectedOptions={selectedOptions}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        requestedProduct: state.categoriesProducts.requestedProduct,
        currentCurrencyIndex: state.cart.currentCurrency,
        selectedOptions: state.cart.selectedOptions
    }
}

let ProductItemContainerWithRouter = withRouter(ProductItemContainer);

export  default connect(mapStateToProps, {getRequestedProduct, setCartItems, setSelectedOptions})(ProductItemContainerWithRouter);