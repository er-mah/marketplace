import React, { Component } from "react";
import { split } from "split-object";
import { parse } from "query-string";
import { Modal, ModalHeader, ModalBody, Col, Row } from "reactstrap";
import _ from "lodash";

/* eslint react/jsx-filename-extension: 0 */

class FilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.items = this.items.bind(this);
    this.parseTitle = this.parseTitle.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  items(title, value, search, history) {
    return (
      <ul>
        {
        (title === "year" ||
        title === "modelName" ||
        title === "brand" ||
        title === "province" )
          ? _.orderBy(split(value), ["key"], ["desc"]).map((row, index) => (
              <li>
                {row.key !== "null" && (
                  <button
                    className={
                      index > 4 ? "sidebar-option hide" : "sidebar-option"
                    }
                    disabled={split(value).length === 1}
                    onClick={() =>
                      { console.log('entra');
                      history.push(`${search}&${title}=${row.key}`)
                      }
                    }
                  >
                    {row.key} <span className="quantity">({row.value})</span>
                  </button>
                )}
              </li>
            ))
          : split(value).map(row => (
              <li>
                {row.key !== "null" && (
                  <button
                    className="sidebar-option"
                    disabled={split(value).length === 1}
                    onClick={() =>
                      history.push(`${search}&${title}=${row.key}`)
                    }
                  >
                    {row.key} <span className="quantity">({row.value})</span>
                  </button>
                )}
              </li>
            ))}
        {title === "year" && (
          <li>
            <button
              className="sidebar-option"
              onClick={() => this.toggle("year")}
            >
              <strong>Ver más</strong>
            </button>
          </li>
        )}
        {title === "modelName" &&
          (parse(this.props.search).brand ||
            parse(this.props.search).text !== "") && (
            <li>
              <button
                className="sidebar-option"
                onClick={() => this.toggle("modelName")}
              >
                <strong>Ver más</strong>
              </button>
            </li>
          )}
        {title === "brand" && (
          <li>
            <button
              className="sidebar-option"
              onClick={() => this.toggle("brand")}
            >
              <strong>Ver más</strong>
            </button>
          </li>
        )}
        {title === "province" && (
          <li>
            <button
              className="sidebar-option"
              onClick={() => this.toggle("province")}
            >
              <strong>Ver más</strong>
            </button>
          </li>
        )}
      </ul>
    );
  }

  renderModal(modalData, title, value, search, history) {
    return (
      <Col md={12}>
        <Row>
          {title === modalData &&
            _.orderBy(split(value), ["key"], ["desc"]).map(
              (row, index) =>
                row.key !== "null" && (
                  <Col md={6} sm={12} xs={12}>
                    <button
                      className="modal-option"
                      disabled={split(value).length === 1}
                      onClick={() => {
                        this.toggle("year");
                        history.push(`${search}&${title}=${row.key}`);
                      }}
                    >
                      {row.key} <span className="quantity">({row.value})</span>
                    </button>
                  </Col>
                )
            )}
        </Row>
      </Col>
    );
  }

  parseTitle(title) {
    switch (title) {
      case "fuel":
        return "Combustible";
        break;
      case "year":
        return "Año";
        break;
      case "state":
        return "Estado de la publicación";
        break;
      case "userType":
        return "Tipo de Usuario";
        break;
      case "modelName":
        return "Modelo";
        break;
      case "brand":
        return "Marca";
        break;
      case "province":
        return "Provincia";
        break;
      default:
        return "";
    }
  }

  toggle(data) {
    this.setState({
      modal: !this.state.modal,
      modalData: data
    });
  }

  render() {
    return (
      // saca la marca en este split
      <div>
        {split(this.props.filters).map(row => {
          if (
            _.isUndefined(parse(this.props.search).brand) &&
            parse(this.props.search).text === "" &&
            row.key === "modelName"
          ) {
            return false;
          }
          return (
            <ul>
              <li className="sidebar-title">
                {" "}
                {this.parseTitle(row.key)}
                {this.items(
                  row.key,
                  row.value,
                  this.props.search,
                  this.props.history
                )}
              </li>
            </ul>
          );
        })}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Elige uno</ModalHeader>
          <ModalBody>
            {split(this.props.filters).map(row =>
              this.renderModal(
                this.state.modalData,
                row.key,
                row.value,
                this.props.search,
                this.props.history
              )
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default FilterList;
