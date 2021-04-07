function getToken() {
    return localStorage.getItem('token');
}
function setToken(newToken) {
    localStorage.setItem('token', newToken);
}
function deleteToken() {
    localStorage.removeItem('token');
}

function isAuthenticated() {
    let currentToken = getToken();
    console.log(currentToken);
    // return true if the token stored in localStorage is valid 
}

function clearAuthData() {
    deleteToken();
}

export default {
    setToken: setToken,
    isAuthenticated: isAuthenticated,
    clearAuthData: clearAuthData,
}