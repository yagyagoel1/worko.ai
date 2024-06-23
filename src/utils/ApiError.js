class ApiError {
    constructor(status, message = "Something went Wrong",
        errors = [], data = null) {
        this.status = status;
        this.message = message;
        this.errors = errors;
        this.success = false;
        this.data = data;
    }
}

export default ApiError;