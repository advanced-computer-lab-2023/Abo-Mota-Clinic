import './styles.css';
const Button = ({buttonClass, type, label}) => {
  return (
      <button className={buttonClass} type={type}>{label}</button>
  );
};

export default Button;