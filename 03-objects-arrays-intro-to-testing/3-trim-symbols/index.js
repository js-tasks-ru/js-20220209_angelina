/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    let start = 0;
    let result = '';

    while (start < string.length) {
        let c = string[start];
        let q = 0;
        while (string.indexOf(c, start + q) === start + q) {
            q++;
        }
        console.log("q: " + q);
        if (q > size) {
            result += string.substring(start, start + size);
            console.log("IF.result: " + result);
        } else {
            result += string.substring(start, start + q);
            console.log("ELSE.result: " + result);
        }
        start += q;
    }
    return result;
}
