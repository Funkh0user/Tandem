import React from 'react';
import Nav from './Nav';

const MainStyle = ({ children }) => {

  return (
    <div className='w-full'>
      {children}
      <Nav />
    </div>
  );
};

export default MainStyle;
