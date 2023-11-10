import axios from "axios";

function PatientTest3() {

  const handleButtonClick = async () => {
    console.log("Clicked!");

    axios.post("http://localhost:5000/api/patient/test", {
      mode: "error",
    }).then((res) => {
      console.log("Response: ", res);
    }).catch((err) => {
      console.log(err);

    });

    // const res = await axios.post("http://localhost:5000/api/patient/test", {
    //   mode: "error",
    // });

    // console.log(res);

  }
  

  return (
    <div>
      <button onClick={handleButtonClick}>
        Click me!
      </button>
    </div>
  );
}

export default PatientTest3;