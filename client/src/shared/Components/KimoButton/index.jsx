import './styles.css';
const KimoButton = ({type, children , ...probs}) => {
  const childs = children ? children : '';
  return (
    <div className='button-container'>
      <button className='custom-button' type={type} {...probs} >
        {childs}
      </button>
    </div>
  );
};

export default KimoButton;