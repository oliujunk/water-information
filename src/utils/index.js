export function accMul(arg1, arg2) {
  let m = 0;
  if ((arg1 || arg1 === 0) && (arg2 || arg2 === 0)) {
    const s1 = arg1.toString();
    const s2 = arg2.toString();
    try {
      if (s1.split('.').length > 1) {
        m += s1.split('.')[1].length;
      }
    } catch (e) {
      console.log(e);
    }
    try {
      if (s2.split('.').length > 1) {
        m += s2.split('.')[1].length;
      }
    } catch (e) {
      console.log(e);
    }
    return (
      (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / (10 ** m)
    );
  }
  return null;
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}
