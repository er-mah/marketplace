export default (error) => {
  if ((error && error.toString().indexOf('Failed to fetch') !== -1 )|| (error && error.toString().indexOf('NetworkError') !== -1)) {
    return {
      title: 'Error de conexión',
      message: 'Error de conexión, inténtelo más tarde.',
    };
  }
  if (error && error.toString().indexOf('jwt expired') !== -1) {
    return {
      title: 'Su sesión expiró',
      message: 'Por favor, inicia sesión nuevamente.',
    };
  }
  if (
    typeof error === 'object' &&
    error.name.indexOf('SequelizeConnection') !== -1
  ) {
    console.log(error);
    return {
      title: 'Ha ocurrido un error',
      message: 'Error de conexión con la base de datos, contáctese con el desarrollador.',
    };
  }
  if (typeof error === 'object') {
    console.log(error);
  }
  return {
    title: 'Error',
    message: error,
  };
};
