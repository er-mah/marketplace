import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

/*
// Todo: adapt this
// import { graphql, compose } from "react-apollo";
//import { mobilecheck } from "../../../modules/functions";

import {
  HomeQuery,
  LastPublicationsQuery,
} from "../../../_old/HomeQuery";
import { GetTextsQuery } from "../../../_old/TextsQueries";
import CarHomeContainer from "../../../pages/CarHomeContainer";
import PaymentBanner from "../../../pages/PaymentBanner";
import CarResult from "../../../pages/CarResult";
import Banner from "../../../pages/Banner";
import Card123Seguros from "../../../pages/Card123Seguros";
import PubsCarousel from "../../../pages/PubsCarousel";
import Services from "../../../pages/Services";
import LastPublications from "../../../pages/LastPublications";
import FriendlyCompanies from "../../../pages/FriendlyCompanies";
import LoadingComponent from "../../../pages/LoadingComponent";

import photoGaleryParser from "../../../modules/photoGaleryParser";

// import ReactPixel from "react-facebook-pixel";

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

const HomePage = ({ data, history, location, lastPubs, Texts }) => {
  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Bienvenido a TechMo Marketplace</title>
        </Helmet>

        {/* HEADER */}
        <Header history={history} location={location} />

        <section className="bg-gray-50">
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Encontrá el auto de tus sueños
              </h2>

              <p className=" text-gray-500 sm:mt-4 sm:block">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae dolor
                officia blanditiis repellat in, vero, aperiam porro ipsum laboriosam
                consequuntur exercitationem incidunt tempora nisi?
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-xl">
              <form action="#" className="sm:flex sm:gap-4">
                <div className="sm:flex-1 ">
                  <label className="sr-only">Email</label>

                  <input
                      type="email"
                      placeholder="¿Qué modelo buscás?"
                      className=" w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400"
                  />
                </div>

                <button
                    type="submit"
                    className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-rose-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
                >
                  <span className="text-sm font-medium">Sign Up</span>

                  <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>

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
              <div>
                <p className="mt-8 text-5xl font-medium tracking-tighter text-black">
                  I am a short heading
                </p>
                <p className="max-w-xl mx-auto mt-4 text-lg tracking-tight text-gray-600">
                  If you could kick the person in the pants responsible for most
                  of your trouble, you wouldn't sit for a month
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 mt-10 lg:flex-row">
                <a
                  href="#"
                  className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600"
                >
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
                      <img
                        className="max-h-12"
                        src="https://d33wubrfki0l68.cloudfront.net/44af4580ddf70d4291cdd93ee4b42b6332325e37/0f441/images/logos/10.svg"
                        alt=" logo"
                      ></img>
                    </div>
                    <div className="flex justify-center col-span-1 px-8">
                      <img
                        className="max-h-12"
                        src="https://d33wubrfki0l68.cloudfront.net/aae3d6dfaee9138c485f5305dd33b7f80379edb4/64dd2/images/logos/2.svg"
                        alt="logo"
                      ></img>
                    </div>
                    <div className="flex justify-center col-span-1 px-8">
                      <img
                        className="max-h-12"
                        src="https://d33wubrfki0l68.cloudfront.net/4dc5df63255f9f0c1f54c804dd3149cf11308507/b7a70/images/logos/3.svg"
                        alt="logo"
                      ></img>
                    </div>
                    <div className="flex justify-center col-span-1 px-8">
                      <img
                        className="max-h-12"
                        src="https://d33wubrfki0l68.cloudfront.net/be7130b04bb6b932ed9222877a5e9146d80c0eba/6511d/images/logos/4.svg"
                        alt="logo"
                      ></img>
                    </div>
                    <div className="flex justify-center col-span-1 px-8">
                      <img
                        className="max-h-12"
                        src="https://d33wubrfki0l68.cloudfront.net/456c999508e76cd199714cfa4fad3826ebb02216/9147b/images/logos/5.svg"
                        alt="logo"
                      ></img>
                    </div>
                    <div className="flex justify-center col-span-1 px-8">
                      <img
                        className="max-h-12"
                        src="https://d33wubrfki0l68.cloudfront.net/b5d09ea7476a226d10dd1235e071288761e51da7/e68ac/images/logos/6.svg"
                        alt="logo"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer history={history} />
      </div>
    </>
  );
};
/*
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
const Data = compose(
  withLastPublicationsQuery,
  withHomeQuery,
  withTextsQuery
);



 */

export default HomePage;