import React, { Component } from 'react';
import YouTube from 'react-youtube';

class Song extends Component {

	render() {
		return (
			<div>
				<YouTube
					videoId={this.props.video}
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