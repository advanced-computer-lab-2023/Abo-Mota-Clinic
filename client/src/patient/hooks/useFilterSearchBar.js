import Input from '@mui/joy/Input';
import { useState } from 'react';

function useFilterSearchBar() {

  const [term, setTerm] = useState("");
  const input = <Input className="bg-transparent border text-gray-700 ml-3 mr-3 py-1 px-2 leading-tight focus:outline-none" value={term} onChange={(event) => setTerm(event.target.value)} />;

  return [term, input];
}

export default useFilterSearchBar;