const onFilterChange = (filterField, [filterConfig, setFilterConfig], bool) => {
  const onChange = (newValue) => {

    if (!newValue) {
      const { [filterField]: filterData, ...rest } = filterConfig;

      if(bool)
        setFilterConfig(rest);
      return;
    }

    // if bool is false or true
    let filter = {
      [filterField]: {
        term: newValue,
        select: bool
      }
    };

    if (bool) {
      setFilterConfig({ ...filterConfig, ...filter });
    } else if (filterField in filterConfig) {
      const select = filterConfig[filterField]["select"];

      if (!select) {
        setFilterConfig({ ...filterConfig, ...filter });
      }
    } else {
      setFilterConfig({ ...filterConfig, ...filter });
    }
  };

  return onChange;
}

export default onFilterChange;