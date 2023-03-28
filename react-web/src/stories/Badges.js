import React from 'react';
import { Badge } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */
/* eslint react/jsx-filename-extension: 0 */

export default props => props.filters.map(row => (
  <Badge color="primary">{row}{' '}
    <span className="icon is-small" onClick={props.handleDelete}>
      <i className="fa fa-close" aria-hidden="true" style={{ cursor: 'pointer' }} />
    </span>
  </Badge>
));
