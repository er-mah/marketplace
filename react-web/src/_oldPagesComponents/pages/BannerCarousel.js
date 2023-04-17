import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

/* eslint react/jsx-filename-extension: 0 */

export default class BannerCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }
  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.photoGalery.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.photoGalery.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const slides = this.props.photoGalery.map(item => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.src}
      >
        <img className="banner-img" src={item.src} alt={item.altText} />
      </CarouselItem>
    ));
    return (
      <div>
        <div className="banner-container" onClick={()=>this.props.history.push('/personalShopperS1')}>
          <Carousel
            pauser={['hover', false]}
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            {this.props.photoGalery.length > 1 && <CarouselIndicators items={this.props.photoGalery} activeIndex={activeIndex} onClickHandler={this.goToIndex} />}
            {slides}

            {this.props.photoGalery.length > 1 && <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />}
            {this.props.photoGalery.length > 1 && <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />}
          </Carousel>

        </div>
      </div>

    );
  }
}
