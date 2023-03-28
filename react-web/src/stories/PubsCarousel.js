import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

import photoGaleryParser from '../modules/photoGaleryParser';
import CarResult from '../stories/CarResult';

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
    const nextIndex = this.state.activeIndex === this.props.pubs.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.pubs.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const slides = this.props.pubs.map((item, index) => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        <CarResult
          photoGalery={photoGaleryParser(item.ImageGroup)}
          data={item}
        />
      </CarouselItem>
    ));
    return (
      <div>
        <div className="pub-container">
          <Carousel
            pauser={['hover', false]}
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators
              className="pub-indicator"
              items={this.props.pubs}
              activeIndex={activeIndex}
              onClickHandler={this.goToIndex}
            />
            {slides}
          </Carousel>

        </div>
      </div>

    );
  }
}
