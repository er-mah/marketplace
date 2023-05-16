import _ from 'lodash';
import { server } from './params';
import { loadState } from './localStorage';
import { split } from 'split-object';


/**
 * Este código es un módulo de Javascript que exporta varias funciones que se utilizan para interactuar con una API web.
 * Las funciones exportadas incluyen métodos para iniciar sesión, registrar usuarios, solicitar crédito, recuperar y
 * cambiar contraseñas, y actualizar contraseñas.
 *
 */


let token = '';

if (loadState()) {
  token = `Bearer ${loadState().login.MAHtoken}`;
}

// Account --------------------
export const login = (email, password) => {
  const url = `${server}/login`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (_.isUndefined(responseData.status) || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const loginAdmin = (email, password) => {
  const url = `${server}/loginAdmin`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (_.isUndefined(responseData.status) || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const checkFacebookLogin = (email) => {
  const url = `${server}/checkFacebookLogin/${email}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (_.isUndefined(responseData.status) || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const loginOrRegisterFacebook = (data) => {
  const url = `${server}/loginOrRegisterFacebook`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  };

  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (_.isUndefined(responseData.status) || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const registerUser = (data) => {
  const url = `${server}/registerUser`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (_.isUndefined(responseData.status) || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const registerAgency = (data) => {
  const url = `${server}/registerAgency`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (_.isUndefined(responseData.status) || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const recoverPassword = (email) => {
  const url = `${server}/recoverPassword`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  };

  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (_.isUndefined(responseData.status) || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const changePassword = (userId, newPassword) => {
  const url = `${server}/changePassword`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      userId,
      newPassword,
    }),
  };

  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (_.isUndefined(responseData.status) || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const updatePassword = (data) => {
  if (loadState()) {
    token = `Bearer ${loadState().login.MAHtoken}`;
  }
  const url = `${server}/updatePassword`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      previousPassword: data.previousPassword,
      newPassword: data.newPassword,
    }),
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const requestCredit = (data) => {
  const url = `${server}/requestCredit`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const uploadAgencyImages = (profileImage, bannerImage, id) => {
  const url = `${server}/uploadAgencyImages/${id}`;
  const formData = new FormData();

  formData.append('profileImage', profileImage);
  formData.append('bannerImage', bannerImage);

  const options = {
    method: 'POST',
    headers: {
      mimeType: 'multipart/form-data',
      Authorization: token,
    },
    body: formData,
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const editPublicationWithoutImages = (dataPublication) => {
  const url = `${server}/editPublication`;
  const formData = new FormData();
  split(dataPublication).map(item => formData.append(item.key, item.value));
  const options = {
    method: 'POST',
    headers: {
      mimeType: 'multipart/form-data',
      Authorization: token,
    },
    body: formData,
  };
  if (!token) {
    delete options.headers.Authorization;
  }
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};

export const getSoldPublications = () => {
  if (loadState()) {
    token = `Bearer ${loadState().login.MAHtoken}`;
  }
  const url = `${server}/getSoldPublications`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};

export const getProvinces = () => {
  if (loadState()) {
    token = `Bearer ${loadState().login.MAHtoken}`;
  }
  const url = `${server}/getProvinces`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const getTowns = (province_id) => {
  const url = `${server}/getTowns`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      province_id,
    }),
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const getImages = (publication_id) => {
  if (loadState()) {
    token = `Bearer ${loadState().login.MAHtoken}`;
  }
  const url = `${server}/getImages/${publication_id}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
export const uploadSliders = (dataSlider) => {
  const url = `${server}/uploadSliders`;
  const formData = new FormData();
  formData.append('sliderNumber', dataSlider.sliderNumber);
  formData.append('slider', dataSlider.slider);
  formData.append('sliderResponsive', dataSlider.sliderResponsive);

  const options = {
    method: 'POST',
    headers: {
      mimeType: 'multipart/form-data',
      Authorization: token,
    },
    body: formData,
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};

export const getSliders = () => {
  const url = `${server}/getSliders`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};

export const deleteSlider = (number) => {
  const url = `${server}/deleteSlider/${number}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};

export const addUserAndCarData = (data) => {
  const url = `${server}/addUserAndCarData`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(responseData =>
      (responseData.status === undefined || responseData.status === 'error'
        ? Promise.reject(responseData.message)
        : responseData));
};
