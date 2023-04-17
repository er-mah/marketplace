/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { GoogleProvider, GoogleDataChart } from "react-analytics-widget";
import AdminBar from "../../../pages/old/AdminBar";
import SuperAdminSideBar from "../../../pages/old/SuperAdminSideBar";
import { getUserToken } from "../../../modules/sessionFunctions";

(function(w, d, s, g, js, fjs) {
  g = w.gapi || (w.gapi = {});
  g.analytics = {
    q: [],
    ready: function(cb) {
      this.q.push(cb);
    }
  };

  js = d.createElement(s);
  fjs = d.getElementsByTagName(s)[0];
  js.src = "https://apis.google.com/js/platform.js";
  fjs.parentNode.insertBefore(js, fjs);
  js.onload = function() {
    g.load("analytics");
  };
})(window, document, "script");

const pages = {
  reportType: "ga",
  query: {
    dimensions: "ga:pageTitle",
    metrics: "ga:uniquePageviews",
    sort: "-ga:uniquePageviews",
    "max-results": "10",
    "start-date": "30daysAgo",
    "end-date": "yesterday"
  },
  chart: {
    type: "TABLE",
    title: "Páginas más visitadas - Últimos 30 días",
    container: "main-chart-container",
    options: {
      width: "90%"
    },
  }
};
const events = {
  reportType: "ga",
  query: {
    dimensions: "ga:eventAction",
    metrics: "ga:uniqueEvents",
    sort: "-ga:uniqueEvents",
    "max-results": "10",
    "start-date": "30daysAgo",
    "end-date": "yesterday"
  },
  chart: {
    type: "TABLE",
    title: "Eventos principales - Últimos 30 días",
    container: "main-chart-container",
    options: {
      width: "90%"
    },
  }
};
const other = {
  reportType: "ga",
  query: {
    dimensions: "ga:date",
    metrics: "ga:pageviews",
    "start-date": "7daysAgo",
    "end-date": "yesterday"
  },
  chart: {
    type: "LINE"
  }
};

const last7days = {
  reportType: "ga",
  query: {
    dimensions: "ga:date",
    metrics: "ga:pageviews",
    "start-date": "7daysAgo",
    "end-date": "yesterday"
  },
  chart: {
    type: "LINE"
  }
};

const paises = {
  reportType: "ga",
  query: {
    metrics: "ga:sessions",
    dimensions: "ga:country",
    "start-date": "30daysAgo",
    "end-date": "yesterday",
    "max-results": 6,
    sort: "-ga:sessions"
  },
  chart: {
    container: "chart-1-container",
    type: "GEO",
    options: {
      width: "100%",
      pieHole: 4 / 9
    }
  }
};
const browsers = {
  reportType: "ga",
  query: {
    dimensions: "ga:browser",
    metrics: "ga:sessions",
    sort: "-ga:sessions",
    "max-results": "6"
  },
  chart: {
    type: "TABLE",
    container: "main-chart-container",
    options: {
      width: "100%"
    }
  }
};
const newUsers = {
  reportType: "ga",
  query: {
    dimensions: "ga:browser",
    metrics: "ga:sessions",
    sort: "-ga:sessions",
    "max-results": "6"
  },
  chart: {
    type: "TABLE",
    container: "main-chart-container",
    options: {
      width: "100%"
    }
  }
};

// analytics views ID
const views = {
  query: {
    ids: "ga:146770504"
  }
};

export default class SuperAdminAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      token: ""
    };
  }
  componentDidMount = () => {
    const request = new Request(`${process.env.REACT_APP_API}/getToken`, {
      method: "GET",
      headers: { Authorization: `Bearer ${getUserToken()}` }
    });
    fetch(request)
      .then(response => response.json())
      .then(({ message }) => {
        this.setState({ token: message[0], fetched: true }); // TODO: handle errors
      })
      .catch((error) => {
        console.log(error)
      });
  };
  render() {
    const { location, history } = this.props;
    return (
      <div>
        <AdminBar history={history} />
        <div className="container-fluid">
          <Row>
            <Col lg="3" md="12">
              <SuperAdminSideBar history={history} location={location} />
            </Col>
            <Col lg="9" md="12">
              {this.state.fetched && (
                <GoogleProvider accessToken={this.state.token}>
                  <h4>Países</h4><h5>Ultimos 30 días</h5>
                  <GoogleDataChart views={views} config={paises} /><br/><br/>
                  <h4>Navegadores</h4><h5>Ultimos 30 días</h5>
                  <GoogleDataChart views={views} config={browsers} /><br/><br/>
                  <h4>Eventos únicos</h4><h5>Ultimos 30 días</h5>                  
                  <GoogleDataChart views={views} config={events} /><br/><br/>
                  <h4>Visitas</h4><h5>Ultimos 30 días</h5>                                    
                  <GoogleDataChart views={views} config={other} /><br/><br/>
                  <h4>Visitas a páginas</h4><h5>Ultimos 30 días</h5>                                                      
                  <GoogleDataChart views={views} config={pages} />
                </GoogleProvider>
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
