import { Select } from "@mui/joy";
import { Option } from "@mui/joy";
import IconButton from '@mui/joy/IconButton';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { useState } from "react";

export default function FilterSelect({ onChange, placeholder, children }) {

  const [value, setValue] = useState(null);

  const renderedOptions = [...new Set(children)].map((option) => {
    return <Option value={option.toLowerCase()}>{option}</Option>
  });

  const handleDropdownChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Select
      // action={action}
      value={value}
      placeholder={placeholder}
      onChange={handleDropdownChange}
      {...(value && {
        // display the button and remove select indicator
        // when user has selected a value
        endDecorator: (
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onMouseDown={(event) => {
              // don't open the popup when clicking on this button
              event.stopPropagation();
            }}
            onClick={() => {
              setValue(null);
              onChange(null);
              // action.current?.focusVisible();
            }}
          >
            <CloseRounded />
          </IconButton>
        ),
        indicator: null,
      })}
      sx={{ width: 180 }}
    >
      {renderedOptions}
    </Select>
  )
};

