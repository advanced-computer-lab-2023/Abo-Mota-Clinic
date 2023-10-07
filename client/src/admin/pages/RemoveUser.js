import { useState } from "react";

function RemoveUser(){
    const [username, setUsername] = useState('');

    const handleNameChange = (event) => setUsername(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        //register admin
        setUsername('');
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input value={username} onChange={handleNameChange}/>

            <button>Remove User</button>
        </form>
    </div>
}

export default RemoveUser; 