import './styles.css';
const Button = ({type, label}) => {
  return (
      <button className="custom-button" type={type}>{label}</button>
  );
};

export default Button;