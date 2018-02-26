import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid, Header, Icon, Table, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { fetchSongs, playSong, removeSong, filterSongs } from '../actions/songs';
import { setView } from '../actions/app'
import { Search, SongList, Song } from '../components';

class App extends Component {

  constructor(props) {
    super(props);

    this.onPlay = (song) => { this.props.dispatch(playSong(song)) }
    this.onDismiss = (id) => { this.props.dispatch(removeSong(id)) }
    this.onSearchChange = (event) => { this.props.dispatch(filterSongs(event.target.value)); }
  }

  componentDidMount() {
    this.props.dispatch(fetchSongs());
  }

  render() {
    const msg = 'Click a song!';    
    const { songs, current, video, filter } = this.props.songsReducer;
    const { currentView } = this.props.appReducer;

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
            <Grid.Column width={12}>
                <Search 
                  value={filter}
                  onChange={this.onSearchChange}  
                />
            </Grid.Column>
            <Grid.Column width={4} textAlign="right">
              <Button.Group basic size='small'>
                <Button active={currentView === 'grid'} icon="grid layout" onClick={() => this.props.dispatch(setView('grid'))} />
                <Button active={currentView === 'list'} icon="list layout" onClick={() => this.props.dispatch(setView('list'))} />
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
          {currentView == 'grid' && <Grid.Row>
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
          </Grid.Row>}
          {currentView == 'list' && <Grid.Row>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Artist</Table.HeaderCell>
                  <Table.HeaderCell>Song</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
              {songs.map(item => 
                <Table.Row positive={item.arid === current}>
                  <Table.Cell>{item.artists[0].name}</Table.Cell>
                  <Table.Cell>{item.title}</Table.Cell>
                </Table.Row>)}
              </Table.Body>
            </Table>
          </Grid.Row>}
        </Grid> 
        </div>
      </Router>
    );
  }
}
export default connect(state => state)(App);
