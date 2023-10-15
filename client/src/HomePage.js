import React from "react";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div className="flex justify-between w-4/5">
      <Link to="patientRegistration">
        <button>Register as Patient</button>
      </Link>
      <Link to="doctorRegistration">
        <button>Register as Doctor</button>
      </Link>
      <Link to="admin">
        <button>Admin</button>
      </Link>
    </div>
  );
}

export default HomePage;
