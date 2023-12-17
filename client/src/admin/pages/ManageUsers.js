import React from "react";
import AddAdminModal from "../components/AddAdminModal";
import RemoveUserModal from "../components/RemoveUserModal";

function ManageUsers() {
	return <div style={{display: "flex", gap: '10px'}} className="pt-10">
		<AddAdminModal/>
		<RemoveUserModal/>
	</div>
}

export default ManageUsers;
