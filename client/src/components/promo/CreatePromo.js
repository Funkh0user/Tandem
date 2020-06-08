import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import FormOptionsGroup from './FormOptionsGroup';
import { GoChevronDown } from 'react-icons/go';
import { GoChevronUp } from 'react-icons/go';
import Editor from '../Editor';
  
//destructure props passed into createPromo component
const CreatePromo = ({
  promoState,
  handlePromoStateChange,
  handleDescriptionChange,
  handleSetAllEvents,
  handleSetDateTime,
  // handleSetPicturesArray,
}) => {
  const [expanded, setExpanded] = useState(null);
  const showForms = () => setExpanded(!expanded);
  // let history = useHistory();

  //posts data to server / mongoDB
  const saveEvent = async (data) => {
    const result = await fetch('http://localhost:3001/api/events', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    try {
      const newData = await result.json();
      return newData;
    } catch (error) {
      console.log('there was a problem saving this event.', error);
    }
  };

  const handleClick = () => {
    console.log('trigger');
    // handleSetPicturesArray()///// TODO why does one or the other fire but not both?
    handleSetDateTime(); //// TODO why does one or the other fire but not both?
  };

  const handleSubmit = (e) => {
    //prevent default form behavior.
    e.preventDefault();
    //update mongoDB with new event.
    try {
      saveEvent(promoState).then((result) => {
        //update react state with new event if there is no duplicate event error.
        if (!result.errorMsg) {
          handleSetAllEvents(result);
          //redirect to homepage
          // history.push('/');
          //if theres an error, log it.
        } else {
          console.log('there was an error', result.errorMsg);
          return null;
        }
      });
      //if there is a mongoDB error, log it.
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log(promoState);
  // }, []);

  //if the widget is not expanded...
  if (!expanded) {
    return (
      <div className='create-promo closed' data-cy="closed">
        {/* TODO refactor to pageHeader component with headerText prop */}
        <div className='w-full h-48 bg-green-400'>
          <h1 className='text-white text-4xl pt-10 pl-10'>Create Events</h1>
        </div>
        <div className='w-10/12 md:w-10/12 lg:w-6/12 rounded-md mt-5 mx-auto bg-green-400 shadow-lg'>
          <h2 className='text-center text-3xl p-5 text-white'>
            <p>Create Promo</p>
            <button data-cy='toggle-open' className='text-2xl' onClick={showForms}>
              <GoChevronDown style={{ color: 'white' }} />
            </button>
          </h2>
        </div>
        <div id='bottom-boundary'></div>
      </div>
    );
  } else {
    //when the widget is expanded
    return (
      <div data-cy='open'>
        {/* TODO refactor to pageHeader component with headerText prop */}
        <div className='w-full h-48 bg-green-400'>
          <h1 className='text-white text-4xl pt-10 pl-10'>Create Events</h1>
        </div>
        <div className=' w-10/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 shadow-lg'>
          <div className='w-full rounded-t-md text-center bg-green-400'>
            <h1 className='text-3xl p-5 text-white'>
              <p>Create Promo</p>
              <button className='text-2xl' onClick={showForms}>
                <GoChevronUp className='text-white' />
              </button>
            </h1>
          </div>
          <form
            className=' text-center mx-auto w-full bg-white'
            onSubmit={handleSubmit}
          >
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              <div className='flex-col'>
                <div className='lg:flex justify-center'>
                  <div className='flex flex-col'>
                    <label className='p-2' htmlFor='name'>
                      Event Name:
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={promoState.name}
                      onChange={handlePromoStateChange}
                      className='m-5 border border-solid bg-transparent leading-loose'
                      autoFocus
                      data-cy='event-name-input'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className='p-2' htmlFor='type'>
                      Event Type:
                    </label>
                    <select
                      id='type'
                      name='type'
                      value={promoState.type}
                      onChange={handlePromoStateChange}
                      className='m-5 border border-solid bg-transparent leading-loose'
                    >
                      <option
                        name='volunteer work'
                        value='volunteer work'
                        onChange={handlePromoStateChange}
                      >
                        Volunteer work
                      </option>
                      <option
                        name='music event'
                        value='music event'
                        onChange={handlePromoStateChange}
                        selected
                      >
                        Music Event
                      </option>
                    </select>
                  </div>
                </div>
                <div className='lg:flex justify-center'>
                  <div className='flex flex-col'>
                    <label className='p-2' htmlFor='start'>
                      Start Date:
                    </label>
                    <input
                      type='date'
                      name='startDate'
                      value={promoState.startDate}
                      onChange={handlePromoStateChange}
                      className='m-5 border border-solid bg-transparent leading-loose'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className='p-2' htmlFor='start'>
                      Start Time:
                    </label>
                    <input
                      type='time'
                      name='startTime'
                      value={promoState.startTime}
                      onChange={handlePromoStateChange}
                      className='m-5 border border-solid bg-transparent leading-loose'
                    />
                  </div>
                </div>
                <div className='lg:flex justify-center'>
                  <div className='flex flex-col'>
                    <label className='p-2' htmlFor='start'>
                      End Date:
                    </label>
                    <input
                      type='date'
                      name='endDate'
                      value={promoState.endDate}
                      onChange={handlePromoStateChange}
                      className='m-5 border border-solid bg-transparent leading-loose'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className='p-2' htmlFor='start'>
                      End Time:
                    </label>
                    <input
                      type='time'
                      name='endTime'
                      value={promoState.endTime}
                      onChange={handlePromoStateChange}
                      className='m-5 border border-solid bg-transparent leading-loose'
                    />
                  </div>
                </div>
                <div className='md:flex-col justify-center'>
                  <div className='flex flex-1 flex-col'>
                    <label className='p-2' htmlFor='address'>
                      Street Address:
                    </label>
                    <input
                      type='text'
                      name='address'
                      value={promoState.address}
                      onChange={handlePromoStateChange}
                      className='m-5 border border-solid bg-transparent leading-loose'
                    />
                  </div>
                </div>
                <div className='md:flex-col justify-center'>
                  <div className='flex flex-1 flex-col'>
                    <label className='p-2' htmlFor='city'>
                      City:
                    </label>
                    <input
                      type='text'
                      name='city'
                      value={promoState.city}
                      onChange={handlePromoStateChange}
                      className='m-5 border border-solid bg-transparent leading-loose'
                    />
                  </div>
                </div>
                <div className='md:flex-col justify-center'>
                  <div className='flex flex-1 flex-col'>
                    <label className='p-2' htmlFor='state'>
                      State:
                    </label>
                    <input
                      type='text'
                      name='state'
                      value={promoState.state}
                      onChange={handlePromoStateChange}
                      className='m-5 border border-solid bg-transparent leading-loose'
                    />
                  </div>
                </div>
                <div className='md:flex-col justify-center'>
                  <div className='flex flex-1 flex-col'>
                    <label className='p-2' htmlFor='postal'>
                      Postal Code:
                    </label>
                    <input
                      type='text'
                      name='postal'
                      value={promoState.postal}
                      onChange={handlePromoStateChange}
                      className='m-5 border border-solid bg-transparent leading-loose'
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-between items-between'>
                <label className='p-2' htmlFor='description'>
                  Description:
                </label>
                <div className='flex flex-col items-around justify-around flex-grow p-2'>
                  {/* React-Quill RichText editor */}
                  <Editor
                    handleDescriptionChange={handleDescriptionChange}
                    placeholder='Tell people about your event...'
                  />
                  {/* Image links / slider option */}
                  <FormOptionsGroup
                    promoState={promoState}
                    handlePromoStateChange={handlePromoStateChange}
                  />
                  <button
                    className='p-2 m-2 text-center text-white rounded bg-green-500 hover:bg-green-700 transform hover:scale-105 transition-all ease-in-out duration-500 '
                    type='submit'
                    onClick={handleClick}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div id='bottom-boundary'></div>
      </div>
    );
  }
};
export default CreatePromo;
