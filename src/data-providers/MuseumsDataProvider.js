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

        default:
            console.log(params);
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }

};
