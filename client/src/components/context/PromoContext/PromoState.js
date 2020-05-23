import React, { useState, useContext, useReducer } from 'react';
import PromoContext from './PromoContext';
import PromoReducer from './PromoReducer';

const PromoState = (props) => {
  const initialState = {
    showOptions: null,
    isExpanded: null,
    lat: '',
    lng: '',
    name: '',
    type: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    description: '',
    links: '',
    pictures: '',
    files: '',
  };

  const [state, dispatch] = useReducer(PromoReducer, initialState);

  // console.log(state)

  const expand = () => {
    try {
      dispatch({ type: 'EXPAND_CARD' });
    } catch (error) {
      console.log('There was an error', error);
    }
  };

  return (
    <PromoContext.Provider
      value={{
        isExpanded: state.isExpanded,
        expand,
      }}
    >
      {props.children}
    </PromoContext.Provider>
  );
};

export default PromoState;
