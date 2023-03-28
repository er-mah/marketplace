import React from 'react';
import { Modal, ModalHeader, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


export default props => (
  <div>
    <Modal
      isOpen={props.showNotificationModal}
      onClosed={props.handleClose}
      style={{ top: '100px', zIndex: '1060' }}
    >
      <ModalHeader closebutton="true" >
        {props.primaryText}
      </ModalHeader>
      <div className="modal-body">
        <div className="text-center">
          <p className="text-center">{props.secondaryText}</p>
        </div>
        <div className="text-center">
          <Button onClick={props.handleClose} color="primary">
            <span>{props.buttonName}</span>
          </Button>
        </div>
      </div>
    </Modal>
  </div>
);
