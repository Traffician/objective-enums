import NotAnElementOf from './NotAnElementOf';

/**
 * Creates a class of enum's element. 
 * 
 * @param {string} parentName Name used to build element's name
 * @returns {class}
 */
const createElementClass = parentName => {
    const result = class extends Number {
        name = null;
        value = 0;

        constructor(name, value, i) {
            super(1 << i);
            this.value = value;
            this.name = name;
        }

        toString() {
            return this.name;
        }
    }

    Object.defineProperty(result, 'name', { value: parentName + 'Element' });
    return result;
}

/**
 * Enum class.
 * 
 * @class Enum
 */
class Enum {
    /**
     * Creates an instance of Enum.
     * 
     * @param {...string|string[]} values 
     * @memberof Enum
     */
    constructor(...values) {
        const elementClass = createElementClass(this.constructor.name);

        if (values.length === 1 && typeof values[0] === "object") {
            values = values[0];
        }

        if (values instanceof Array) {
            values = values.reduce((array, name, i) => {
                array[name] = i + 1;
                return array;
            }, {})
        }

        let index = 0;
        for (let name in values) {
            if (!values.hasOwnProperty(name)) {
                continue;
            }

            const value = values[name];
            Object.defineProperty(this, name, {
                configurable: false,
                enumerable: true,
                writable: false,
                value: new elementClass(name, value, index++)
            });
        }
    }

    /**
     * Returns the names of items contained by flags
     * 
     * @param {number} flags Single enum element or flags
     * @returns {string[]} Array of elements' names
     * @memberof Enum
     */
    match(flags) {
        let results = [];
        for (let name in this) {
            if (!this.hasOwnProperty(name)) {
                continue;
            }

            if (this.hasFlag(flags, name)) {
                results.push(name);
            }
        }
        return results;
    }

    /**
     * Checks if collection of flags contains element
     * 
     * @param {number} flags Enum flags
     * @param {number|string} element Single enum element
     * @returns {boolean} True if flags contains element
     * @memberof Enum
     */
    hasFlag(flags, element) {
        let value = null;
        if (isNaN(element)) {
            element = element.toString();
            if (this.hasOwnProperty(element)) {
                value = 0 + this[element];
            }
        } else {
            value = 0 + element;
        }

        if (typeof value !== "number") {
            throw new NotAnElementOf(`${element} is not a child element of ${this.constructor.name}`);
        }

        return (flags & value) === value;
    }

    /**
     * Checks if both collection of flags have common elements.
     * 
     * @param {number} flags1 First collection of flags
     * @param {number} flags2 Second collection of flags
     * @returns {boolean}
     * @memberof Enum
     */
    hasIntersections(flags1, flags2) {
        return (flags1 & flags2) !== 0;
    }

    /**
     * Returns names of elements common to both collections of flags.
     * 
     * @param {number} flags1 First collection of flags
     * @param {number} flags2 Second collection of flags
     * @returns {string[]} Array of element's names
     * @memberof Enum
     */
    intersect(flags1, flags2) {
        return this.match(flags1 & flags2);
    }
}

export default Enum;