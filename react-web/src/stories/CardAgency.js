import React from 'react';
/* eslint react/jsx-filename-extension: 0 */

const CardAgency = ({ data, history }) => (
  <div className="box-item-horizontal col-md-12" onClick={() => { history.push(`/microsite?concesionaria=${data.agencyName}&c_id=${data.id}`); }} >
    <div className="row" >
      <div
        className="col-md-4 col-sm-12"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_API}/images/${data.profileImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '100%',
          height: '182px',
        }}
      />
      <div className="col-md-8 col-sm-12">
        <h4 className="truncate" >{data.agencyName}</h4>
        <div className="data-input-group">
          <label>DOMICILIO</label>
          <p>{data.agencyAdress}</p>
        </div>
        <div className="data-input-group">
          <label>TELÉFONO</label>
          <p>{data.agencyPhone} / {data.phone}</p>
        </div>
        <div className="data-input-group">
          <label>EMAIL</label>
          <p className="truncate">{data.agencyEmail}</p>
        </div>
      </div>
    </div>
  </div>
);

export default CardAgency;
