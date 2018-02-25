import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon } from 'semantic-ui-react';

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

const SongList = ({ list, pattern, onDismiss, onPlay, onSongChange, current }) =>
  <div className="table">
      <Card.Group itemsPerRow={5} stackable>
    {list.filter(isSearched(pattern)).map(item => 
        <Card key={item.arid}>
          <Card.Content>
            <Card.Header>
              <Link style={{ fontSize:'.85em'}} to={`/song/${item.arid}`} onClick={() => onSongChange(item)}>
                {item.title}
              </Link>
            </Card.Header>
            <Card.Meta>
              {item.artists[0].name}
            </Card.Meta>
            <Card.Description>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button.Group widths="two">
              {current !== item.arid && <Button basic animated='vertical' onClick={() => onPlay(item)}>
                <Button.Content hidden>Play</Button.Content>
                <Button.Content visible>
                  <Icon name='play' size="large"/>
                </Button.Content>
              </Button>}
              {current === item.arid && <Button basic animated='vertical' onClick={() => onPlay(item)}>
                <Button.Content>
                  <Icon size="large" name="volume up" />
                </Button.Content>
              </Button>}
              <Button animated onClick={() => onDismiss(item.arid)}>
                <Button.Content hidden>Remove</Button.Content>
                <Button.Content visible>
                  <Icon size="large" name='eject'/>
                </Button.Content>
              </Button>
            </Button.Group>
          </Card.Content>
        </Card>
    )}
    </Card.Group>

  </div>   

export default SongList;

 