/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import ReactGA from 'react-ga';
import RegisterBar from '../../../pages/old/RegisterBar';
import BannerUser from '../../../pages/old/BannerUser';
import FeaturesUser from '../../../pages/old/FeaturesUser';
import Faq from '../../../pages/old/Faq';
import Footer from '../../Footer';
import Plans from '../../../pages/old/Plans';

const Home = ({ history }) => (
  <div>
    {ReactGA.pageview('/PLANES-USUARIO')}
    <RegisterBar history={history} />
    <BannerUser history={history} />
    <div id="Features">
      <FeaturesUser />
    </div>
    <div id="Plans">
      <Plans history={history} />
    </div>
    <div id="Faq">
      <Faq />
    </div>
    <Footer history={history} />
  </div>
);

export default Home;
