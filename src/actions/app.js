import { SET_VIEW } from '../types/app';

export const setView = (view) => {
	return dispatch => {
		dispatch({
			type: SET_VIEW,
			payload: {
				view
			}
		})
	}
}