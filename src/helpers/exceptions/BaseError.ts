// * Operational errors are part of the runtime and application
// * while programmer errors are bugs we introduce in our codebase
export default class BaseError extends Error {
    isOperational: boolean;
    statusCode: number;

    constructor(name: string, statusCode: number, message: string, isOperational: boolean, description: string) {
        super(description);

        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
