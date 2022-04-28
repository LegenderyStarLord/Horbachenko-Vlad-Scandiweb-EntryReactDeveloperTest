import React from "react";
import {NavLink} from "react-router-dom";
import "./Header.scss";
import vectorDownImg from "../../assets/Vector.png";
import vectorUpImg from "../../assets/Vector-up.png";
import cartImg from "../../assets/cart.png";
import logo from "../../assets/a-logo.png";
import CurrencyBlockContainer from "../CurrencyBlock/CurrencyBlockContainer";
import MiniCartContainer from "../Cart/MiniCart/MiniCartContainer";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event) {
       let clickedElement =  event.path.find(element => element.id === 'currency-block')

        if (!clickedElement && !this.ref.current.contains(event.target)) {
            this.props.setCurrencyBlockActive(false)
        }
    }


    setCurrencyBlock = () => {
        this.props.isCurrencyBlockActive
                ? this.props.setCurrencyBlockActive(false)
                : this.props.setCurrencyBlockActive(true)
    }

    setMiniCartActive = () => {
            this.props.setMiniCartActive(!this.props.isMiniCartActive);
    }

    render() {

        const { currentCurrency, currenciesList, isCurrencyBlockActive, cartItems, categoriesList } = this.props;

        return (
            <div className={"header-wrapper"}>
                <div className={"header-block"}>
                    <div className={"pages-list"}>
                        <ul className={"categories-list"}>
                            {categoriesList?.map((category) => {
                                return (
                                        <li key={category.name}>
                                            <NavLink to={category.name}>{category.name}</NavLink>
                                        </li>
                                    )
                            })}
                        </ul>
                    </div>
                    <img className={"logo"} src={logo} alt={"logo"} />
                    <div className={"cart-block"}>
                        <span className={"currency-symbol"}>{currenciesList[currentCurrency]?.symbol}</span>
                        <button ref={this.ref} className={"vector-btn"} onClick={() => this.setCurrencyBlock()} >
                            <img src={isCurrencyBlockActive ? vectorUpImg : vectorDownImg} alt={"vector"}/>
                        </button>
                        <button className={"cart-btn"} onClick={() => this.setMiniCartActive()}>
                            <img id={"cart-img"} className={"cart-img"} src={cartImg} alt={"cart-img"}/>
                            {cartItems.length > 0
                                ? <div className={"cart-img-hat"}><p>{cartItems.length}</p></div>
                                : null
                            }
                        </button>
                        <CurrencyBlockContainer />
                        <MiniCartContainer />
                    </div>
                </div>
            </div>
        )
    }
};

export default Header;