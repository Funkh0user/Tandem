
export default (state, action) => {
	switch (action.type) {
		case 'CHANGE_THEME':
			//get window location
			//change theme color accordingly.
			console.log('trigger change theme')
			return { ...state, location: window.location.href };
		default:
			console.log('default case')
			return { ...state };
	}
};
