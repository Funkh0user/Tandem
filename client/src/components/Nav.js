import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { RiMenu2Line } from 'react-icons/ri';
import { FiMessageSquare } from 'react-icons/fi';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import NavigationContext from './context/navigationContext/NavigationContext'
//a component that creates our navigation bar at the bottom of the page.
const Nav = () => {
    const navigationContext = useContext(NavigationContext)
    const [selected, setSelected] = useState('');

      useEffect(() => {
        //get currently selected nav menu element and set it to state so it can be styled as selected.
        setSelected(document.activeElement.name);
        //get the window location and set the theme color accordingly.
        switch (navigationContext.location) {
          case 'http://localhost:3000/':
            colorSelector('blue');
            break;
          case 'http://localhost:3000/create':
            colorSelector('green');
            break;
          case 'http://localhost:3000/search':
            colorSelector('orange');
            break;
          case 'http://localhost:3000/social':
            colorSelector('purple');
            break;
          default:
            colorSelector('blue');
        }
      }, [navigationContext.location]);
    
      const [color, setColor] = useState('blue');
      const colorSelector = (value) => setColor(value);

  return (
    <nav className='flex justify-around w-full bg-white shadow-lg fixed bottom-0 right-0'>
      <div
        className={
          selected === 'home' ? `border-b-4 border-${color}-700 m-2` : 'm-2'
        }
      >
        <Link name='home' to='/'>
          <AiOutlineHome className={`text-${color}-400 text-4xl`} />
        </Link>
      </div>
      <div
        className={
          selected === 'search' ? `border-b-4 border-${color}-700 m-2` : 'm-2'
        }
      >
        <Link name='search' to='/search'>
          <RiMenu2Line className={`text-${color}-400 text-4xl`} />
        </Link>
      </div>
      <div
        className={
          selected === 'social' ? `border-b-4 border-${color}-700 m-2` : 'm-2'
        }
      >
        <Link name='social' to='/social'>
          <FiMessageSquare className={`text-${color}-400 text-4xl`} />
        </Link>
      </div>
      <div
        className={
          selected === 'create' ? `border-b-4 border-${color}-700 m-2` : 'm-2'
        }
      >
        <Link name='create' to='/create'>
          <AiOutlinePlusCircle className={`text-${color}-400 text-4xl`} />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
