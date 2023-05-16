export default (type, value) => {
    let re = '';
    let errorMessage = '';

    switch (type) {
      case 'email':
        re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        errorMessage = 'Por favor, ingrese un correo válido.';
        break;

      case 'string':
        re = /^[a-z A-Z \s ñÑáéíóúÁÉÍÓÚ]*$/;
        errorMessage = 'Por favor, ingrese solo letras';
        break;

      case 'numeric':
        re = /^\d+$/;
        errorMessage = 'Por favor, ingrese solo números';
        break;
      case 'float':
        re = /^-?\d*(\,\d+)?$/;
        errorMessage = 'Requerido, separe los decimales con coma';
        break;

      case 'mapAddress':
        re = /^[a-zA-Z0-9]*$/;
        errorMessage = 'Datos inválidos';
        break;

      case 'longitude':
        re = /[-+]?([0-9]*\.[0-9]+|[0-9]+)/;
        errorMessage = 'La longitud ingresada tiene el formato erróneo';
        break;

      case 'telephone':
        re = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g;
        errorMessage = 'Por favor ingrese un número de teléfono válido';
        break;

      case 'password':
        re = /^/;
        break;

      case 'latitude':
        re = /[-+]?([0-9]*\.[0-9]+|[0-9]+)/;
        errorMessage = 'La latitud ingresada tiene el formato erróneo';
        break;

      case 'url':
        re = /((http[s]?:)\/\/)?([^?:\/#]+)(:([0-9]+))?(\/[^?#]*)?(\?([^#]*))?(#.*)?/; // eslint-disable-line
        errorMessage = 'La url ingresada tiene el formato erróneo';
        break;
      case 'alphanumeric':
        re = /^[a-zA-Z 0-9 ñÑáéíóúÁÉÍÓÚ .\-]*$/;
        errorMessage = 'Datos inválidos, Solo numeros, letras y guiones medios ';
        break;
      default:
        break;
    }

    if (re.test(value) === true) {
      return {valid: true, message: ''}
    } else {
      return {valid: false, message: errorMessage}
    }
  }
