import React, {useRef} from 'react';

const CategoryArticlesCount = ({category, articlesCount}) => {
	const divRef = useRef(null);

	const changeColor = () => {
		if (!divRef.current) return;
		divRef.current.style.color = 'black';
	}
	setTimeout(changeColor, 1000);

	return <div style={{ color: 'red' }} ref={divRef} key={category}>{category} - {articlesCount}</div>;
}

export default CategoryArticlesCount;