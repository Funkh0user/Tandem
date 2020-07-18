
export default (state, action) => {
	switch (action.type) {
		case 'CHANGE_THEME':
			return { ...state, location: window.location.href };
		default:
			console.log('default case')
			return { ...state };
	}
};
