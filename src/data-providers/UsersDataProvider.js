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
        
        

        default:
            console.log(params);
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }

};
