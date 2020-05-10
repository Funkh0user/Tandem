import React from 'react';
import PromoCard from './promo/PromoCard';

const Home = ({ allEvents }) => {
  return (
    <div className='w-full'>
      <div className='bg-blue-400 h-48 flex'>
        <h1 className='text-3xl text-white ml-10 mt-10'>Whats New</h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
        {allEvents.map((event, index) => {
          return <PromoCard key={index} promoState={event} />;
        })}
      </div>
    </div>
  );
};

export default Home;
