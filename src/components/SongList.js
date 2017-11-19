import React from 'react';
import Button from 'Button';
import { Link } from 'react-router-dom';

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

const SongList = ({ list, pattern, onDismiss, onPlay, onSongChange }) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(item => 
      <div className="table-row" key={item.arid}>
          <Button 
            onClick={() => onPlay(item.arid)} 
            className="button-inline"
          >
            <i className="material-icons">play_arrow</i>
          </Button>
          <Link to={`/song/${item.arid}`} onClick={() => onSongChange(item)}>
            {item.artists[0].name} - {item.title}
          </Link>
          <div className="song-actions">
            <Button 
              onClick={() => onDismiss(item.arid)} 
              className="button-inline"
            >
              <i className="material-icons">star_border</i>
            </Button>
            <Button 
              onClick={() => onDismiss(item.arid)} 
              className="button-inline"
            >
              <i className="material-icons">clear</i>
            </Button>          
          </div>
      </div>  
    )}    
  </div>   

export default SongList;