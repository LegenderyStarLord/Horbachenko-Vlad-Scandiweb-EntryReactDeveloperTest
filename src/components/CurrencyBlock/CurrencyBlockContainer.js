import React from "react";
import { connect } from "react-redux";
import CurrencyBlock from "./CurrencyBlock";
import {getCurrencies, setCurrencyBlockActive, setCurrentCurrency} from "../../redux/cartReducer";

class CurrencyBlockContainer extends React.Component {

    componentDidMount() {
        this.props.getCurrencies()
    }

    render() {

        const {currenciesList, isCurrencyBlockActive, setCurrentCurrency, setCurrencyBlockActive} = this.props;

        return (
            <CurrencyBlock
                currencies={currenciesList}
                active={isCurrencyBlockActive}
                setCurrentCurrency={setCurrentCurrency}
                setCurrencyBlockActive={setCurrencyBlockActive}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currenciesList: state.cart.currenciesList,
        isCurrencyBlockActive: state.cart.isCurrencyBlockActive
    }
}

export default connect(mapStateToProps, {getCurrencies, setCurrentCurrency, setCurrencyBlockActive})(CurrencyBlockContainer);