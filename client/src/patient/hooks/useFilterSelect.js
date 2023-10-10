import FilterSelect from "../components/FilterSelect";
import { useState } from "react";

function useFilterSelect(placeholder, options) {
  const [value, setValue] = useState(null);
  const select = () => {
    return <FilterSelect
      placeholder={placeholder}
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
      onCancel={() => setValue(null)}>
      {options}
    </FilterSelect>
  };

  return [value, select];
};

export { useFilterSelect };