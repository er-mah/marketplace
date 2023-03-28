import React, { Component } from 'react';
import { Button, Col } from 'reactstrap';
import { getUserDataFromToken } from '../modules/sessionFunctions';
/* eslint react/jsx-filename-extension: 0 */

export default ({ history, location }) => (
  <Col md="12" className="sidebar-user" >
    <ul>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/userAdmin' ? 'active' : ''} onClick={() => history.push('/userAdmin')} >Inicio</Button>
      </li>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/userPublications' ? 'active' : ''} onClick={() => history.push('/userPublications')} >Tus publicaciones</Button>
      </li>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/userConsult' ? 'active' : ''} onClick={() => history.push('/userConsult')} >Consultar precios</Button>
      </li>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/userInbox' ? 'active' : ''} onClick={() => history.push('/userInbox')} >Bandeja de entrada</Button>
      </li>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/userProfile' ? 'active' : ''} onClick={() => history.push('/userProfile')} >Perfil</Button>
      </li>
      <li>
        {getUserDataFromToken().userType === 'Agencia' && <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/agencyMicrosite' ? 'active' : ''} onClick={() => history.push('/agencyMicrosite')} >Micrositio</Button>}
      </li>
      <Button style={{ cursor: 'pointer' }} color="primary" className={location.pathname === '/createPublication' ? 'active' : ''} onClick={() => history.push('/createPublication')} >Crear publicación</Button>
    </ul>
  </Col>
);

