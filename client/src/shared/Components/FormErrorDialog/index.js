import "./styles.css";
import { IoMdClose } from "react-icons/io";
import { CgDanger } from "react-icons/cg";

const FormErrorDialog = ({
  isError,
  setClose,
  message = "Please check your username or password",
}) => {
  let x = null;
  if (isError) {
    x = (
      <div className='error-pop-up-container'>
        <div className='error-pop-up-content'>
          <button
            className='error-pop-up-close'
            onClick={() => {
              setClose();
            }}
          >
            <IoMdClose />
          </button>
          <div className='error-pop-up-message'>
            <CgDanger size={25} color='red' />
            {message}
          </div>
        </div>
      </div>
    );
  }

  return x;
  // return (
  //   <dialog open={isError} className='form-dialog'>
  //     {message}
  //     <button
  //       onClick={() => {
  //         setClose();
  //       }}
  //     >
  //       <IoMdClose />
  //     </button>
  //   </dialog>
  // );
};

export default FormErrorDialog;
