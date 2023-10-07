import './styles.css';
const Button = ({type, children, ...probs}) => {
  const childs = children ? children : '';
  return (
    <div className='button-container'>
      <button className="custom-button" type={type} {...probs} >
          <div className='button-content'>
            {childs}
          </div>
      </button>
    </div>
  );
};

export default Button;