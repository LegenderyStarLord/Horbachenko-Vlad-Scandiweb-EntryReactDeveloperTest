import React from "react";
import { connect } from "react-redux";
import CurrencyBlock from "./CurrencyBlock";
import {getCurrencies, setCurrentCurrency} from "../../redux/cartReducer";

class CurrencyBlockContainer extends React.Component {

    componentDidMount() {
        this.props.getCurrencies()
    }

    render() {

        const {currenciesList, isCurrencyBlockActive, setCurrentCurrency} = this.props;

        return (
            <CurrencyBlock
                currencies={currenciesList}
                active={isCurrencyBlockActive}
                setCurrentCurrency={setCurrentCurrency}
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

export default connect(mapStateToProps, {getCurrencies, setCurrentCurrency})(CurrencyBlockContainer);