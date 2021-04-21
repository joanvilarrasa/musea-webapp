import axios from 'axios';
import AuthStore from '@/store-cold/auth/index.js'

export const AuthDataProvider = (type,params,urlAPIAuth) => {

    switch (type) {

        case "LOGIN":
            let uri = urlAPIAuth + '/oauth/token';
            let data = new FormData();
            data.append('grant_type', 'password');
            data.append('username', params.username);
            data.append('password', params.password);
            let options = {
                method: 'POST',
                url: uri,
                auth: {
                    username: 'mobile',
                    password: 'mobilePass'
                },
                data: data,
            }
            return axios(options).then((res) => {
                let uri2 = urlAPIAuth + '/oauth/check_token';
                let token = {token: res.data.access_token};
                let options2 = {
                    method: 'GET',
                    url: uri2,
                    auth: {
                        username: 'mobile',
                        password: 'mobilePass'
                    },
                    params: token,
                }
                return axios(options2).then((res2) => {
                    if(res2.data.authorities.includes("ROLE_ADMIN")) {
                        AuthStore.setToken(res.data.access_token);
                        AuthStore.setExpirationDate(new Date().getTime() + parseInt(res.data.expires_in)*1000);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                    }
                    return res2.data;
                })
            }).catch((error) => {
                console.log(error);
            });
        case "LOGOUT":
            console.log(urlAPIAuth);
            break;
         

        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }

};
