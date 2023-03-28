/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import {
  Redirect,
} from 'react-router-dom';
import ReactGA from 'react-ga';
import RegisterBar from '../../../stories/RegisterBar';
import BannerWithoutRegister from '../../../stories/BannerWithoutRegister';
import FeaturesWithoutRegister from '../../../stories/FeaturesWithoutRegister';
import Faq from '../../../stories/Faq';
import Footer from '../../../stories/Footer';
import Plans from '../../../stories/Plans';
import { isUserLogged } from '../../../modules/sessionFunctions';

const WithoutRegister = ({ history, location }) => (
  <div>
    {ReactGA.pageview('/PLANES-SIN-REGISTRO')}
    {isUserLogged() &&
    <Redirect to="/createPublication" />}
    <RegisterBar history={history} location={location} />
    <BannerWithoutRegister history={history} />
    <div id="Features">
      <FeaturesWithoutRegister />
    </div>
    <div id="Plans">
      <Plans history={history} />
    </div>
   {/*  <div id="Faq">
      <Faq />
    </div> */}
    <Footer history={history} />
  </div>
);

export default WithoutRegister;
