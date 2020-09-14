/** @format */

import React from 'react';

const ErrorPage = (props) => {
	return (
		<div className='text-center m-64'>
			<p>{props.location.state.error.status}</p>
			<p>{props.location.state.error.statusText}</p>
			<div id='bottom-boundary'></div>
		</div>
	);
};

export default ErrorPage;
