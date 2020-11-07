import React, {useState} from 'react'
import { Menu} from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';

const Header = () => {
	const { push } = useHistory();
 	const [activeItem, setActiveItem] = useState('Country reports');

	const handleMenuItemClick = (route, name) => {
		setActiveItem(name);
		push(route)
	}

	return (
		<div>
			<Menu pointing secondary>
				<Menu.Item
					name='Country reports'
					active={activeItem === 'Country reports'}
					onClick={(e, { name }) => handleMenuItemClick('/country-reports', name)}
				/>
				<Menu.Item
					name='Age group reports'
					active={activeItem === 'Age group reports'}
					onClick={(e, { name }) => handleMenuItemClick('/age-group-reports', name)}
				/>
				<Menu.Item
					name='Newspaper reports'
					active={activeItem === 'Newspaper reports'}
					onClick={(e, { name }) => handleMenuItemClick('/newspaper-reports', name)}
				/>
				<Menu.Item
					name='Article count and global reports'
					active={activeItem === 'Article count and global reports'}
					onClick={(e, { name }) => handleMenuItemClick('/article-count-by-category-reports', name)}
				/>
			</Menu>
		</div>
	);
}

export default Header;