import React from "react";
import "./ProductItem.scss";
import DOMPurify from 'dompurify';

class ProductItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImg: 0,
            selected: false,
            descriptionLength: 300,
            sideImgHeight: "370px",
            selectedOptions: [],
        }
        this.myRef = React.createRef();
    }

    componentDidMount() {
        if(this.props.productInfo) {
            this.myRef.current.innerHTML = DOMPurify.sanitize(this.props.productInfo.description.substring(0, this.state.descriptionLength));
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.productInfo) {
            this.myRef.current.innerHTML = DOMPurify.sanitize(this.props.productInfo.description.substring(0, this.state.descriptionLength));
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    handleImgChange = (e) => {
        let id = e.currentTarget.id;
        this.setState({currentImg: id});
    };

    toggleReadMore = () => {
        this.state.descriptionLength > 300
            ? this.setState({descriptionLength: 300})
            : this.setState({descriptionLength: this.props.productInfo.description.length})
    }

    toggleSideImgHeight = () => {
        this.state.sideImgHeight !== "370px"
            ? this.setState({sideImgHeight: "370px"})
            : this.setState({sideImgHeight: ""})
    }

    onSelect = (e) => {
        if(this.state.selectedOptions.filter(el => el.name === e.currentTarget.name && el.id === e.currentTarget.id).length > 0) {
            this.state.selectedOptions.map((item) => item.id === e.currentTarget.id && item.name === e.currentTarget.name && item.value !== e.currentTarget.value
                ? item.value = e.currentTarget.value
                : item
            );
        } else {
            this.setState({...this.state, selectedOptions: [...this.state.selectedOptions, {name: e.currentTarget.name, value: e.currentTarget.value, id: e.currentTarget.id}] })
            }

        this.setState({selected: true})
    };



    onAddItemToCart = (productInfo) => {
        document.querySelectorAll('input[type="radio"]')
            .forEach(el => el.checked = false);

        productInfo.attributes.map((atr) => {
            let id = productInfo.id;
            let value = atr.items[0].value;
            let name = atr.name;
            return {id: id, value: value, name: name};
        })

        let order = productInfo.attributes.map((atr) => {
            return atr.name
        })

        let orderedOptions = this.state.selectedOptions;
        orderedOptions.sort(function(a, b) {
            return order.indexOf(a.name) - order.indexOf(b.name);
        })

        if(!this.state.selected) {
            let product =  {...productInfo};
            product.quantity = 1;
            product.selectedOptions = orderedOptions;
            product.productId = this.getRandomInt(1000);
            this.props.onItemAdd(product);
        } else {
            let product =  {...productInfo};

            product.quantity = 1;
            product.productId = this.getRandomInt(1000);
            product.selectedOptions = orderedOptions;
            this.props.onItemAdd(product);
            this.setState({...this.state, selectedOptions: []})
            this.setState({selected: false})
        }

    };


    render() {

        const { productInfo, currentCurrency } = this.props;
        const { sideImgHeight, currentImg, descriptionLength, selectedOptions } = this.state;

        return (
            <div className={"productInfo-wrapper"}>
                <div className={"images-container"}>
                    <ul className={"images-list"}
                        style={productInfo?.gallery.length > 4 ? {
                            height: sideImgHeight,
                            overflow: "hidden"
                        } : {}}>
                        {productInfo?.gallery.map((img, index) => {
                            return (
                                <li key={index}
                                    id={index}
                                    onClick={(e) => this.handleImgChange(e)}
                                ><img className={"list-img"} src={img} alt={"product"}/>
                                </li>
                            )
                        })}
                    </ul>
                    {productInfo?.gallery.length > 4 ?
                        <button className={"show-more"} onClick={() => this.toggleSideImgHeight()}>
                            {sideImgHeight === "370px" ? "Show More" : "Show Less"}
                        </button>
                        : ""}
                </div>
                <div className={ productInfo?.inStock ? "pdp-main-img-container" : "pdp-main-img-container pdp-out-of-stock-product "}>
                    {productInfo?.inStock
                        ? ""
                        : <p className={"pdp-out-of-stock-text"}>OUT OF STOCK</p>
                    }
                    <img className={"main-img"} src={productInfo?.gallery[currentImg]} alt={"product"}/>
                </div>

                <div className={"product-item-info"}>
                    <h1>{productInfo?.name}</h1>
                    <p className={"brand-name"}>{productInfo?.brand}</p>
                    <div className={"config-container"}>
                        {productInfo?.attributes.map((atr) => {
                            return (
                                <div className={"config-sub-container"} key={atr.id} >
                                <p className={"product-config"}>{atr.name}:</p>
                                    <div className={"config-buttons-block"}>
                                    {atr.name === "Color"
                                        ? atr.items.map((item) => {
                                            return (
                                                <label key={item.id} className={"check color-option"} style={{backgroundColor: item.value}}>
                                                    <input className={"check-color-input"}
                                                           type={"radio"}
                                                           onClick={e => this.onSelect(e)}
                                                           key={item.id}
                                                           id={productInfo.id}
                                                           name={atr.name}
                                                           value={item.value} />
                                                    <span className={"check-box"} />
                                                </label>
                                                )
                                            })
                                        : atr.items.map((item) => {
                                            return (
                                                <label key={item.id} className={"check text-option"}>
                                                    <input className={"check-text-input"}
                                                           type={"radio"}
                                                           onClick={e => this.onSelect(e)}
                                                           key={item.id}
                                                           id={productInfo.id}
                                                           name={atr.name}
                                                           value={item.value} />
                                                    <div className={"check-box"}>
                                                        <p>{item.value}</p>
                                                    </div>
                                                </label>
                                                )
                                            })
                                    }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={"price-info-block"}>
                        <p className={"price"}>PRICE:</p>
                        <div className={"price-number"}>
                            <span>{productInfo?.prices[currentCurrency].currency.symbol}</span>
                            {productInfo?.prices[currentCurrency].amount}
                        </div>
                    </div>
                    <button disabled={productInfo?.attributes.length !== selectedOptions?.length || !productInfo?.inStock } className={"add-to-cart-btn"} onClick={() => this.onAddItemToCart(productInfo)}>ADD TO CART</button>
                    <div className={"description-container"}>
                        <p className={"product-description-info"}
                           ref={this.myRef}
                        >""</p>
                        {productInfo?.description.length >= 300
                            ? <span className={"read-more-btn"}
                                    onClick={() => this.toggleReadMore()}
                            >{descriptionLength <= 300 ? "Read more.." : "Read less"}</span>
                            : ""
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductItem;