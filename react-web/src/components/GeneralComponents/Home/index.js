import React, { Fragment } from "react";
import { graphql, compose } from "react-apollo";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
import { hotjar } from "react-hotjar";
import { mobilecheck } from "../../../modules/functions";

import {
  HomeQuery,
  LastPublicationsQuery,
} from "../../../apolloQueries/HomeQuery";
import { GetTextsQuery } from "../../../apolloQueries/TextsQueries";
import CarHomeContainer from "../../../stories/CarHomeContainer";
import PaymentBanner from "../../../stories/PaymentBanner";
import Header from "../../../stories/Header";
import CarResult from "../../../stories/CarResult";
import Banner from "../../../stories/Banner";
import Card123Seguros from "../../../stories/Card123Seguros";
import PubsCarousel from "../../../stories/PubsCarousel";
import Services from "../../../stories/Services";
import LastPublications from "../../../stories/LastPublications";
import FriendlyCompanies from "../../../stories/FriendlyCompanies";
import Footer from "../../../stories/Footer";
import LoadingComponent from "../../../stories/LoadingComponent";

import photoGaleryParser from "../../../modules/photoGaleryParser";

import ReactPixel from "react-facebook-pixel";

/*
const fpOptions = {
  autoConfig: true,
  debug: false,
};
ReactPixel.init("549275042176385", null, fpOptions);
ReactPixel.pageView();

const script = document.createElement("script");
script.src = "//code.tidio.co/2adtbpujxsburoaa4sm7umttnp1j1wjr.js";
script.async = true;
!mobilecheck() && document.body.appendChild(script);
*/

const Home = ({ data, history, location, lastPubs, Texts }) => (
  <div>
    {!data.loading && (
      <div>
        {ReactGA.pageview("/HOME")}
        {hotjar.initialize(916734, 6)}
        <Helmet>
          <meta charSet="utf-8" />
          <title>Bienvenido a TechMo Marketplace</title>
        </Helmet>

        <Header history={history} location={location} />
        {/* HEADER
         */}
        <div className={"container-fluid"}>

          <h1 className="text-3xl font-bold">
            Hello world!
          </h1>
        </div>
        {/*
        {/*
        <Banner history={history} />



        <Services history={history} location={location} />
        <PaymentBanner />
        {data.HighlightedPublications ? (
          <div>
            <div className="car-home">
              <CarHomeContainer>
                {data.HighlightedPublications.map((row) => (
                  <CarResult
                    photoGalery={photoGaleryParser(row.ImageGroup)}
                    data={row}
                    history={history}
                  />
                ))}
              </CarHomeContainer>
            </div>
            <div className="car-home-responsive">
              <CarHomeContainer mobile>
                <PubsCarousel pubs={data.HighlightedPublications} />
              </CarHomeContainer>
            </div>
          </div>
        ) : (
          <p>There are no highlighted publications</p>
        )}
        <PaymentBanner />
        <LastPublications>
          {
            !lastPubs.loading ?
            lastPubs.LastPublications.map(row => (
              <CarResult
                photoGalery={photoGaleryParser(row.ImageGroup)}
                data={row}
              />
            ))
            :
            []
          }
        </LastPublications>
        {/* <FriendlyCompanies>
          <a href="http://www.mendoza.gov.ar/prevencionvial/"><img src="/assets/images/EA1.jpg" alt="prevencion" /></a>
          <a href="http://www.pueblobenegas.com/"><img src="/assets/images/EA2.jpg" alt="benegas" /></a>
          <a href="http://miautohoy.com/microsite?concesionaria=LM%20Automotores&c_id=26"><img src="/assets/images/EA3.jpg" alt="lm-automotores" /></a>
          <a href="http://www.mktinversiones.com.ar/"><img src="/assets/images/EA4.jpg" alt="mkt" /></a>
        </FriendlyCompanies>
        */}


        <section>
          <div className="items-center px-8 py-12 mx-auto max-w-7xl lg:px-16 md:px-12 lg:py-24">
            <div className="max-w-xl mx-auto text-center lg:p-10">
              <div><p className="mt-8 text-5xl font-medium tracking-tighter text-black">
                I am a short heading
              </p>
                <p className="max-w-xl mx-auto mt-4 text-lg tracking-tight text-gray-600">
                  If you could kick the person in the pants responsible for most of your
                  trouble, you wouldn't sit for a month
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 mt-10 lg:flex-row">
                <a href="#"
                   className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black">
                  Get started
                </a>
                <a href="#"
                   className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600">
                  Learn more
                  <span aria-hidden="true"> → </span>
                </a>
              </div>
            </div>

            <div>
              <div className="bg-white">
                <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
                  <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-6 lg:mt-8">
                    <div className="flex justify-center col-span-1 px-8">
                      <img className="max-h-12"
                           src="https://d33wubrfki0l68.cloudfront.net/44af4580ddf70d4291cdd93ee4b42b6332325e37/0f441/images/logos/10.svg"
                           alt=" logo"></img>
                    </div>
                    <div className="flex justify-center col-span-1 px-8">
                      <img className="max-h-12"
                           src="https://d33wubrfki0l68.cloudfront.net/aae3d6dfaee9138c485f5305dd33b7f80379edb4/64dd2/images/logos/2.svg"
                           alt="logo"></img>
                    </div>
                    <div className="flex justify-center col-span-1 px-8">
                      <img className="max-h-12"
                           src="https://d33wubrfki0l68.cloudfront.net/4dc5df63255f9f0c1f54c804dd3149cf11308507/b7a70/images/logos/3.svg"
                           alt="logo"></img>
                    </div>
                    <div className="flex justify-center col-span-1 px-8">
                      <img className="max-h-12"
                           src="https://d33wubrfki0l68.cloudfront.net/be7130b04bb6b932ed9222877a5e9146d80c0eba/6511d/images/logos/4.svg"
                           alt="logo"></img>
                    </div>
                    <div className="flex justify-center col-span-1 px-8">
                      <img className="max-h-12"
                           src="https://d33wubrfki0l68.cloudfront.net/456c999508e76cd199714cfa4fad3826ebb02216/9147b/images/logos/5.svg"
                           alt="logo"></img>
                    </div>
                    <div className="flex justify-center col-span-1 px-8">
                      <img className="max-h-12"
                           src="https://d33wubrfki0l68.cloudfront.net/b5d09ea7476a226d10dd1235e071288761e51da7/e68ac/images/logos/6.svg"
                           alt="logo"></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer history={history} />
      </div>
    )}
  </div>
);
const options = {
  variables: {
    limit: 12,
    stateName: "Activas",
  },
};
const withTextsQuery = graphql(GetTextsQuery, {
  options: { variables: { route: "home" } },
  name: "Texts",
});
const withHomeQuery = graphql(HomeQuery, { options });
const withLastPublicationsQuery = graphql(LastPublicationsQuery, {
  name: "lastPubs",
});
const withData = compose(
  withLastPublicationsQuery,
  withHomeQuery,
  withTextsQuery
);

export default withData(Home);
