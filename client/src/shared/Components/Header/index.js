import './styles.css'


const Header = ({header, subheader}) => {
  return (
    <>
      <div className="app-header">
        {header}
      </div>       
      <div className="app-subheader">
        {subheader}
      </div>
    </>
  );
};

export default Header;