import React from 'react';
import PromoCard from './promo/PromoCard';


//currently, returns a list of all saved events

//finish refactored for lazy load
const Home = ({ allEvents, eventState }) => {


  return (
    <div className='w-full'>
      <div className='bg-blue-400 h-48 flex'>
        <h1 className='text-3xl text-white ml-10 mt-10'>Whats New</h1>
      </div>
      <div id="top-boundary" className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
        {eventState.map((event, index) => {
          return <PromoCard key={index} promoState={event} />;
        })}
      </div>
      <div id="bottom-boundary"></div>
    </div>
  );
};

export default Home;
