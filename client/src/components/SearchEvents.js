import React, { useState, useEffect, useContext } from 'react';
import NavigationContext from './context/navigationContext/NavigationContext'

const SearchEvents = () => {

  const [eventSearchForm, setEventSearchForm] = useState({
    search: '',
  });
  const handleEventSearch = (e) =>
    setEventSearchForm({ [e.target.name]: e.target.value });

    const navigationContext = useContext(NavigationContext)
    useEffect(() => {
      navigationContext.changeTheme()
    }, [navigationContext.location]);

  return (
    <div className='w-full'>
      <div className='bg-orange-400 h-48 grid grid-cols-1 md:grid-cols-3'>
        <div>
          <h1 className='text-4xl text-white mt-10 ml-10'>Search Events</h1>
        </div>
        <div className='flex md:flex-col sm:justify-center sm:items-center w-full justify-center items-center '>
          <form className='w-10/12 lg:w-full mx-auto flex'>
            <label htmlFor='eventSearch'></label>
            <input
              type='text'
              name='eventSearch'
              value={eventSearchForm.search}
              onChange={handleEventSearch}
              className='w-11/12  lg:w-full mx-auto border-none leading-8'
              placeholder='Enter the name of the event your looking for.'
            />
            <button
              className='p-2 m-2 text-center text-white rounded bg-orange-500 hover:bg-orange-700 transform hover:scale-105 transition-all ease-in-out duration-500 '
              type='submit'
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div id='bottom-boundary'></div>
    </div>
  );
};

export default SearchEvents;
