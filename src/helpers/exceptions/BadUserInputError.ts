import httpStatus from 'http-status';
import BaseError from './BaseError';

export default class BadUserInputError extends BaseError {
    constructor(name: string) {
        super(name, httpStatus.BAD_REQUEST, 'test message', true, 'invalid user input');
    }
}
