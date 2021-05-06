import axios from 'axios';

export const QuizzesDataProvider = (type,params,urlAPIMuseums) => {

    switch (type) {

        case "QUIZZES":
            var uri = urlAPIMuseums + '/quizzes';
            var options = {
                method: 'GET',
                url: uri,
            }
            return axios(options).then((res) => {return res.data});

        case "QUIZZES_CREATE":
            var uri2 = urlAPIMuseums + '/quizzes';
            var body={params};
            var options2 = {
                method: 'POST',
                url: uri2,
                data: {body},
            }
            return uri2
            //return axios(options2).then((res) => {return res.data});

        case "QUIZZES_DELETE":
            var uri2 = urlAPIMuseums + '/quizzes/'+ params;
            console.log(uri2)
            var options2 = {
                method: 'DELETE',
                url: uri2, 
            }
            return axios(options2).then((res) => {return res.data});

        case "QUIZZES_EDIT":
            var uri2 = urlAPIMuseums + '/quizzes/'+params[1];
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
