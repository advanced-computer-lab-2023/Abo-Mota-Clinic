import './styles.css';

const LoadingIndicator = ({size = 30}) =>{
  const style = {height: size, width: size};

  return <div className="loading-indicator" style={style}></div>
}

export default LoadingIndicator;