import React from 'react';
/* eslint react/jsx-filename-extension: 0 */

export default (props) => {
  if (props.admin) {
    return <p className="m-15">Hay en curso {props.totalMsg} cadenas de mensajes.</p>;
  }
  return props.results === 1 ?
    (<p className="m-15">Tienes {props.results} mensaje sin leer. De {props.totalMsg} en total.</p>)
    :
    (<p className="m-15">Tienes {props.results} mensajes sin leer. De {props.totalMsg} en total.</p>);
};

