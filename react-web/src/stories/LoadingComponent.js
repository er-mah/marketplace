import React from 'react';
/* eslint react/jsx-filename-extension: 0 */

const LoadingComponent = () => (
  <div>
    <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
      <img src="/logo.png" alt="Cargando..." />
    </div>
    <img
      src="/assets/utils/loader.gif"
      alt="..."
      style={{
        position:'absolute',
        zIndex: '2',
        top: '200px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
      }}
    />
  </div>

);
export default LoadingComponent;
