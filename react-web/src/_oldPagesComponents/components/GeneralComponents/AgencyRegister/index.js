/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import ReactGA from 'react-ga';
import RegisterBar from '../../../pages/_old/RegisterBar';
import BannerRegister from '../../../pages/_old/BannerRegister';
import FeaturesRegister from '../../../pages/_old/FeaturesRegister';
import Faq from '../../../pages/_old/Faq';
import Footer from '../../Footer';
import Plans from '../../../pages/_old/Plans';
//import ReactPixel from 'react-facebook-pixel';

const fpOptions = {
	autoConfig: true,
  debug: false, 	
};
ReactPixel.init('549275042176385', null, fpOptions);
ReactPixel.pageView();

const AgencyRegister = ({ history }) => (
  <div>
    {ReactGA.pageview('/PLANES-AGENCIA')}
    <div>
      <RegisterBar history={history} />
      <BannerRegister history={history} />
      <div id="Features">
        <FeaturesRegister />
      </div>
      <div id="Plans">
        <Plans history={history} />
      </div>
      <div id="Faq">
        {/* <Faq /> */}
      </div>
      <Footer history={history} />
    </div>
  </div>
);

export default AgencyRegister;
