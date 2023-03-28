import React, { Component } from "react";
import ReactGA from "react-ga";
import "./global.css"

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import Loadable from "react-loadable";
import _404page from "./stories/404page";
import LoginComponent from "./stories/LoginComponent";

const Home = Loadable({
  loader: () => import("./components/GeneralComponents/Home"),
  loading: () => <p>Cargando</p>,
});
const AgencyMicrosite = Loadable({
  loader: () => import("./components/AccountComponents/AgencyMicrosite"),
  loading: () => <p>Cargando</p>,
});
const AgencyRegister = Loadable({
  loader: () => import("./components/GeneralComponents/AgencyRegister"),
  loading: () => <p>Cargando</p>,
});
const AgencyRegisterStepOne = Loadable({
  loader: () => import("./components/GeneralComponents/AgencyRegister/StepOne"),
  loading: () => <p>Cargando</p>,
});
const AgencyRegisterStepTwo = Loadable({
  loader: () => import("./components/GeneralComponents/AgencyRegister/StepTwo"),
  loading: () => <p>Cargando</p>,
});
const AgencyRegisterStepThree = Loadable({
  loader: () =>
    import("./components/GeneralComponents/AgencyRegister/StepThree"),
  loading: () => <p>Cargando</p>,
});
const SearchCars = Loadable({
  loader: () => import("./components/GeneralComponents/SearchCars"),
  loading: () => <p>Cargando</p>,
});
const RecoverPassword = Loadable({
  loader: () => import("./components/GeneralComponents/RecoverPassword"),
  loading: () => <p>Cargando</p>,
});
const CarDetail = Loadable({
  loader: () => import("./components/GeneralComponents/CarDetail"),
  loading: () => <p>Cargando</p>,
});
const CreatePublication = Loadable({
  loader: () => import("./components/GeneralComponents/CreatePublication"),
  loading: () => <p>Cargando</p>,
});
const CreatePublicationStepOne = Loadable({
  loader: () =>
    import("./components/GeneralComponents/CreatePublication/StepOne"),
  loading: () => <p>Cargando</p>,
});
const CreatePublicationStepTwo = Loadable({
  loader: () =>
    import("./components/GeneralComponents/CreatePublication/StepTwo"),
  loading: () => <p>Cargando</p>,
});
const CreatePublicationStepThree = Loadable({
  loader: () =>
    import("./components/GeneralComponents/CreatePublication/StepThree"),
  loading: () => <p>Cargando</p>,
});
const FreeDestinationCredits = Loadable({
  loader: () => import("./components/GeneralComponents/FreeDestinationCredits"),
  loading: () => <p>Cargando</p>,
});
const FriendlyAgency = Loadable({
  loader: () => import("./components/GeneralComponents/FriendlyAgency"),
  loading: () => <p>Cargando</p>,
});
const Hire123Seguros = Loadable({
  loader: () => import("./components/GeneralComponents/Hire123Seguros"),
  loading: () => <p>Cargando</p>,
});
const Inbox = Loadable({
  loader: () => import("./components/AccountComponents/Inbox"),
  loading: () => <p>Cargando</p>,
});
const Microsite = Loadable({
  loader: () => import("./components/GeneralComponents/Microsite"),
  loading: () => <p>Cargando</p>,
});
const PledgeCredits = Loadable({
  loader: () => import("./components/GeneralComponents/PledgeCredits"),
  loading: () => <p>Cargando</p>,
});
const PersonalShopper = Loadable({
  loader: () => import("./components/GeneralComponents/PersonalShopper"),
  loading: () => <p>Cargando</p>,
});
const PersonalShopperStepTwo = Loadable({
  loader: () =>
    import("./components/GeneralComponents/PersonalShopper/StepTwo"),
  loading: () => <p>Cargando</p>,
});
const PublicateWithoutRegister = Loadable({
  loader: () =>
    import("./components/GeneralComponents/PublicateWithoutRegister"),
  loading: () => <p>Cargando</p>,
});
const PublicateWithoutRegisterStepOne = Loadable({
  loader: () =>
    import("./components/GeneralComponents/PublicateWithoutRegister/StepOne"),
  loading: () => <p>Cargando</p>,
});
const PublicateWithoutRegisterStepTwo = Loadable({
  loader: () =>
    import("./components/GeneralComponents/PublicateWithoutRegister/StepTwo"),
  loading: () => <p>Cargando</p>,
});
const PublicateWithoutRegisterStepThree = Loadable({
  loader: () =>
    import("./components/GeneralComponents/PublicateWithoutRegister/StepThree"),
  loading: () => <p>Cargando</p>,
});
const PublicateWithoutRegisterStepFour = Loadable({
  loader: () =>
    import("./components/GeneralComponents/PublicateWithoutRegister/StepFour"),
  loading: () => <p>Cargando</p>,
});
const SuperAdminPublications = Loadable({
  loader: () => import("./components/AdminComponents/SuperAdminPublications"),
  loading: () => <p>Cargando</p>,
});
const SuperAdminInbox = Loadable({
  loader: () => import("./components/AdminComponents/SuperAdminInbox"),
  loading: () => <p>Cargando</p>,
});
const SuperAdminUsers = Loadable({
  loader: () => import("./components/AdminComponents/SuperAdminUsers"),
  loading: () => <p>Cargando</p>,
});
const SuperAdminRates = Loadable({
  loader: () => import("./components/AdminComponents/SuperAdminRates"),
  loading: () => <p>Cargando</p>,
});
const SuperAdminConsult = Loadable({
  loader: () => import("./components/AdminComponents/SuperAdminConsult"),
  loading: () => <p>Cargando</p>,
});
const SuperAdminAnalytics = Loadable({
  loader: () => import("./components/AdminComponents/SuperAdminAnalytics"),
  loading: () => <p>Cargando</p>,
});
const SuperAdminSliders = Loadable({
  loader: () => import("./components/AdminComponents/SuperAdminSliders"),
  loading: () => <p>Cargando</p>,
});
const SuperAdminMicrosite = Loadable({
  loader: () => import("./components/AdminComponents/SuperAdminMicrosite"),
  loading: () => <p>Cargando</p>,
});
const TermsAndConditions = Loadable({
  loader: () => import("./components/GeneralComponents/TermsAndConditions"),
  loading: () => <p>Cargando</p>,
});
const UserAdmin = Loadable({
  loader: () => import("./components/AccountComponents/UserAdmin"),
  loading: () => <p>Cargando</p>,
});
const UserConsult = Loadable({
  loader: () => import("./components/AccountComponents/UserConsult"),
  loading: () => <p>Cargando</p>,
});
const UserProfile = Loadable({
  loader: () => import("./components/AccountComponents/UserProfile"),
  loading: () => <p>Cargando</p>,
});
const UserInbox = Loadable({
  loader: () => import("./components/AccountComponents/UserInbox"),
  loading: () => <p>Cargando</p>,
});
const UserPublications = Loadable({
  loader: () => import("./components/AccountComponents/UserPublications"),
  loading: () => <p>Cargando</p>,
});
const UserRegister = Loadable({
  loader: () => import("./components/GeneralComponents/UserRegister"),
  loading: () => <p>Cargando</p>,
});
const UserRegisterStepOne = Loadable({
  loader: () => import("./components/GeneralComponents/UserRegister/StepOne"),
  loading: () => <p>Cargando</p>,
});
const UserRegisterStepTwo = Loadable({
  loader: () => import("./components/GeneralComponents/UserRegister/StepTwo"),
  loading: () => <p>Cargando</p>,
});
const UserRegisterStepThree = Loadable({
  loader: () => import("./components/GeneralComponents/UserRegister/StepThree"),
  loading: () => <p>Cargando</p>,
});
const WithoutRegister = Loadable({
  loader: () => import("./components/GeneralComponents/WithoutRegister"),
  loading: () => <p>Cargando</p>,
});
const SuperAdminAllMessages = Loadable({
  loader: () => import("./components/AdminComponents/SuperAdminAllMessages"),
  loading: () => <p>Cargando</p>,
});

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

class App extends Component {
  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_ANALYTICS);
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/searchCars" component={SearchCars} />
            <Route exact path="/agencyMicrosite" component={AgencyMicrosite} />
            <Route exact path="/agencyRegister" component={AgencyRegister} />
            <Route
              exact
              path="/agencyRegisterS1"
              component={AgencyRegisterStepOne}
            />
            <Route
              exact
              path="/agencyRegisterS2"
              component={AgencyRegisterStepTwo}
            />
            <Route
              exact
              path="/agencyRegisterS3"
              component={AgencyRegisterStepThree}
            />
            <Route exact path="/carDetail" component={CarDetail} />
            <Route
              exact
              path="/createPublication"
              component={CreatePublication}
            />
            <Route
              exact
              path="/createPublicationS1"
              component={CreatePublicationStepOne}
            />
            <Route
              exact
              path="/createPublicationS2"
              component={CreatePublicationStepTwo}
            />
            <Route
              exact
              path="/createPublicationS3"
              component={CreatePublicationStepThree}
            />
            <Route
              exact
              path="/freeDestinationCredits"
              component={FreeDestinationCredits}
            />
            <Route exact path="/friendlyAgency" component={FriendlyAgency} />
            <Route exact path="/hire123Seguros" component={Hire123Seguros} />
            <Route exact path="/inbox" component={Inbox} />
            <Route exact path="/microsite" component={Microsite} />
            <Route exact path="/pledgeCredits" component={PledgeCredits} />
            <Route
              exact
              path="/personalShopperS1"
              component={PersonalShopper}
            />
            <Route
              exact
              path="/personalShopperS2"
              component={PersonalShopperStepTwo}
            />
            <Route
              exact
              path="/publicateWithoutRegister"
              component={PublicateWithoutRegister}
            />
            <Route
              exact
              path="/publicateWithoutRegisterS1"
              component={PublicateWithoutRegisterStepOne}
            />
            <Route
              exact
              path="/publicateWithoutRegisterS2"
              component={PublicateWithoutRegisterStepTwo}
            />
            <Route
              exact
              path="/publicateWithoutRegisterS3"
              component={PublicateWithoutRegisterStepThree}
            />
            <Route
              exact
              path="/publicateWithoutRegisterS4"
              component={PublicateWithoutRegisterStepFour}
            />
            <Route
              exact
              path="/superAdminPublications"
              component={SuperAdminPublications}
            />
            <Route exact path="/superAdminInbox" component={SuperAdminInbox} />
            <Route
              exact
              path="/superAdminAllMessages"
              component={SuperAdminAllMessages}
            />
            <Route exact path="/superAdminUsers" component={SuperAdminUsers} />
            <Route exact path="/superAdminRates" component={SuperAdminRates} />
            <Route
              exact
              path="/superAdminAnalytics"
              component={SuperAdminAnalytics}
            />
            <Route
              exact
              path="/SuperAdminMicrosite"
              component={SuperAdminMicrosite}
            />
            <Route
              exact
              path="/superAdminSliders"
              component={SuperAdminSliders}
            />
            <Route
              exact
              path="/superAdminConsult"
              component={SuperAdminConsult}
            />
            <Route
              exact
              path="/termsAndConditions"
              component={TermsAndConditions}
            />
            <Route exact path="/userAdmin" component={UserAdmin} />
            <Route exact path="/userConsult" component={UserConsult} />
            <Route
              exact
              path="/userPublications"
              component={UserPublications}
            />
            <Route exact path="/userProfile" component={UserProfile} />
            <Route exact path="/userInbox" component={UserInbox} />
            <Route exact path="/userRegister" component={UserRegister} />
            <Route
              exact
              path="/userRegisterS1"
              component={UserRegisterStepOne}
            />
            <Route
              exact
              path="/userRegisterS2"
              component={UserRegisterStepTwo}
            />
            <Route
              exact
              path="/userRegisterS3"
              component={UserRegisterStepThree}
            />
            <Route exact path="/withoutRegister" component={WithoutRegister} />
            <Route exact path="/RecoverPassword" component={RecoverPassword} />
            <Redirect from="/admin" to="/superAdminPublications" />
            <Redirect
              from="/loginAdmin"
              to={{ pathname: "/login", state: "isAdmin" }}
            />
            <Route exact path="/login" component={LoginComponent} />
            <Route component={_404page} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
