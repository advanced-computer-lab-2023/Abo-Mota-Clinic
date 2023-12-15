import "./styles.css";

const FormErrorDialog = ({
  isError,
  setClose,
  message = "Please check your username or password",
}) => {
  return (
    <dialog open={isError} className='form-dialog'>
      {message}
      <button
        onClick={() => {
          setClose();
        }}
      >
        Close
      </button>
    </dialog>
  );
};

export default FormErrorDialog;
