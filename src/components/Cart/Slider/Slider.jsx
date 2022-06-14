import React, { PureComponent } from "react";
import "./Slider.css";
import { ReactComponent as CartVector } from "../../../pics/slider-vector.svg";

export default class Slider extends PureComponent {
  state = {
    current: 0,
  };

  nextSlide = () => {
    const { current } = this.state;
    const newCurrent =
      current === this.props.gallery.length - 1 ? 0 : current + 1;
    this.setState({ current: newCurrent });
  };

  prevSlide = () => {
    const { current } = this.state;
    const newCurrent =
      current === 0 ? this.props.gallery.length - 1 : current - 1;
    this.setState({ current: newCurrent });
  };

  render() {
    return (
      <div className="slider">
        {this.props.gallery.length > 1 ? (
          <div className="slider-arrows">
            <div className="left-arrow arrow-box" onClick={this.prevSlide}>
              <CartVector />
            </div>
            <div className="right-arrow arrow-box" onClick={this.nextSlide}>
              <CartVector />
            </div>
          </div>
        ) : null}
        {this.props.gallery.map((slide, index) => {
          return (
            <div key={index}>
              {index === this.state.current && (
                <img className="slide-img" src={slide} alt="" />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
