import React, { useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import PromoState from '../context/PromoContext/PromoState';
import Editor from '../Editor';

const CreatePromo_v2 = ({
  promoState,
  handlePromoStateChange,
  handleDescriptionChange,
  handleSetAllEvents,
  handleSetDateTime
}) => {
  let history = useHistory()
  const [step, setStep] = useState(0);
  const [isFormComplete, setIsFormComplete] = useState(false)
  const handleSetStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
    console.log(step);
    if(step === 5) {
        setIsFormComplete(true)
    }
  };
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
          history.push('/');
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

  return (
    <div className='w-full'>
      <div className='grid grid-cols-3 grid-rows-3'>
        <div></div>
        <div className=' row-start-2 col-start-2 flex-col justify-center align-center'>
          <form onSubmit={handleSubmit}>
            {(() => {
              switch (step) {
                case 0:
                  return (
                    <div className='mt-32'>
                      <p>What would you like to call your event?</p>
                      <label htmlFor='name'>Event Name: </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='w-full'
                        value={promoState.name}
                        onChange={handlePromoStateChange}
                      />
                    </div>
                  );
                case 1:
                  return (
                    <div className='mt-32'>
                      <p>What kind of event will this be?</p>
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
                  );
                case 2:
                  return (
                    <div>
                      <p>Where will this event take place?</p>
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
                  );
                case 3:
                  return (
                    <div className='mt-16'>
                      <p>When will this event happen?</p>
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
                  );
                case 4:
                  return (
                    <div className='mt-16'>
                      <p>When will the event end?</p>
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
                  );
                case 5:
                  return (
                    <div>
                      <p>Describe your event.</p>
                      <Editor
                        handleDescriptionChange={handleDescriptionChange}
                        placeholder='Tell people about your event...'
                      />
                    </div>
                  );
                case 6:
                  return (
                    <div>
                      <p>Links to Images of your event.</p>
                      <label htmlFor='pictures'>Image URLs:</label>
                      <textarea
                        name='pictures'
                        id='pictures'
                        cols='10'
                        rows='10'
                        value={promoState.pictures}
                        onChange={handlePromoStateChange}
                        className='border border-solid w-full'
                        placeholder="Add as many URLs as you'd like, each on a new line."
                      ></textarea>
                    </div>
                  );
                default:
                  return <div>Test</div>;
              }
            })()}
            <div className='flex justify-center'>
              <button className='m-2'>back</button>
              {
                  isFormComplete ? 
              
              <button type='submit' className='m-2' onClick={handleClick}>
                Submit
              </button>
              :
              <button className='m-2' onClick={handleSetStep}>
                next
              </button>
              }
            </div>
          </form>
        </div>
        <div></div>
      </div>
      <div id='bottom-boundary'></div>
    </div>
  );
};

export default CreatePromo_v2;
