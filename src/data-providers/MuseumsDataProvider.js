import axios from 'axios';

export const MuseumsDataProvider = (type,params,urlAPIMuseums) => {

    switch (type) {

        case "MUSEUMS":

            var uri = urlAPIMuseums + '/museums';
            var options = {
                method: 'GET',
                url: uri,
            }
            return axios(options).then((res) => {return res.data});
        
        case "MUSEUMS_CREATE":
            var uri2 = urlAPIMuseums + '/museums';
            var options2 = {
                method: 'POST',
                url: uri2,
                params: params,
            }
            return axios(options2).then((res) => {return res.data});

        case "MUSEUMS_DELETE":
            var uri2 = urlAPIMuseums + '/museums/'+ params;
            var options2 = {
                method: 'DELETE',
                url: uri2,
                params: params,
            }
            return axios(options2).then((res) => {return res.data});

        case "EXPOSITIONS":
            var uri3 = urlAPIMuseums + '/museums/'+params;
            var options3 = {
                method: 'GET',
                url: uri3, 
            }
            return axios(options3).then((res) => {return res.data});

        case "EXPO_CREATE":
            var uri2 = urlAPIMuseums + '/museums/'+params[1];
            var options2 = {
                method: 'POST',
                url: uri2,
                params: params[0],
            }
            console.log(options2)
            return axios(options2).then((res) => {return res.data});
        
        case "EXPO_DELETE":
            var uri2 = urlAPIMuseums + '/museums/'+params[1]+'/'+parmas[0];
            var options2 = {
                method: 'DELETE',
                url: uri2,
                params: params[0],
            }
            console.log(options2)
            return axios(options2).then((res) => {return res.data});


        case "OBRES":
            var uri3 = urlAPIMuseums + '/museums/'+params[0]+'/'+params[1];
            var options3 = {
                method: 'GET',
                url: uri3, 
            }
            return axios(options3).then((res) => {return res.data});

        case "OBRA_CREATE":
            var uri2 = urlAPIMuseums + '/museums/'+params[1]+'/'+params[2];
            var options2 = {
                method: 'POST',
                url: uri2,
                params: params[0],
            }
            
            return axios(options2).then((res) => {return res.data});
        
        case "OBRA_DELETE":
            var uri2 = urlAPIMuseums + '/museums/'+params[1]+'/'+params[2] +'/' + params[0];
            var options2 = {
                method: 'DELETE',
                url: uri2,
                params: params[0],
            }
            
            return axios(options2).then((res) => {return res.data});

        case "OBRA_EDIT":
            var uri2 = urlAPIMuseums + '/museums/'+params[1]+'/'+params[2] +'/' + params[3];
            var options2 = {
                method: 'PUT',
                url: uri2,
                params: params[0],
            }
            return axios(options2).then((res) => {return res.data});

        default:
            console.log(params);
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }

};
