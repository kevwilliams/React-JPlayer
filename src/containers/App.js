import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import moment from 'moment';

import { URL } from '../constants';
import { Grid, Header } from 'semantic-ui-react';

import {
  Search,
  SongList,
  Song
} from '../components';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      songs: null,
      song: null
    };

    this.handleSongChange = this.handleSongChange.bind(this);

    this.setSongs = this.setSongs.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    this.fetchSongs();    
  }

  fetchSongs() {
    const fromDate = '&from=' + moment().subtract(1, 'days').format('Y-M-D') + 'T00:00:00';
    const toDate = '&to=' + moment().format('Y-M-D') + 'T00:00:00';

    fetch(`${URL}${fromDate}${toDate}`)
      .then(response => response.json())
      .then(songs => this.setSongs(songs.items))
      .catch(e => e);
  }

  setSongs(songs) {
    this.setState((prevState, props) => ({ 
      songs 
    }));
  }

  handleSongChange(song) {
    this.setState((prevState, props) => ({
      song
    }));
  }

  onDismiss(id) {
    const isNotId = item => item.arid !== id;
    const updatedList = this.state.songs.filter(isNotId);
    this.setState({ ...this.state.songs, songs: updatedList });
  }

  onPlay(id) {
    const isOurSong = item => item.arid === id;
    console.log(this.state.songs.find(isOurSong));
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const msg = 'Click a song!';    
    const { searchTerm, songs } = this.state;

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
                  <Song song={songs.find(s => s.arid === match.params.songId)} />
                )}/>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
                <Search 
                  value={searchTerm}
                  onChange={this.onSearchChange}  
                />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              { songs && 
                <SongList 
                  list={songs}
                  pattern={searchTerm}
                  onDismiss={this.onDismiss}
                  onPlay={this.onPlay}
                  onSongChange={this.handleSongChange}
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

export default App;