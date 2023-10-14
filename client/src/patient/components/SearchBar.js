import Input from '@mui/joy/Input';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onChange, placeholder, ...rest }) {

  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    setTerm(e.target.value);
    onChange(e.target.value);
  };

  return <Input
    {...rest}
    onClick={() => console.log("Clicked")}
    startDecorator={<SearchIcon {...rest} />}
    placeholder={placeholder}
    className="bg-transparent border text-gray-700 py-1 px-2 leading-tight focus:outline-none"
    value={term}
    onChange={handleChange}
    sx={{ width: 300 }}
  />;
}

export default SearchBar;
