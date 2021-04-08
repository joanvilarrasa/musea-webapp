//import AuthStore from '../../store/cold-storage/auth/index'

export const AuthDataProvider = (type,params,urlAPIAuth) => {

    switch (type) {

        case "LOGIN":
            console.log(params);
            break;
        case "LOGOUT":
            console.log(urlAPIAuth);
            break;
         

        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }

};
