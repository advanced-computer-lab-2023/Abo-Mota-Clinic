import './styles.css';
const RadioButton = ({options, name, selectedOption, onChange}) => {
  return (
    <div className="radio-button-container">
      
      {options.map((option) => {
        return (
          <div className="radio-button-label">
            <label key={option}>
              {option}
            </label>
            <input
                type="radio"
                name={name}
                value={option}
                checked={selectedOption === option}
                onChange={onChange}
              />
          </div>
        );
      })}
    </div>
  );
}

export default RadioButton;