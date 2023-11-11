import { Link } from "react-router-dom";
const Sidebar = ({ items }) => {
	return (
		<>
			<aside className="menu">
				{/* <p class="menu-label">General</p> */}
				<ul className="menu-list">
					{items.map((item,i) => {
						return (
							<li key={i}>
								<Link to={item.to} >{item.name}</Link>
							</li>
						);
					})}
				</ul>
			</aside>
		</>
	);
};

export default Sidebar;
