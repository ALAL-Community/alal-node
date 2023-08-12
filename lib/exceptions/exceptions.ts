class AlalBadKeyError extends Error {
    constructor(message = "API Key is not set") {
        super(message); 
        this.name = "AlalBadKeyError"; 
    }
}

class AlalRequiredParamError extends Error {
    constructor(message:string) {
      super(message); 
      this.name = "AlalRequiredParamError"; 
    }
}

class AlalServerError extends Error {
    code: number;
    constructor(errorMessage:string) {
        super();
        this.name = "AlalServerError"; 
        this.code = 500
        this.message = JSON.stringify({code: this.code, message: errorMessage})  
    }
}

class AlalUnauthorizedError extends Error {
    code: number;
    constructor(errorMessage:string) {
        super(); 
        this.name = "AlalUnauthorizedError"; 
        this.code = 401
        this.message = JSON.stringify({code: this.code, message: errorMessage})
    }
}

class AlalQueryError extends Error {
    code: number;
    constructor(errorMessage:string) {
        super(); 
        this.name = "AlalQueryError"; 
        this.code = 404
        this.message = JSON.stringify({code: this.code, message: errorMessage})
    }
}

class AlalRateLimitError extends Error {
    code: number;
    constructor(errorMessage:string) {
        super(); 
        this.name = "AlalRateLimitError"; 
        this.code = 429
        this.message = JSON.stringify({code: this.code, message: errorMessage})
    }
}

class AlalBadRequestError extends Error {
    code: number;
    constructor(errorMessage:string) {
        super(); 
        this.name = "AlalBadRequestError"; 
        this.code = 400
        this.message = JSON.stringify({code: this.code, message: errorMessage})
    }
}

export {
    AlalBadKeyError, 
    AlalRequiredParamError, 
    AlalServerError, 
    AlalUnauthorizedError, 
    AlalQueryError, 
    AlalRateLimitError, 
    AlalBadRequestError,
}