/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    let buffer = '';
    let sortArr = [...arr];
    let isSorted = false;
    let collator = new Intl.Collator('ru-RU', {caseFirst: "upper"});
    if (param === 'asc') {
        while (!isSorted) {
            isSorted = true;
            for (let i = 0; i < sortArr.length - 1; i++) {
                if (collator.compare(sortArr[i], sortArr[i+1]) === 1) {
                    isSorted = false;
                    buffer = sortArr[i];
                    sortArr[i] = sortArr[i+1];
                    sortArr[i+1] = buffer;
                }
            }
        }
        return sortArr; 
    } else if (param === 'desc') {
        while (!isSorted) {
            isSorted = true;
            for (let i = 0; i < sortArr.length - 1; i++) {
                if (collator.compare(sortArr[i], sortArr[i+1]) === -1) {
                    isSorted = false;
                    buffer = sortArr[i+1];
                    sortArr[i+1] = sortArr[i];
                    sortArr[i] = buffer;
                }
            }
        } 
        return sortArr;
    }
}
