import React from 'react';
import { Breadcrumb, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default ({ history }) => (
  <div>
    <Breadcrumb><Button color="link" onClick={() => history.goBack()}>{'< VOLVER'}</Button></Breadcrumb>
  </div>
);

