/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    let sortArr = [...arr];
    let collator = new Intl.Collator('ru-RU', {caseFirst: "upper"});
    sortArr.sort( function (a, b) {
        if (param === 'asc') {
            return collator.compare(a, b);
        } else {
            return collator.compare(b, a);
        }
      })
    return sortArr;
}
