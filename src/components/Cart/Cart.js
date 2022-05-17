import React from "react";
import "./Cart.scss";
import Slider from "../Slider/Slider";

class Cart extends React.Component {

    rounded(number){
        return +number.toFixed(2);
    }


    render() {
        const {cartItems, currentCurrency, onAdd, onRemove, totalPrice, onOrderItems} = this.props;
        const currencySymbol = cartItems[0]?.prices[currentCurrency].currency.symbol;
        const taxPrice = this.rounded(totalPrice / 100 * 21);

        return (
            <div className={"cart"}>
                <h1>CART</h1>
                {cartItems.map((item) => {
                    return (
                        <div key={item.id} className={"cart-items-block"}>
                            <div>
                                <h3 className={"cart-item-name"}>{item.name}</h3>
                                <p className={"cart-item-brand"}>{item.brand}</p>
                                <p className={"cart-price"}>
                                    <span>{item.prices[currentCurrency].currency.symbol}</span>{this.rounded(item.prices[currentCurrency].amount * item.quantity)}
                                </p>
                                <div className={"cart-options"}>
                                    {
                                        item.attributes.map((atr) => {
                                            return (
                                                <div key={atr.id} className={"cart-atr-container"}>
                                                    <p className={"cart-atr-name"}>{atr.name}:</p>
                                                    {atr.items.map((atrItem) => {
                                                        let found = item.selectedOptions?.some(function (option) {
                                                            return option.id === item.id && option.name === atr.name && option.value === atrItem.value
                                                        })
                                                        return (
                                                            <div key={atrItem.id}
                                                                 className={found ? atr.type === "text" ? "cartSelectedText" : "cartSelectedColor"
                                                                    : atr.type === "swatch" ? "cartSwatchTypeStyles" : "cartTextTypeStyles"}
                                                                 style={atr.type === "swatch" ? {backgroundColor: atrItem.value} : {}}
                                                            >{atr.type === "swatch" ? "" : atrItem.value}</div>
                                                        )
                                                    })}

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={"add-remove-block"}>
                                <button onClick={() => onAdd(item.productId)}>+</button>
                                <p>{item.quantity}</p>
                                <button onClick={() => onRemove(item.productId)}>-</button>
                            </div>
                            <Slider itemGallery={item.gallery}/>
                        </div>
                    )
                })}

                {cartItems.length !== 0
                    ? <div className={"financial-info-block"}>
                        <p className={"tax"}>Tax 21%: <span>{currencySymbol}{taxPrice}</span></p>
                        <p>Quantity:
                            <span className={"cart-product-qty"}>{cartItems.reduce(function(previousValue, currentValue) {
                            return previousValue + currentValue.quantity;}, 0)}
                            </span>
                        </p>
                        <div className={"total-price-container"}><span>Total:</span>
                            <span className={"cart-total-price"}>{currencySymbol}{totalPrice.toFixed(2)}</span></div>
                        <button onClick={() => onOrderItems()} className={"order-btn"}>ORDER</button>
                    </div>
                    : <span className={"not-selected"}>goods have not yet been selected</span>
                }

            </div>
        )
    }
}

export default Cart;