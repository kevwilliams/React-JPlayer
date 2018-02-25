import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { fetchSongs, playSong, filterSongs } from '../actions/songs';

import {
  Search,
  SongList,
  Song
} from '../components';

class App extends Component {

  constructor(props) {
    super(props);

    this.onPlay = this.onPlay.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchSongs());
  }

  onDismiss(id) {
    const isNotId = item => item.arid !== id;
    const updatedList = this.state.songs.filter(isNotId);
    this.setState({ ...this.state.songs, songs: updatedList });
  }

  onPlay(song) {
    this.props.dispatch(playSong(song));
  }

  onSearchChange(event) {
    this.props.dispatch(filterSongs(event.target.value));
  }

  render() {
    const msg = 'Click a song!';    
    const { songs, current, video, filter } = this.props.songsReducer;
    return (
      <Router>
        <div>
        <Grid doubling container style={{ padding:'5px' }}>
          <Grid.Row>
            <Grid.Column>
              <Route path="/" exact={true} render={() => (
                <Header as='h2'>{msg}</Header>
              )}/>
              {songs && (
                <Route path="/song/:songId" render={({ match }) => (
                  <Song video={video} song={songs.find(s => s.arid === match.params.songId)} />
                )}/>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
                <Search 
                  value={filter}
                  onChange={this.onSearchChange}  
                />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              { songs && 
                <SongList 
                  list={songs}
                  pattern={filter}
                  onDismiss={this.onDismiss}
                  onPlay={this.onPlay}
                  current={current}
                />
              }
            </Grid.Column>
          </Grid.Row>
        </Grid> 
        </div>
      </Router>
    );
  }
}
export default connect(state => state)(App);
