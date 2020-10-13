import React, {useState} from 'react'
import { Menu} from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';

const Header = () => {
	const { push } = useHistory();
 	const [activeItem, setActiveItem] = useState('Country reports');

	const handleItemClick = (route, name) => {
		setActiveItem(name);
		push(route)
	}

	return (
		<div>
			<Menu pointing secondary>
				<Menu.Item
					name='Country reports'
					active={activeItem === 'Country reports'}
					onClick={(e, { name }) => handleItemClick('/country-reports', name)}
				/>
				<Menu.Item
					name='Age group reports'
					active={activeItem === 'Age group reports'}
					onClick={(e, { name }) => handleItemClick('/age-group-reports', name)}
				/>
			</Menu>
		</div>
	);
}

export default Header;