
export default class AppError extends Error {

    constructor(private code: number, message: string) {
        super(message);
        this.code = code;

        Error.captureStackTrace(this, this.constructor);
    }
}
