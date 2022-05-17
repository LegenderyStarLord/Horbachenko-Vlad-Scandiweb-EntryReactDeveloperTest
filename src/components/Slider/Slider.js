import React from "react";
import "./Slider.scss";
import vectorLeft from "../../assets/vector-left.png";
import vectorRight from "../../assets/vector-right.png";


class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgIndex: 0
        }
    }

    sliderClickRight = (gallery) => {
        this.state.imgIndex  < gallery.length - 1
            ? this.setState({imgIndex: this.state.imgIndex + 1})
            : this.setState({imgIndex: 0})
    }

    sliderClickLeft = (gallery) => {
        this.state.imgIndex  > 0 && this.state.imgIndex !== 0
            ? this.setState({imgIndex: this.state.imgIndex - 1})
            : this.setState({imgIndex: gallery.length - 1})
    }

    render() {

        const { itemGallery } = this.props;
        const { imgIndex } = this.state;

        return (
            <div className={"slider-container"}>
                <img className={"cart-img"} src={itemGallery[imgIndex]} alt={"product"}/>
                { itemGallery.length > 1
                    ?
                    <div>
                        <div onClick={() => this.sliderClickLeft(itemGallery)} className={"vector-left-container vector-container"}>
                            <img className={"slider-vector vector-left"} src={vectorLeft} alt={"slider-vector-img"}/>
                        </div>
                        <div onClick={() => this.sliderClickRight(itemGallery)} className={"vector-right-container vector-container"}>
                            <img className={"slider-vector vector-right"} src={vectorRight} alt={"slider-vector-img"}/>
                        </div>
                    </div>
                    : null
                }

            </div>
        )
    }
}

export default Slider;