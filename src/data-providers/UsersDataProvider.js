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
            return axios(options).then((res) => {
                return res.data});

        case "USER_DELETE":
            var uri2 = urlAPIMuseums + '/users/'+ params;
            console.log(uri2)
            var options2 = {
                method: 'DELETE',
                url: uri2,
               
            }
            return axios(options2).then((res) => {return res.data});
        
        case "USER_BAN":
            var uri2= urlAPIMuseums + '/users/'+ params +'/ban';
            console.log(uri2)
            var options2 = {
                method: 'POST',
                url: uri2,
            }
            return axios(options2).then((res) => {return res.data});

        case "USER_UNBAN":
            var uri2= urlAPIMuseums + '/users/'+ params +'/unban';
            console.log(uri2)
            var options2 = {
                method: 'POST',
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
        
        case "USER_LIKES":
            var uri = urlAPIMuseums+'/users/'+params+'/likes';
            var options = {
                method: 'GET',
                url: uri,
            }
            return axios(options).then((res) => { return res.data });
        
        case "USER_FAVS":
            var uri = urlAPIMuseums+'/users/'+params+'/favourites';
            var options = {
                method: 'GET',
                url: uri,
            }
            return axios(options).then((res) => { return res.data });
        
        case "USER_VISITED":
            var uri = urlAPIMuseums+'/users/'+params+'/visited';
            var options = {
                method: 'GET',
                url: uri,
            }
            return axios(options).then((res) => { return res.data });

        case "USER_POINTS":
            var uri = urlAPIMuseums+'/users/'+params+'/points';
            var options = {
                method: 'GET',
                url: uri,
            }
            return axios(options).then((res) => { return res.data });

        default:
            console.log(params);
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }

};
