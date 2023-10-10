function filter(data, config) {
  if (Object.keys(config).length === 0)
    return data;

  config = toLowerCaseValues(config);

  // return data.filter((item) => {
  //   for (let key in item)
  //     if (config.hasOwnProperty(key)) {
  //       console.log("Erroneous", config[key]);

  //       const value = item[key];
  //       if (!value)
  //         continue;
  //       if (value instanceof Array) {
  //         return config[key].length === 0 || config[key].includes(item[key].toLowerCase());
  //       }

  //       return config[key] === item[key];
  //     }
  //   return true;
  // });

  return data.filter((item) => {
    for (let key in config) {
      const value = config[key];

      if (!value)
        continue;

      if (value instanceof Array) {
        if (value.length === 0)
          continue;
        else
          if (!value.includes(item[key].toLowerCase()))
            return false;
      } else {
        if (value !== item[key])
          return false;
      }
    }
    return true;
  });
}

function toLowerCaseValues(obj) {
  const newObj = {};
  for (const key in obj) {
    const lowerCaseArray = [];
    for (const value of obj[key])
      lowerCaseArray.push(value.toLowerCase());
    newObj[key] = lowerCaseArray;
  }
  return newObj;
}

export default filter;
