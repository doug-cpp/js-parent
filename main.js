
  // ----------------------------------------------------------------------------

  /**
   * Given a javascript object, the function will seek
   * for the key in depth, returning an array of all parents
   * of the key found into this object. If no key was found, it
   * returns an empty array.
   * @param {object} obj
   * @param {string} key
   * @returns {Array}
   */
function getParentsByKey(obj, key) {
    let res = [];
    for(let p in obj) {
      if (typeof obj[p] === 'object') {
        res = res.concat(getParentsByKey(obj[p], key));
      }
      if (p === key) res.push(obj);
    }
    return res;
}

// ----------------------------------------------------------------------------

/**
 * Given a javascript object, the function will seek in depth for
 * the first parent object of the key, returning it, or null if
 * this key wasn't found.
 * @param {object} obj
 * @param {string} key
 * @returns {object | null}
 */
function getFirstParentByKey(obj, key) {

  if(key in obj) return obj;

  for(let p in obj) {
    if (typeof obj[p] === 'object') {
      const deep = getFirstParentByKey(obj[p], key);
      if(deep !== null) return deep;
    }
  }
  return null;
}

// ----------------------------------------------------------------------------

/**
 * Given a javascript object, the function will seek in depth for
 * the first parent node of the value, returning it, or null if
 * this value wasn't found into the full object.
 * @param {object} obj
 * @param {string} val
 * @returns {object | null}
 */
function getFirstParentByValue(obj, val) {

  for(let v in obj) {
    if (obj[v] === val) return obj;
    if (typeof obj[v] === 'object') {
      const deep = getFirstParentByValue(obj[v], val);
      if(deep !== null) return deep;
    }
  }
  return null;
}

// ----------------------------------------------------------------------------

/**
 * Given a javascript object, the function will seek in depth
 * for the setted value into any object node, returning an array
 * of all parents of the found value. If no value exists into this
 * object, it returns an empty array.
 * @param {object} obj
 * @param {string} val
 * @returns {Array}
 */
function getParentsByValue(obj, val) {
  let res = [];
  for(let v in obj) {
    if (typeof obj[v] === 'object') {
      res = res.concat(getParentsByValue(obj[v], val));
    }
    if (obj[v] === val) res.push(obj);
  }
  return res;
}

// ----------------------------------------------------------------------------

/**
 * Given a javascript object, the function will seek in depth
 * for the key into any object node, returning the complete
 * path from the root element until the first matching data.
 * @example
 * // returns "items[0].sus.docs.city[25].personal.docs[3].cpf.name"
 *  getPathByValue(obj, 'name')
 * @param {object} obj
 * @param {string} key
 * @returns {string}
 */
function getPathByKey(obj, key) {

  let pathstr = '';

  (function makePath(obj, key) {
    if(key in obj) {
      pathstr += '|' + key;
      return obj;
    }

    for(let p in obj) {
      if (typeof obj[p] === 'object') {
        const deep = makePath(obj[p], key);
        pathstr += '|' + p;
        if(deep !== null) return deep;
      }
      pathstr = '';
    }
    return null;
  })(obj, key);

  arr = pathstr.split('|');

  pathstr = '';

  for(let i = arr.length; i > -1; i--) {
    if(arr[i]) {
      if(isNaN(arr[i])) pathstr += '.' + arr[i];
      else pathstr += `[${arr[i]}]`
    }
  }

  return pathstr.substring(1);
}
// ----------------------------------------------------------------------------

/**
 * Given a javascript object, the function will seek in depth
 * for the setted value into any object node, returning the complete
 * path from the root element until the first matching data.
 * @example
 * // returns "items[0].sus.docs.city[25].personal.docs[3].cpf.name"
 *  getPathByValue(obj, 'João Pedro')
 *
 * @param {object} obj
 * @param {string} val
 * @returns {string}
 */
function getPathByValue(obj, val) {

  let pathstr = '';

  (function makePath(obj, val) {

    for(let p in obj) {
      if(obj[p] === val) {
        pathstr += '|' + p;
        return obj;
      }
      if (typeof obj[p] === 'object') {
        const deep = makePath(obj[p], val);
        pathstr += '|' + p;
        if(deep !== null) return deep;
      }
      pathstr = '';
    }
    return null;
  })(obj, val);

  arr = pathstr.split('|');

  pathstr = '';

  for(let i = arr.length; i > -1; i--) {
    if(arr[i]) {
      if(isNaN(arr[i])) pathstr += '.' + arr[i];
      else pathstr += `[${arr[i]}]`
    }
  }

  return pathstr.substring(1);
}
// ----------------------------------------------------------------------------
