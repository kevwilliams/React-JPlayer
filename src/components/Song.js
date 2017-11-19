import React, { Component } from 'react';
import YouTube from 'react-youtube';
import YTSearch from 'youtube-api-search';
import { API_KEY } from '../constants';

class Song extends Component {

	constructor(props) {
	    super(props);

		this.state = {
			song: props.song,
			album: props.song.releases[0],
			video: 'dQw4w9WgXcQ'
		}

		this.getVideo = this.getVideo.bind(this);
	}

	componentDidMount() {
		this.getVideo(this.state.song);
	}

	componentWillReceiveProps(nextProps) {
		this.getVideo(nextProps.song);
	}

	getVideo(song) {
		const search = `${song.artists[0].name} ${song.title}`;
		YTSearch({key: API_KEY, term: search}, (results) => {
			this.setState((prevState, props) => ({ 
	      		song: song,
	      		album: song.releases[0],
	      		video: results[0].id.videoId
	    	}));
		});
	}

	hasAlbum() {
		return this.state.album !== null;
	}

	render() {
		return (
			<div>
				<YouTube
					videoId={this.state.video}
					opts = {{
						width:'100%',
				 		playerVars: { 
					 		autoplay: 0
					 	},
					}}
				/>
			</div>  
		);
	}
}

export default Song;