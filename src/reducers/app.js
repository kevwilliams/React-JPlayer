import { SET_VIEW } from '../types/app';

const initState = {
	currentView: 'list'
}

export default ( state = initState, action) => {
	switch(action.type) {
		case SET_VIEW:
		return {...state, currentView: action.payload.view}
		default :
		return state
	}
}
