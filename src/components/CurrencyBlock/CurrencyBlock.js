import React from "react";
import "./CurrencyBlock.scss";



class CurrencyBlock extends React.Component {
    handleCurrencyChange = (e) => {
        let chosenCurrency = e.currentTarget.value;
        this.props.setCurrentCurrency(chosenCurrency);
    }

    render() {

        const { active, currencies, setCurrencyBlockActive } = this.props;

        return (
            <div id={"currency-block"} className={active ? "currency-block active" : "currency-block"}>
                <div className={"currency-list"}>
                    {currencies?.map((currency, index) => {
                        return (
                            <div onClick={() => setCurrencyBlockActive()} className={"currency-container"} key={currency.label}>
                                <label  className={"currency-label"}>
                                    <input className={"currency-input"}
                                           name={"currencyOption"}
                                           value={index}
                                           type={"radio"}
                                           onClick={e => {
                                               this.handleCurrencyChange(e)
                                           }}
                                    />
                                    <div className={"currency-sub-container"}>
                                        <p>
                                            <span className={"currency-symbol"}>{currency.symbol}</span>
                                            <span className={"currency-amount"}>{currency.label}</span>
                                        </p>
                                    </div>
                                </label>

                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default CurrencyBlock;