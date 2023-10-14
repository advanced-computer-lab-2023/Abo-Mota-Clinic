const filter = (model, filterConfig) => {
  if (Object.keys(filterConfig).length === 0)
    return model;
  
  const comparator = (a, b, select) => {
    return select ? a.toLowerCase() === b.toLowerCase() : a.toLowerCase().includes(b.toLowerCase());
  }

  return model.filter((item) => {
    for (const key in filterConfig) {
      if (!comparator(item[key], filterConfig[key].term, filterConfig[key].select))
        return false;
    }
    return true;
  });
}

export default filter;