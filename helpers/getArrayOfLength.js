/**
 * @param {number} length
 * @returns {Array<number>}
 */
export default function getArrayOfLength(length) {
  return Array.from({ length }, (_, index) => index + 1);
}
