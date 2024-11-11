/**
 * @param {any} value - The value to be validated
 * 
 * @returns True if validation passes, false otherwise
 */
const validation = value => {

    /* Store a copy of the value passed in */
    let val = value;

    /* Store the result */
    let result = true;

    /* Chained methods */
    return {

        /* Checks if the value is a string */
        isString() {
            if(typeof val === 'string'){
                return this;
            } else {
                throw Error(`[ValidationError] Not a string`);
            }
        },

        /* Checks if the value is a number */
        isNumber() {

            if(typeof val === 'number'){
                return this;
            } else {
                throw Error(`[ValidationError] Not a number`);
            }

        },

        /* Is the value a boolean */
        isBool() {
            if(typeof val === 'boolean'){
                return this;
            } else {
                throw Error(`[ValidationError] Not a boolean`);
            }
        },

         /* Is the value a bigint */
         isBigInt() {
            if(typeof val === 'bigint'){
                return this;
            } else {
                throw Error(`[ValidationError] Not a bigint`);
            }

        },

         /* Is the value a symbol */
         isSymbol() {
            if(typeof val === 'symbol'){
                return this;
            } else {
                throw Error(`[ValidationError] Not a symbol`);
            }
        },

         /* Is the value defined */
         isDefined() {
            if(typeof val !== 'undefined'){
                return this;
            } else {
                throw Error(`[ValidationError] Not defined`);
            }
        },

         /* Is the value an array */
         isArray() {
            if(Array.isArray(val)){
                return this;
            } else {
                throw Error(`[ValidationError] Not an array`);
            }
        },

        /* Is the value of a given array size */
        sizeOf(num) {
            if(val.length === num){
                return this;
            } else {
                throw Error(`[ValidationError] Does not have length of ${num}`);
            }
        },

        /* Does the value meet the minimum array size */
        minSize(num) {
            if(val.length >= num){
                return this;
            } else {
                throw Error(`[ValidationError] Does not have a minimum length of ${num} or greater`);
            }
        },

        /* Does the array exceed the specified maximum size? */
        maxSize(num) {
            if(val.length <= num){
                return this;
            } else {
                throw Error(`[ValidationError] Exceeds maximum length of ${num}`);
            }
        },

        /* Is the length of a string the specified size? */
        len(num) {
            if(val.length === num){
                return this;
            } else {
                throw Error(`[ValidationError] Does not have length of ${num}`);
            }
        },

        /* Does the value meet the min length set for a string */
        minLen(num) {
            if(val.length >= num){
                return this;
            } else {
                throw Error(`[ValidationError] Does not have minimum length of ${num} or greater`);
            }
        },

        /* Does the value fall below a certain len? */
        maxLen(num) {
            if(val.length <= num){
                return this;
            } else {
                throw Error(`[ValidationError] Exceeds maximum length of ${num}`);
            } 
        },

        /* Perform the validation itself */
        validate() {
            return result;
        }

    }
};

module.exports = validation;