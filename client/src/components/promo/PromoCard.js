import React, { useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { RiMapPin2Line } from 'react-icons/ri';
import { GoChevronDown } from 'react-icons/go';
import { GoChevronUp } from 'react-icons/go';
import ImageCarousel from '../ImageCarousel';

//view for data saved in CreatePromo

const PromoCard = ({ promoState }) => {
  //destructure promoState prop
  const {
    name,
    type,
    startDate,
    startTime,
    endDate,
    endTime,
    location,
    description,
    links,
    pictures,
    files,
  } = promoState;

  const [isExpanded, setIsExpanded] = useState(false);
  const expand = () => setIsExpanded(!isExpanded);

  //handle incoming string of different image links
  const picturesArr = pictures
    .replace(/\n/g, ' ')
    .split(' ')
    .filter((picture) => picture !== '');

  const formattedTime = new Date(startDate).toDateString();

  //if the promoCard is not expanded
  if (!isExpanded) {
    return (
      <div className='p-5'>
        <div className=' flex-col mx-auto m-5 rounded bg-white shadow-lg text-center'>
          <h1 className='rounded-t justify-center bg-blue-400 text-center text-white text-2xl break-words'>
            <p>{name}</p>
          </h1>
          <img src={picturesArr[0]} className='w-8/12 mx-auto m-2' />
          <span className='text-xs text-white p-2 bg-blue-400 rounded'>
            {type}
          </span>
          <div className='flex justify-center'>
            <div className='p-5'>
              <AiOutlineCalendar className='text-4xl mx-auto text-blue-400' />
              <p className='text-xs font-hairline text-opacity-50'>
                {formattedTime}
              </p>
            </div>
            <div className='p-5'>
              <RiMapPin2Line className='text-4xl mx-auto text-blue-400' />
              <p className='text-xs font-hairline text-opacity-50 '>
                {location}
              </p>
            </div>
          </div>
          <div
            className='break-words text-sm m-1 p-1'
            dangerouslySetInnerHTML={{
              __html: description.substring(0, 50) + '...',
            }}
          ></div>
          <button className='p-1 text-4xl text-blue-400' onClick={expand}>
            {isExpanded ? <GoChevronUp /> : <GoChevronDown />}
          </button>
        </div>
      </div>
    );
  } else if (isExpanded && promoState.description) {
    //if the promoCard is expanded
    return (
      <div className='m-5'>
        <div className='flex-col mx-auto m-5 rounded bg-white shadow-lg text-center'>
          <h1 className='rounded-t bg-blue-400 text-center text-white text-3xl break-words'>
            <p>{name}</p>
            <button className='p-2' onClick={expand}>
              {isExpanded ? <GoChevronUp /> : <GoChevronDown />}
            </button>
          </h1>
          <div className='mx-auto'>
            <ImageCarousel picturesArr={picturesArr} />
          </div>
          <span className='text-xs text-white p-2 bg-blue-400 rounded'>
            {type}
          </span>
          <div className='flex justify-around items-center text-center'>
            <div className='p-2 flex flex-col items-center'>
              <AiOutlineCalendar className='text-4xl text-blue-400' />
              <p className='text-sm font-hairline text-opacity-50 '>
                {formattedTime}
              </p>
            </div>
            <div className='p-1'></div>
            <div className='p-2 flex flex-col items-center'>
              <RiMapPin2Line className='text-4xl text-blue-400' />
              <p className='text-sm font-hairline text-opacity-50'>
                {location}
              </p>
            </div>
          </div>

          <div
            className='break-words m-2 p-2 text-center'
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
          <button
            className='p-2 text-center text-4xl text-blue-400'
            onClick={expand}
          >
            {isExpanded ? <GoChevronUp /> : <GoChevronDown />}
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PromoCard;
