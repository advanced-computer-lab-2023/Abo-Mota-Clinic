import { Link } from "react-router-dom";
const Sidebar = ({ items }) => {
	return (
		<>
			<aside class="menu">
				{/* <p class="menu-label">General</p> */}
				<ul class="menu-list">
					{items.map((item) => {
						return (
							<li>
								<Link to={item.to}>{item.name}</Link>
							</li>
						);
					})}
				</ul>
			</aside>
		</>
	);
};

export default Sidebar;
