import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

/* eslint react/jsx-filename-extension: 0 */

export default class ServiceCarousel extends Component {
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
        <div className="service-parent">
          <div className="service-child service-carousel" style={{ backgroundImage: `url(/assets/images/${item.image}.png)` }}>
            <h1>{item.title}</h1>
            <button className="service-child-link" onClick={() => this.props.history.push(item.link)} >{item.subtitle}</button>
          </div>
        </div>
      </CarouselItem>
    ));
    return (
      <div>
        <div className="banner-container">
          <Carousel
            pauser={['hover', false]}
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators items={this.props.photoGalery} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}

            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>

        </div>
      </div>

    );
  }
}
