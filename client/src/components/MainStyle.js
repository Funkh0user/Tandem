import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { RiMenu2Line } from 'react-icons/ri';
import { FiMessageSquare } from 'react-icons/fi';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const MainStyle = ({ children }) => {
  const [selected, setSelected] = useState('');

  //styles the navigation menu button via selected variable inside ternary operations below
  //@TO-DO sort of buggy, fails to update the color any time the page is redirected or any kind of navigation happens without a button / mouse click
  const handleClick = (e) => {
    setSelected(document.activeElement.name);
    switch (document.activeElement.name) {
      case 'home':
        colorSelector('blue');
        break;
      case 'create':
        colorSelector('green');
        break;
      case 'search':
        colorSelector('orange');
        break;
      case 'social':
        colorSelector('purple');
        break;
    }
  };

  const [color, setColor] = useState('blue');
  const colorSelector = (value) => setColor(value);

  //wrapper component with our bottom navigation bar. 
  //@TO-DO refactor navigation component into seperate component / file
  return (
    <div className='w-full'>
      {children}
      <nav className='flex justify-around w-full bg-white shadow-lg fixed bottom-0 right-0'>
        <div
          className={
            selected === 'home' ? `border-b-4 border-${color}-700 m-2` : 'm-2'
          }
        >
          <Link name='home' to='/' onClick={handleClick}>
            <AiOutlineHome className={`text-${color}-400 text-4xl`} />
          </Link>
        </div>
        <div
          className={
            selected === 'search' ? `border-b-4 border-${color}-700 m-2` : 'm-2'
          }
        >
          <Link name='search' to='/search' onClick={handleClick}>
            <RiMenu2Line className={`text-${color}-400 text-4xl`} />
          </Link>
        </div>
        <div
          className={
            selected === 'social' ? `border-b-4 border-${color}-700 m-2` : 'm-2'
          }
        >
          <Link name='social' to='/social' onClick={handleClick}>
            <FiMessageSquare className={`text-${color}-400 text-4xl`} />
          </Link>
        </div>
        <div
          className={
            selected === 'create' ? `border-b-4 border-${color}-700 m-2` : 'm-2'
          }
        >
          <Link name='create' to='/create' onClick={handleClick}>
            <AiOutlinePlusCircle className={`text-${color}-400 text-4xl`} />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MainStyle;
