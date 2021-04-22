import axios from 'axios';
function getToken() {
    return localStorage.getItem('token');
}
function setToken(newToken) {
    localStorage.setItem('token', newToken);
}
function clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    delete axios.defaults.headers.common['Authorization'];
}
function setExpirationDate(newDate) {
    localStorage.setItem('expirationDate', newDate);
}
function getExpirationDate() {
    return parseInt(localStorage.getItem('expirationDate'));
}

function isAuthenticated() {
    if(isNaN(getExpirationDate()) || new Date().getTime() > getExpirationDate()) {
        delete axios.defaults.headers.common['Authorization'];
        clearAuthData();
        return false
    }
    return true;
}

export default {
    setToken: setToken,
    isAuthenticated: isAuthenticated,
    clearAuthData: clearAuthData,
    setExpirationDate: setExpirationDate,
    getExpirationDate: getExpirationDate
}