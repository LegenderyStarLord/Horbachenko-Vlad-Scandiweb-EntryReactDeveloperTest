import React from "react";
import "./MiniCart.scss";


class MiniCart extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }


    componentDidMount() {
        {this.props.active ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible"}
        document.addEventListener("mousedown", this.handleClickOutside);
        this.props.setTotalPrice(this.props.cartItems.reduce((a,c) => a + c.prices[this.props.currentCurrency].amount * c.quantity, 0))
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        {this.props.active ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible"}
        this.props.setTotalPrice(this.props.cartItems.reduce((a,c) => a + c.prices[this.props.currentCurrency].amount * c.quantity, 0))
}

    handleClickOutside(event) {
        if ( event.target.id !== "cart-img" && !this.wrapperRef.current.contains(event.target)) {
            this.props.setMiniCartActive(false)
        }
    }

    handleViewBagClick = () => {
        this.props.setMiniCartActive(false)
        this.props.navigate(`/cart`)
    }

    render() {
        const { cartItems, currentCurrency, active, onAdd, onRemove, totalPrice, selectedOptions } = this.props;
        const currencySymbol = cartItems[0]?.prices[currentCurrency].currency.symbol;
        return (
            <div  className={active ? "mini-cart-wrapper" : null}>
            <div ref={this.wrapperRef} className={ active ? "mini-cart active" : "mini-cart"}>
                <p className={"items-qty"}><strong>My Bag,</strong> {cartItems.length} items</p>
                    {cartItems?.map((item) => {
                        return (
                            <div key={item.id} className={"mini-cart-item"}>
                                <div className={"mini-cart-info"}>
                                    <p className={"name"}>{item.name}</p>
                                    <p className={"brand-name"}>{item.brand}</p>
                                    <p className={"price"}>
                                        <span>{item.prices[currentCurrency].currency.symbol}</span>{item.prices[currentCurrency].amount}
                                    </p>
                                    <div className={"options"}>

                                        {
                                            item.attributes.map((atr) => {
                                                return (
                                                    <div key={atr.id} className={"atr-container"}>
                                                    <p className={"atr-name"}>{atr.name}:</p>
                                                        <div className={"atr-options-container"}>
                                                        {atr.items.map((atrItem) => {
                                                          let found =  selectedOptions?.some(function (option) {
                                                              return option.id === item.id &&  option.name === atr.name && option.value === atrItem.value
                                                          })
                                                                    return (
                                                                        found
                                                                        ? <div key={atrItem.id} className={atr.type === "text" ? "selectedText" : "selectedColor"}
                                                                               style={atr.type === "swatch" ? {backgroundColor: atrItem.value} : {}}
                                                                               >{atr.type === "swatch" ? "" : atrItem.value}</div>
                                                                        : <div key={atrItem.id} className={atr.type === "swatch" ? "swatchTypeStyles" : "textTypeStyles"}
                                                                               style={atr.type === "swatch" ? {backgroundColor: atrItem.value} : {}}
                                                                            >{atr.type === "swatch" ? "" : atrItem.value}</div>

                                                        )
                                                })}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className={"add-remove-buttons"}>
                                    <button onClick={() => onAdd(item.id)}>+</button>
                                    <p>{item.quantity}</p>
                                    <button onClick={() => onRemove(item.id)}>-</button>
                                </div>
                                <div>
                                    <img className={"mini-cart-img"} src={item.gallery[0]} alt={"image"}/>
                                </div>
                            </div>
                        )
                    })}
                {cartItems.length !== 0
                    ?  <div className={"mini-cart-price"}><span>Total:</span><span className={"totalPrice"}>{currencySymbol}{totalPrice.toFixed(2)}</span></div>
                    : "goods have not yet been selected"}
                <div className={"mini-cart-buttons"}>
                    <button className={"view-bag-btn"} onClick={() => this.handleViewBagClick() }>VIEW BAG</button>
                    <button className={"check-out-btn"} >CHECK OUT</button>
                </div>
            </div>
            </div>
        )
    }
}

export default MiniCart;