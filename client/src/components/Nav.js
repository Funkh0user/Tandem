import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { RiMenu2Line } from 'react-icons/ri';
import { FiMessageSquare } from 'react-icons/fi';
import { AiOutlinePlusCircle } from 'react-icons/ai';
const Nav = () => {

    const [selected, setSelected] = useState('');

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
          default:
            colorSelector('blue');  
        }
      };
    
      const [color, setColor] = useState('blue');
      const colorSelector = (value) => setColor(value);
  return (
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
  );
};

export default Nav;
