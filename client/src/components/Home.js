import React, { Fragment, useEffect, useContext } from 'react';
import PromoCard from './promo/PromoCard';
import NavigationContext from './context/navigationContext/NavigationContext';

//currently, returns a lazy-loaded list of all saved events
const Home = ({ allEvents, eventStateEvents }) => {
	const navigationContext = useContext(NavigationContext);

	console.log(navigationContext)
	useEffect(() => {
		navigationContext.changeTheme()
	}, [navigationContext.location]);
	return (
		<Fragment>
			<div className='bg-blue-400 h-48 flex'>
				<h1 className='text-4xl text-white ml-10 mt-10'>Whats New</h1>
			</div>
			<div
				id='top-boundary'
				className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
			>
				{allEvents.map((event, index) => {
					return <PromoCard key={index} promoState={event} />;
				})}
				<div id='bottom-boundary'></div>
			</div>
		</Fragment>
	);
};

export default Home;
