import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setCurrencyBlockActive, setMiniCartActive} from "../../redux/cartReducer";
import {getCategories} from "../../redux/productsReducer";


class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.getCategories();
    }

    render() {

        const { currentCurrency, currenciesList, isMiniCartActive, setMiniCartActive,
                isCurrencyBlockActive, setCurrencyBlockActive, cartItems, categoriesList } = this.props;

        return (
            <Header
                currentCurrency={currentCurrency}
                currenciesList={currenciesList}
                isMiniCartActive={isMiniCartActive}
                setMiniCartActive={setMiniCartActive}
                isCurrencyBlockActive={isCurrencyBlockActive}
                setCurrencyBlockActive={setCurrencyBlockActive}
                cartItems={cartItems}
                categoriesList={categoriesList.categories}
            />
        )
    }
};


let mapStateToProps = (state) => {
    return {
        currenciesList: state.cart.currenciesList,
        currentCurrency: state.cart.currentCurrency,
        isMiniCartActive: state.cart.isMiniCartActive,
        isCurrencyBlockActive: state.cart.isCurrencyBlockActive,
        cartItems: state.cart.cartItems,
        categoriesList: state.categoriesProducts.categoriesList
    }
}

export default connect(mapStateToProps, {setMiniCartActive, setCurrencyBlockActive, getCategories})(HeaderContainer);