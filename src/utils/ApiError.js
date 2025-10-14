// Custom Error Class for API-related errors

class ApiError extends Error {
    constructor(
        statusCode,                            // HTTP status code (e.g., 400, 404, 500)
        message = "Something went wrong !!!!",  // Default error message
        errors = [],                            // Additional error details (optional)
        stack = ""                              // Stack trace (optional)
    ){
            super(message)
            // Assigning custom properties to the error object
                this.statusCode = statusCode;   // HTTP status code for the error
                this.data = null;               // You can attach extra data if needed
                this.message = message;         // Error message
                this.success = false;           //  Indicates operation failed (not statusCode)
                this.errors = errors;           // Array of detailed error messages (optional)
                 // Handle stack trace — helps in debugging
                    if (stack) {
                        // If stack trace is manually provided, use it
                        this.stack = stack;
                    } else {
                        // Otherwise, automatically capture stack trace
                        Error.captureStackTrace(this, this.constructor);
                    }
        
    }
}
// Exporting the class so it can be used in other files
export { ApiError }