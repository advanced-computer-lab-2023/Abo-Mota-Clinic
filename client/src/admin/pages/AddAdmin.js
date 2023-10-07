import { useState } from "react";

function AddAdmin(){
    const [adminName, setAdminName] = useState('');
    const [adminPass, setAdminPass] = useState('');

    const handleNameChange = (event) => setAdminName(event.target.value);
    
    const handlePassChange = (event) => setAdminPass(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        //register admin
        setAdminName('');
        setAdminPass('');
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input value={adminName} onChange={handleNameChange}/>

            <label>Password</label>
            <input value={adminPass} onChange={handlePassChange}/>

            <button>Add Admin</button>
        </form>
    </div>
}

export default AddAdmin; 