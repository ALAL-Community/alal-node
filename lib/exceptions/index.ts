import { 
    AlalBadKeyError, 
    AlalRequiredParamError, 
    AlalServerError, 
    AlalUnauthorizedError, 
    AlalQueryError, 
    AlalRateLimitError, 
    AlalBadRequestError,
} from './exceptions';

const errorClass:any = {
    400: AlalBadRequestError,
    500: AlalServerError,
    401: AlalUnauthorizedError,
    429: AlalRateLimitError,
    404: AlalQueryError,
}

export {
    errorClass,
    AlalBadKeyError, 
    AlalRequiredParamError,
};