/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    let newObj = new Object();
    const keys = Object.keys(obj);
    for (let k in keys) {
        if (!fields.includes(keys[k])) {
            newObj[keys[k]] = obj[keys[k]];
        }
    }
    return newObj;
};
