/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
    if (arr === undefined) {
        return [];
    }
    let set = new Set();
    for (let elem of arr) {
        if (!set.has(elem)) {
            set.add(elem);
        }
    }
    return [...set];
}
