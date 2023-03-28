import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import TopTopNav from './TopTopNav';
import Header from './Header';
import BreadCrum from './BreadCrum';
import NumberOfResult from './NumberOfResult';
import Badges from './Badges';
import Banner from './Banner';
import CarResult from './CarResult';
import CarCarousel from './CarCarousel';
import CarResultContainer from './CarResultContainer';
import PublicityBanner from './PublicityBanner';
import CreditsBanner from './CreditsBanner';

import { carSearchResult } from './exampleData/carResultData';


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('TopTopNav', module)
  .add('Creditos', () => <TopTopNav />);
storiesOf('SearchBar', module)
  .add('Barra Busqueda', () => <Header />);
storiesOf('BreadCrum', module)
  .add('BreadCrum', () => <BreadCrum url="https://miautohoy.com/admin/cars" />);
storiesOf('NumberOfResult', module)
  .add('NumberOfResult', () => <NumberOfResult results={123} />);
storiesOf('Badges', module)
  .add('Badges', () => <Badges filters={['marca', 'agregado', 'modelo']} handleDelete={() => console.log('funcion q borra filtro')} />);
storiesOf('Banner', module)
  .add('Banner', () => <Banner />);
storiesOf('CarResult', module)
  .add('CarResult', () => (<CarResult
    sold
    photoGalery={[{
    src: 'http://placecage.com/264/176',
    altText: 'image1',
  },
  {
    src: 'http://placecage.com/g/264/176',
    altText: 'image2',
  },
  {
    src: 'http://placecage.com/c/264/176',
    altText: 'image3',
  },
]}
    data={{
    owner: 'Guillermo',
    car: 'Fiat Palio extreme',
    mainAttr: '1.8 Locker Pack extreme',
    price: '260000',
    state: '0 km.',
  }}
  />));

storiesOf('CarCarousel', module)
  .add('CarCarousel', () => (<CarCarousel
    sold
    photoGalery={[{
    src: 'http://placecage.com/264/305',
    altText: 'image1',
  },
  {
    src: 'http://placecage.com/g/264/305',
    altText: 'image2',
  },
  {
    src: 'http://placecage.com/c/264/305',
    altText: 'image3',
  },
]}
  />));

storiesOf('CarResultContainer', module)
  .add('CarResultContainer', () => (
    <CarResultContainer>
      {carSearchResult.map(row =>
        <CarResult photoGalery={row.photoGalery} data={row.data} {...{ [row.State]: true }} />)}
    </CarResultContainer>));
storiesOf('PublicityBanner', module)
  .add('PublicityBanner', () => <PublicityBanner />);
storiesOf('CreditsBanner', module)
  .add('CreditsBanner', () => <CreditsBanner />);
