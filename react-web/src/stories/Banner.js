import React from 'react';
import { Row } from 'reactstrap';
import _ from 'lodash';
/* eslint react/jsx-filename-extension: 0 */
import { isAdminLogged } from '../modules/sessionFunctions';
import { getSliders } from '../modules/fetches';
import BannerCarousel from './BannerCarousel';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title1: '',
      sliders: [{ src: '' }],
    };
  }
  componentWillMount() {
    getSliders()
      .then((res) => {
        const sliders = res.data.map((row, index) => ({ src: `${process.env.REACT_APP_API}/images/${row.image}`, altText: `slider${index}` }));
        this.setState({
          sliders: [sliders[0], sliders[2], sliders[4]],
          slidersMobile: [sliders[1], sliders[3], sliders[5]],
        });
      });
  }
  render() {
    // const backgroundImage = this.state.sliders[0].src;
    return (
      <div className="container-fluid">
        <Row>
          {
        window.matchMedia('(max-width: 550px)').matches
          ?
            <BannerCarousel
              history={this.props.history}
              photoGalery={_.remove(this.state.slidersMobile, n => n !== undefined)}
            />
          :
            <BannerCarousel
              history={this.props.history}
              photoGalery={_.remove(this.state.sliders, n => n !== undefined)}
            />
          }
          {/* <div className="container">
            <Row className="align-items-center justify-content-between">
              <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
                {isAdminLogged() ?
                  <InputOrText
                    style={{
                      position: 'absolute',
                      top: '-160px',
                      color: 'white',
                      justifyContent: 'space-between',
                    }}
                    type="h3"
                    text={this.state.title1}
                    height="60px"
                    section="title1"
                    route="home"
                    onChange={title1 => this.setState({ title1 })}
                  />
                :
                  <h3 style={{
                    position: 'relative',
                    top: window.matchMedia('(max-width: 550px)').matches ? '-120px' : '-150px',
                    left: window.matchMedia('(max-width: 550px)').matches ? '0px' : '80px',
                    color: 'white',
                    justifyContent: 'space-between',
                    marginBottom: '-50px',
                  }}
                  >{this.state.title1}
                  </h3>
                }
              </div>
            </Row>
          </div> */}
        </Row>
      </div>
    );
  }
}

export default Banner;

