class ErrorResponse extends Error {
    private statusCode: number;
    constructor(message: string, statusCode: number,) {
        super(message);
        // this.name = name;
        this.statusCode = statusCode;
    }
}

export = ErrorResponse