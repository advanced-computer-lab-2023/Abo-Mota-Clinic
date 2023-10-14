export default function filterSearch(model, searchTerm, fields) {
  
  return model.filter((item) => {
    for (const key of fields) {
      if (item[key].toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
    return false;
  });
}