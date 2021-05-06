import axios from 'axios';

export const UsersDataProvider = (type,params,urlAPIMuseums) => {

    switch (type) {

        case "USERS":
            var uri = urlAPIMuseums + '/users';
            var options = {
                method: 'GET',
                url: uri,
            }
            return axios(options).then((res) => {return res.data});
        
        case "USER_INFO":
            var uri = urlAPIMuseums + '/users/'+params;
            var options = {
                method: 'GET',
                url: uri,
            }
            console.log(uri)
            return axios(options).then((res) => {
                console.log(res)
                return res.data});

        case "USER_DELETE":
            var uri2 = urlAPIMuseums + '/users/'+ params;
            console.log(uri2)
            var options2 = {
                method: 'DELETE',
                url: uri2,
               
            }
            return axios(options2).then((res) => {return res.data});

        case "USER_EDIT":
            var uri2 = urlAPIMuseums + '/users/'+params[1];
            var options2 = {
                method: 'PUT',
                url: uri2,
                params: params[0],
            }
            console.log(uri2)
            return axios(options2).then((res) => {return res.data});
        
        

        default:
            console.log(params);
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }

};
