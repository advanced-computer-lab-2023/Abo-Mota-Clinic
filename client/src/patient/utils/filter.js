function filter(data, config) {
  if (Object.keys(config).length === 0)
    return data;

  config = clean(config);

  return data.filter((item) => {
    for (let key in config) {
      const value = config[key];

      if (value instanceof Array) {
        if (!value.includes(getValue(item, key).toLowerCase()))
          return false;
      }

      else if (value.toLowerCase() !== getValue(item, key).toLowerCase())
        return false;
    }

    return true;
  });
}

const getValue = (obj, key) => {
  if (key.includes(".")) {
    const keys = key.split(".");
    let curr = obj;

    for (const k of keys)
      curr = curr[k];

    return curr;
  } else {
    return obj[key];
  }
}

// Remove empty lists, null values, and sets to
function clean(obj) {
  const newObj = {};
  for (const key in obj) {
    const lowerCaseArray = [];
    if (!obj[key])
      continue;
    if (obj[key] instanceof Array) {
      if (obj[key].length === 0)
        continue;
      for (const value of obj[key])
        lowerCaseArray.push(value.toLowerCase());
      newObj[key] = lowerCaseArray;
    } else {
      newObj[key] = obj[key].toLowerCase();
    }
  }

  return newObj;
}

export default filter;
