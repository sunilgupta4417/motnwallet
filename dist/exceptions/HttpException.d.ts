import { HttpError } from 'routing-controllers';
export declare class HttpException extends HttpError {
    status: number;
    message: string;
    constructor(status: number, message: string);
}
