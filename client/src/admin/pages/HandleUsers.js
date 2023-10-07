import { Link } from "react-router-dom";

function HandleUsers() {
        return <div>
            <Link to='/admin/addAdmin'>Add Admin</Link>
            <Link to='/admin/removeUser'>Remove User</Link>
        </div>
}

export default HandleUsers;