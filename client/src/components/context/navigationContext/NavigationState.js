import React, {useReducer} from 'react';
import NavigationContext from './NavigationContext'
import NavigationReducer from './NavigationReducer'

const NavigationState = (props) => {

    const initialState = {
        theme: 'main',
        location: null
    }

    const [state, dispatch] = useReducer(NavigationReducer, initialState)


    const changeTheme = () => {
        dispatch({type: 'CHANGE_THEME'})
    }

    const getLocation = () => {
        dispatch({type: 'GET_LOCATION'})
    }

    return (
        <NavigationContext.Provider
        value={{
            changeTheme,
            getLocation,
            location: state.location
        }}
        >
            {props.children}
        </NavigationContext.Provider>
    )
}

export default NavigationState;