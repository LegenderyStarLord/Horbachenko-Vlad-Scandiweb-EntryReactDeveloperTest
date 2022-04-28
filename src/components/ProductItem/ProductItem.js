import React from "react";
import "./ProductItem.scss";


class ProductItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImg: 0,
            selected: false,
            descriptionLength: 300,
            sideImgHeight: "370px"
        }
    }

    handleImgChange = (e) => {
        let id = e.currentTarget.id;
        this.setState({currentImg: this.state.currentImg = id});
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
        this.setState({selected: true})
        let selectedValue = e.currentTarget.value;
        let selectedName = e.currentTarget.name;
        let id = e.currentTarget.id;
        this.props.setSelectedOptions(selectedName, selectedValue, id);
    };

    onAddItemToCart = (productInfo) => {
        document.querySelectorAll('input[type="radio"]')
            .forEach(el => el.checked = false);

        if(!this.state.selected) {
            productInfo.attributes.map((atr) => {
                let id = productInfo.id;
                let value = atr.items[0].value;
                let name = atr.name;
                return this.props.setSelectedOptions(name, value, id);
            })
        }
        let product =  {...productInfo};
        product.quantity = 1;
        this.props.onItemAdd(product);
        this.setState({selected: false})

    };


    render() {

        const { productInfo, currentCurrency } = this.props;
        const { sideImgHeight, currentImg, descriptionLength } = this.state;

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
                                ><img className={"list-img"}
                                      src={img} alt={"image"}/>
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

                <img className={"main-img"} src={productInfo?.gallery[currentImg]} alt={"product-picture"}/>
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
                    <button className={"add-to-cart-btn"} onClick={() => this.onAddItemToCart(productInfo)}>ADD TO CART</button>
                    <div className={"description-container"}>
                        <p className={"product-description-info"}
                           dangerouslySetInnerHTML={{__html: productInfo?.description.substring(0, descriptionLength)}}
                        />
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