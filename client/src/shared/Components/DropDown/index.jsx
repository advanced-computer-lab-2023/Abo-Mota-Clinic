import './styles.css';

const DropDown = ({ options, onChange, value, name, label }) => {
  return (
    <div className="dropdown-container">
    <label>{label}</label>
      <select className="dropdown-select" name={name} onChange={onChange} value={value} required>
      {options.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </select>
    </div>
  );
}

export default DropDown;