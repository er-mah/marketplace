import React from 'react';
import { Row, Col } from 'reactstrap';
import { stringify } from 'query-string';
import ReactGA from 'react-ga';
import { isUserLogged } from '../../modules/sessionFunctions';
import ServiceCarousel from './ServiceCarousel';
/* eslint react/jsx-filename-extension: 0 */

const services1 = [
  {
    title: 'Financiá tu compra', link: '/pledgeCredits', subtitle: 'Simulá y solicitá un crédito >', image: 'service-1',
  },
  {
    title: 'Vendé tu auto rápido y fácil', link: isUserLogged() ? '/createPublication' : '/publicateWithoutRegister', subtitle: 'Vendé autos >', image: 'service-2',
  },
  {
    title: 'Encontrá ese auto que querés', link: '/SearchCars?text=', subtitle: 'Comprá un auto >', image: 'service-3',
  },
];
const services2 = [
  {
    title: 'Obtené un seguro online', link: '', subtitle: 'Cotizá y contratá Seguros >', image: 'service-4',
  },
  {
    title: 'Buscamos un auto a tu medida', link: '/personalShopperS1', subtitle: 'Solicitá un Personal Shopper >', image: 'service-5',
  },
  {
    title: 'Concesionarias de confianza', link: '/friendlyAgency', subtitle: 'Buscá Concesionarios >', image: 'service-6',
  },
];

class BannerUser extends React.Component {
  renderButton(service) {
    return (
      <div className="service-parent" onClick={() => this.props.history.push(service.link)}>
        <div className="service-child" style={{ backgroundImage: `url(/assets/images/${service.image}.png)` }}>
          <h1>{service.title}</h1>
          <button className="service-child-link" >{service.subtitle}</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          <h3 className="title-division">Nuestros servicios</h3>
        </div>
        <div className="container service-desktop">
          <div className="row">
            {services1.map((item, index) =>
            (<Col md="4" sm="12" key={index} >
              {this.renderButton(item)}
            </Col>))}
          </div>
          <div className="row">
            {services2.map((item, index) =>
            (<Col md="4" sm="12" key={index}>
              {this.renderButton(item)}
            </Col>))}
          </div>
        </div>

        <div className="scrolling-wrapper">
          <ServiceCarousel
            photoGalery={services1}
          />
        </div>
        <div className="scrolling-wrapper">
          <ServiceCarousel
            photoGalery={services2}
          />
        </div>
      </div>
    );
  }
}

export default BannerUser;
