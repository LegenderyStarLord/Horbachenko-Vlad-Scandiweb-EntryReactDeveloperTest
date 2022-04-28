import React from "react";
import ProductList from "./ProductList";
import {connect} from "react-redux";
import {setCartItems, setSelectedOptions} from "../../redux/cartReducer";
import {getRequestedCategoryProducts} from "../../redux/productsReducer";
import {withRouter} from "../../ReactRouterWrapper/ReactRouterWrapper";


class ProductListContainer extends React.Component {

    componentDidMount() {
        this.props.getRequestedCategoryProducts(this.props.params.name)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.getRequestedCategoryProducts(this.props.params.name)
    }

    render() {

        const { setCartItems, requestedCategoryProducts, currentCategory, currentCurrencyIndex, setSelectedOptions } = this.props;

        return (
            <ProductList
                onItemAdd={setCartItems}
                products={requestedCategoryProducts}
                categoryName={currentCategory}
                currentCurrency={currentCurrencyIndex}
                setSelectedOptions={setSelectedOptions}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        requestedCategoryProducts: state.categoriesProducts.requestedCategoryProducts,
        currentCategory: state.categoriesProducts.currentCategory,
        currentCurrencyIndex: state.cart.currentCurrency
    }
}

let ProductListContainerWithRouter = withRouter(ProductListContainer);

export  default connect(mapStateToProps, {setCartItems, setSelectedOptions, getRequestedCategoryProducts})(ProductListContainerWithRouter);