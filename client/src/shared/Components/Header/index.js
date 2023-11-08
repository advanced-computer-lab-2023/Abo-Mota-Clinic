import './styles.css'


const Header = ({header, subheader, type}) => {
  return (
    <>
      <div className={`app-header ${type}`}>
        {header}
      </div>       
      <div className="app-subheader">
        {subheader}
      </div>
    </>
  );
};

export default Header;