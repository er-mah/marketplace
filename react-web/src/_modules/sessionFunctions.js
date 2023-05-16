import decode from 'jwt-decode';
import { loadState } from './localStorage';

const isUserLogged = () => {
  if (loadState()) {
    return true;
  }
  return false;
};
const isAdminLogged = () => {
  if (loadState()) {
    if (decode(loadState().login.MAHtoken).userType === 'Admin') {
      return true;
    }
    return false;
  }
  return false;
};
const getUserDataFromToken = () => {
  if (loadState()) {
    if (loadState().login.MAHtoken) {
      return decode(loadState().login.MAHtoken);
    }
  }
  return false;
};

const clearSession = () => {
  localStorage.clear();
};


const getUserToken = () => (loadState() ? loadState().login.MAHtoken : null);
export { isUserLogged, getUserDataFromToken, clearSession, getUserToken, isAdminLogged };

