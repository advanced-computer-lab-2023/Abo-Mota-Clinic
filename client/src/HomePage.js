import React from 'react'
import { Link } from 'react-router-dom';
function HomePage() {
  return (
    <div>
      <Link to='patientRegistration'><button>Register as Patient</button></Link>
      <Link to='doctorRegistration'><button>Register as Doctor</button></Link>
    </div>
  )
}

export default HomePage
