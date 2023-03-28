/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import ReactGA from 'react-ga';
import RegisterBar from '../../../stories/RegisterBar';
import BannerUser from '../../../stories/BannerUser';
import FeaturesUser from '../../../stories/FeaturesUser';
import Faq from '../../../stories/Faq';
import Footer from '../../../stories/Footer';
import Plans from '../../../stories/Plans';

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
