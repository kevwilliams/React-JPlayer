import { FETCH_SONGS, SET_SONGS, PLAY_SONG, SET_VIDEO, FILTER_SONGS, REMOVE_SONG } from '../types/songs';

const initState = {
	songs: [],
	current: 0,
	video: 'dQw4w9WgXcQ',
	filter: ''
}

export default ( state = initState, action) => {
	switch(action.type) {
		case FETCH_SONGS:
		return state
		case SET_SONGS:
		return {...state, songs: action.payload.songs}
		case PLAY_SONG:
		return {...state, current: action.payload.song}
		case SET_VIDEO:
		return {...state, video: action.payload.video}
		case REMOVE_SONG:
		    const isNotId = item => item.arid !== action.payload.song;
			return {...state, songs: state.songs.filter(isNotId)}
		case FILTER_SONGS:
		return {...state, filter: action.payload.search}
		default :
		return state
	}
}
