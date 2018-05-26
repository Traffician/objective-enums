/**
 * Error throwed when value is not a child element of object
 * 
 * @class NotAnElementOf
 * @extends {TypeError}
 */
class NotAnElementOf extends TypeError {
    constructor(message = "Value is not a child element of...", ...args) {
        super(message, ...args);
        Object.defineProperty(this, "name", {
            value: this.constructor.name
        });
        Error.captureStackTrace(this, this.constructor);
    }
}

export default NotAnElementOf;