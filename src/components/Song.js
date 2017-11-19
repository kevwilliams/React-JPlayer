import React, { Component } from 'react';

class Song extends Component {

	constructor(props) {
    super(props);

		this.state = {
			song: props.song,
			album: props.song.releases[0]
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState((prevState, props) => ({ 
      song: nextProps.song,
      album: nextProps.song.releases[0] 
    }));
	}

	hasAlbum() {
		return this.state.album !== null;
	}

	render() {
		const { song, album } = this.state;

		return (
			<div>
			  { this.hasAlbum() && 
			  	<img 
			  	 	alt={album.title}
				  	style={{ height:'20vw' }} 
				  	src={album['artwork'][0] ? album['artwork'][0].url : ''}
					/>
				}
				<div>
			      <ul>{song.artists.map(artist => (
			          <li key={artist.arid}>Artist: {artist.name}</li>
			        ))}
			      </ul>
	      </div>	
			  <p>Song: {song.title}</p>
			  { this.hasAlbum() && 
			  	<p>Album: {album.title}</p>
			  }
			</div>  
		);
	}
}

export default Song;