import axios, { AxiosRequestConfig } from 'axios';
import logger from '@utils/logger';

const externalApi = axios.create({
    baseURL: '',
    headers: {
        Accept: 'application/json, text/plain, */*',
    },
});

const logRequest = (req: AxiosRequestConfig) => {
    logger.info('external api request in progress:', {
        httpMethod: req.method,
        url: req.url,
        params: req.params || 'none',
        date: new Date().toISOString(),
    });
};

const logResponse = (req: AxiosRequestConfig) => {
    logger.info('external api request done:', {
        httpMethod: req.method,
        url: req.url,
        params: req.params || 'none',
        date: new Date().toISOString(),
    });
};

// log requests
// we also use interceptors if we want to add some token based mecanism to our requests
externalApi.interceptors.request.use(
    async (request) => {
        logRequest(request);
        return request;
    },
    (error) => {
        logger.error('external api request: ', error);
        Promise.reject(error);
    },
);

// interceptor to response
// if error is unauthorized we need to get the correct authentification headers and include them in
// the request before sending it again, in our case we won't use authentification
externalApi.interceptors.response.use(
    (response) => {
        logResponse(response);
        return response;
    },
    async (error) => {
        const { config: originalRequest, response } = error;
        logger.error('external api response:', error);
        // Unauthorized
        if (response.status === 401 && !originalRequest._retry) {
            logger.error('external api anauthorized');
            /* pseudo code is like this : 
            originalRequest._retry = true;
            const token = await requestToken();
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);*/
        }
        return Promise.reject(error);
    },
);

export default externalApi;
