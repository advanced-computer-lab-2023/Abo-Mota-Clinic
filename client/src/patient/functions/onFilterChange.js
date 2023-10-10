const onFilterChange = (filterField, [filterConfig, setFilterConfig]) => {
  const onChange = (newValue) => {

    if (!newValue) {
      const { [filterField]: filterData, ...rest } = filterConfig;
      setFilterConfig(rest);
      return;
    }

    const filter = {
      [filterField]: {
        term: newValue,
        select: true
      }
    };

    setFilterConfig({ ...filterConfig, ...filter });
  };

  return onChange;
}

export default onFilterChange;