import './styles.css';

const DropDown = ({ options, id, error, touch,  label, ...probs }) => {
  // console.log(probs.onChange);
  return (
    <div className="dropdown-container">
    <label>{label}</label>
      <select id={id} className="dropdown-select" {...probs}>
      {options.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </select>
    {error && touch ? <div className="input-error"> {error} </div>: null}
    </div>
  );
}

export default DropDown;