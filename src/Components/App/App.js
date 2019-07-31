import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                searchResult: 
                        [{  name: 'Search Results Name 001', 
                            artist: 'Search Results Artist',
                            album: 'Search Results Album',
                            id: '0000001' 
                        }],
                playlistName: 'Test Playlist Name',
                playlistTracks: 
                       [{   name: 'Playlist Track 001', 
                            artist: 'Playlist Artist',
                            album: 'Playlist Album',
                            id: '000002'
                       }]
                };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
    }

    addTrack (track) {
       if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
                return;
        } else {
                this.state.playlistTracks.push(track);
        }
    }

    removeTrack (track) {
        const trackToRemove = this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id);
        const position = this.state.playlistTracks.indexOf(trackToRemove);
        this.state.playlistTracks.splice(position, 1);

    }

    updatePlaylistName (name) {
        this.setState( {
                playlistName: name
                });
    }

    render() {
        return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
               <SearchBar/> 
                <div className="App-playlist">
                    <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResult}/>
                
                    <Playlist onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/> 
                </div>
         </div>
        </div>
        );
    }
}

export default App;
