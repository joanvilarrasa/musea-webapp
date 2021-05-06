import {AuthDataProvider} from './AuthDataProvider';
import {MuseumsDataProvider} from './MuseumsDataProvider';
import{QuizzesDataProvider} from './QuizzesDataProvider';
import{UsersDataProvider} from './UsersDataProvider';
import{ QuizzesDataProvider } from './QuizzesDataProvider';
//const urlAPIGateway = process.env.VUE_APP_API;

const urlAPIAuth = "https://musea-authorization-server.herokuapp.com"
const urlAPIMuseums = "https://musea-api.herokuapp.com"

let data = null;

export const DataProvider = (providerType, type, params) => {
   
    switch (providerType) {

        case "MUSEUMS":
            data = MuseumsDataProvider(type,params,urlAPIMuseums);
            break;
        
        case "USERS":
            data = UsersDataProvider(type,params,urlAPIMuseums);
            break;

        case "AUTH":
            data = AuthDataProvider(type,params,urlAPIAuth);
            break;

        case "QUIZZES":
            data = QuizzesDataProvider(type,params,urlAPIMuseums);
            break;

        default:
            break;
    }

    return data;
    //    .catch((e) => {
    //    if (e.response) {
    //        if(e.response.status == 401) {
    //            AuthDataProvider("LOGOUT", {}, baseAPIurl);
    //        }
    //    }
    //});

};
