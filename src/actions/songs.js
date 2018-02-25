import { SET_SONGS, PLAY_SONG, SET_VIDEO, FILTER_SONGS } from '../types/songs';
import { URL } from '../constants';
import moment from 'moment';
import YTSearch from 'youtube-api-search';
import { API_KEY } from '../constants';

export const setSongs = (songs) => {
	return dispatch => {
		dispatch({
			type: SET_SONGS,
			payload: {
				songs
			}
		})
	}
}

export const fetchSongs = () => {
	return dispatch => {
	    const fromDate = '&from=' + moment().subtract(1, 'days').format('Y-M-D') + 'T00:00:00';
	    const toDate = '&to=' + moment().format('Y-M-D') + 'T00:00:00';

	    fetch(`${URL}${fromDate}${toDate}`)
	      .then(response => response.json())
	      .then(songs => dispatch(setSongs(songs.items)))
	      .catch(e => e);
	}
}

export const setVideo = (videoId) => {
	return dispatch => {
		dispatch({
			type: SET_VIDEO,
			payload: {
				video: videoId
			}
		})
	}
}

export const playSong = (song) => {
		
	return dispatch => {
		const search = `${song.artists[0].name} ${song.title}`;
		YTSearch({key: API_KEY, term: search}, (results) => {
			dispatch(setVideo(results[0].id.videoId));
		});

		dispatch({
			type: PLAY_SONG,
			payload: {
				song: song.arid
			}
		})
	}
}


export const filterSongs = (searchTerm) => {
	return dispatch => {
		dispatch({
			type: FILTER_SONGS,
			payload: {
				search: searchTerm
			}
		});
	}
}
