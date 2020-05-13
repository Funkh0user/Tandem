import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { FaCaretUp } from 'react-icons/fa';

//drop down menu option with input for image urls to create slideshow 

const FormOptionsGroup = ({ promoState, handlePromoStateChange }) => {
  const [showPictures, setShowPictures] = useState(null);

  const handleShowPictures = () => setShowPictures(!showPictures);

  return (
    <div className='flex-grow flex flex-col justify-center'>
      <div
        onClick={handleShowPictures}
        className='w-full pl-6 p-2 flex justify-center items-center'
      >
        <p>Include Image Slider?</p>
        {showPictures ? (
          <FaCaretUp style={{ color: '#58ba84' }} />
        ) : (
          <FaCaretDown style={{ color: '#58BA84' }} />
        )}
      </div>
      <div className={showPictures ? 'block flex flex-col flex-1' : 'hidden'}>
        <label htmlFor='pictures'>Image URLs:</label>
        <textarea
          name='pictures'
          id='pictures'
          cols="10"
          rows="10"
          value={promoState.pictures}
          onChange={handlePromoStateChange}
          className='border border-solid w-full'
          placeholder="Add as many URLs as you'd like, each on a new line."
        ></textarea>
      </div>
    </div>
  );
};

export default FormOptionsGroup;
