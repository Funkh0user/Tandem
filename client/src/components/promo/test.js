import React, { useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import PromoState from '../context/PromoContext/PromoState';
import { CSSTransitionGroup } from 'react-transition-group';
import Editor from '../Editor';
import { GoChevronDown } from 'react-icons/go';
import { GoChevronUp } from 'react-icons/go';

const CreatePromo_v2 = ({
  promoState,
  handlePromoStateChange,
  handleDescriptionChange,
  handleSetAllEvents,
  handleSetDateTime,
}) => {
  let history = useHistory();
  const [expanded, setExpanded] = useState(null);
  const showForms = () => setExpanded(!expanded);
  const [step, setStep] = useState(0);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);

  const zero = (
    <div className=' flex flex-col justify-center align-center'>
      <p className='p-16 text-center'>
        What would you like to call your new event?
      </p>
      <label htmlFor='name' className='text-xs'></label>
      <input
        type='text'
        id='name'
        name='name'
        className=' border-b-2'
        value={promoState.name}
        onChange={handlePromoStateChange}
        placeholder='event name...'
      />
    </div>
  );
  const one = (
    <div className=''>
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
      >
        Music Event
      </option>
    </select>
  </div>
  );
  const two = (
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
  const three = (
      <div className=''>
        <p>When will this event happen?</p>
        <label className='p-2' htmlFor='startDate'>
          Start Date:
        </label>
        <input
          type='date'
          name='startDate'
          value={promoState.startDate}
          onChange={handlePromoStateChange}
          className='m-5 border border-solid bg-transparent leading-loose'
        />
        <label className='p-2' htmlFor='startTime'>
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
  const four = (
    <div className=''>
    <p>When will the event end?</p>
    <label className='p-2' htmlFor='endDate'>
      End Date:
    </label>
    <input
      type='date'
      name='endDate'
      value={promoState.endDate}
      onChange={handlePromoStateChange}
      className='m-5 border border-solid bg-transparent leading-loose'
    />
    <label className='p-2' htmlFor='endTime'>
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
  const five = (
    <div>
    <p>Describe your event.</p>
    <Editor
      handleDescriptionChange={handleDescriptionChange}
      placeholder='Tell people about your event...'
    />
  </div>
  );
  const six = (
    <div>
    <p>Links to Images of your event.</p>
    <label htmlFor='pictures' classaName='text-xs'>
      Image URLs:
    </label>
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

  const [activeInput, setActiveInput] = useState([zero])

  const handleSetStep = (e) => {
    e.preventDefault();
    if (e.target.name === 'nextButton') {
      step <= 4 ? setStep(step + 1) : setStep(step);
      step === 0 ? setIsFirstStep(true) : setIsFirstStep(false);
      step === 5 ? setIsLastStep(true) : setIsLastStep(false);
    }
    if (e.target.name === 'backButton') {
      step >= 1 ? setStep(step - 1) : setStep(step);
      step === 0 ? setIsFirstStep(true) : setIsFirstStep(false);
      step === 5 ? setIsLastStep(true) : setIsLastStep(false);
    }

    switch(step) {
      case 0:
        setActiveInput([zero])
        break
      case 1:
        setActiveInput([one])
        break
      case 2:
        setActiveInput([two])
        break
      case 3:
        setActiveInput([three])
        break
      case 4:
        setActiveInput([four])
        break
      case 5:
        setActiveInput([five])
        break
      case 6:
        setActiveInput([six])
        break
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

  if (!expanded) {
    return (
      <div className='create-promo closed' data-cy='closed'>
        {/* TODO refactor to pageHeader component with headerText prop */}
        <div className='w-full h-48 bg-green-400'>
          <h1 className='text-white text-4xl pt-10 pl-10'>Create Events</h1>
        </div>
        <div className='w-10/12 md:w-10/12 lg:w-6/12 rounded-md mt-5 mx-auto bg-green-400 shadow-lg'>
          <h2 className='text-center text-3xl p-5 text-white'>
            <p>Create Promo</p>
            <button
              data-cy='toggle-open'
              className='text-2xl'
              onClick={showForms}
            >
              <GoChevronDown style={{ color: 'white' }} />
            </button>
          </h2>
        </div>
        <div id='bottom-boundary'></div>
      </div>
    );
  } else {
    return (
      <div className='w-full'>
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

          <div className='bg-white'>
            <div></div>
            <div className='flex-col justify-center align-center'>
              <form onSubmit={handleSubmit}>
                {activeInput.map((input, index) => {
                  return <div key={index}>{input}</div>;
                })}
                {/* {(() => {
                  switch (step) {
                    case 0:
                      return (
                        <div className=' flex flex-col justify-center align-center'>
                          <p className='p-16 text-center'>
                            What would you like to call your new event?
                          </p>
                          <label htmlFor='name' className='text-xs'></label>
                          <input
                            type='text'
                            id='name'
                            name='name'
                            className=' border-b-2'
                            value={promoState.name}
                            onChange={handlePromoStateChange}
                            placeholder='event name...'
                          />
                        </div>
                      );
                    case 1:
                      return (
                        <div className=''>
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
                        <div className=''>
                          <p>When will this event happen?</p>
                          <label className='p-2' htmlFor='startDate'>
                            Start Date:
                          </label>
                          <input
                            type='date'
                            name='startDate'
                            value={promoState.startDate}
                            onChange={handlePromoStateChange}
                            className='m-5 border border-solid bg-transparent leading-loose'
                          />
                          <label className='p-2' htmlFor='startTime'>
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
                        <div className=''>
                          <p>When will the event end?</p>
                          <label className='p-2' htmlFor='endDate'>
                            End Date:
                          </label>
                          <input
                            type='date'
                            name='endDate'
                            value={promoState.endDate}
                            onChange={handlePromoStateChange}
                            className='m-5 border border-solid bg-transparent leading-loose'
                          />
                          <label className='p-2' htmlFor='endTime'>
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
                          <label htmlFor='pictures' classaName='text-xs'>
                            Image URLs:
                          </label>
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
                })()} */}
                <div className='flex justify-center'>
                  {isFirstStep ? null : (
                    <button
                      className='p-2 m-2 text-center text-white rounded bg-green-500 hover:bg-green-700 transform hover:scale-105 transition-all ease-in-out duration-500 '
                      name='backButton'
                      onClick={handleSetStep}
                    >
                      back
                    </button>
                  )}

                  {isLastStep ? (
                    <button
                      type='submit'
                      className='p-2 m-2 text-center text-white rounded bg-green-500 hover:bg-green-700 transform hover:scale-105 transition-all ease-in-out duration-500 '
                      onClick={handleClick}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      className='p-2 m-2 text-center text-white rounded bg-green-500 hover:bg-green-700 transform hover:scale-105 transition-all ease-in-out duration-500 '
                      name='nextButton'
                      onClick={handleSetStep}
                    >
                      next
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div></div>
          </div>
        </div>
        <div id='bottom-boundary'></div>
      </div>
    );
  }
};

export default CreatePromo_v2;