import React, {useRef} from 'react';

const CategorySearchCount = ({category, searchCount}) => {
	const divRef = useRef(null);

	const changeColor = () => {
		if (!divRef.current) return;
		divRef.current.style.color = 'black';
	}
	setTimeout(changeColor, 1000);

	return <div style={{ color: 'red' }} ref={divRef} key={category}>{category} - {searchCount}</div>;
}

export default CategorySearchCount;