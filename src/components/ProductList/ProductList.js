import React from "react";
import "./ProductList.scss";
import { withRouter } from "../../ReactRouterWrapper/ReactRouterWrapper";
import addToCartBtn from "../../assets/Circle Icon.png";


class ProductList extends React.Component {

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    OnAddToCart = (e, product) => {
        e.stopPropagation();

        if(product.inStock) {
           let options =  product.attributes.map((atr) => {
                let id = product.id;
                let value = atr.items[0].value;
                let name = atr.name;
              return {name: name, value: value, id: id }
            })

            let productItem =  {...product};
            productItem.quantity = 1;
            productItem.selectedOptions = options;
            productItem.productId = this.getRandomInt(1000);
            this.props.onItemAdd(productItem);
        }
    }

    render() {

        const { categoryName, products, navigate, currentCurrency } = this.props;

        return (
            <div className={"cards-container-wrapper"}>
            <h1 className={"category-name"}>{categoryName}</h1>
            <div className={"cards-container"}>
                {products.map((product) => {
                    return (
                        <div className={ product.inStock ? "product-card" : "product-card out-of-stock-product"} key={product.id}
                             onClick={() => navigate(`/product_item/${product.id}`)}>
                            {product.inStock
                                ? ""
                                : <p className={"out-of-stock-text"}>OUT OF STOCK</p>
                            }
                            <div className={"img-container"}>
                                <img src={product.gallery[0]} alt={"product"}/>
                                <button onClick={(e) => this.OnAddToCart(e, product)}
                                        className={"addToCartBtn"}>
                                    <img  src={addToCartBtn} alt={"addToCartBtn"}/>
                                </button>
                            </div>
                            <div className={"product-name-price"}>
                                <h4>{product.brand} {product.name}</h4>
                                <p>
                                    <span>{product.prices[currentCurrency].currency.symbol}</span>{product.prices[currentCurrency].amount}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            </div>
        );
    }
}

export default withRouter(ProductList);