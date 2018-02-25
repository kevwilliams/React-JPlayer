import React from 'react'
export default class MessagePreview extends React.Component {
	render () {
		return (
			<h2>
				Now Playing: {this.props.value}
			</h2>
		)
	}
}