import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                searchResult: [],
                playlistName: 'New Playlist',
                playlistTracks:[]
                };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack (track) {
       if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
                return;
        } else {
                const updatePlaylist = this.state.playlistTracks.concat(track);
                this.setState({
                        playlistTracks: updatePlaylist 
                });
        } 
    }

    removeTrack (track) {
        const updatePlaylist = this.state.playlistTracks.filter(savedTrack => {
            if(!(savedTrack.id === track.id)) {
                return savedTrack;
            } else {
            return null;
            }
        });

        this.setState({
                playlistTracks: updatePlaylist
        });
    }

    updatePlaylistName (name) {
        this.setState( {
                playlistName: name
                });
    }

    savePlaylist () {
        const trackURIs = [];
        let playlistName = this.state.playlistName;

        this.state.playlistTracks.map(track =>
             trackURIs.push(track.uri)
        );
    
        Spotify.savePlaylist(`'${playlistName}'`, trackURIs) 
        
        this.setState({
                playlistName: 'New Playlist',
                playlistTrack: []
            })
            
    }

    search (searchTerm) {
        Spotify.search(searchTerm)
            .then(updateSearch =>
                this.setState({
                        searchResult: updateSearch
                })
            );
    } 

    render() {

        return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
         
<SearchBar onSearch={this.search}/> 
                
                <div className="App-playlist">

<SearchResults onAdd={this.addTrack} searchResults={this.state.searchResult}/>
                
<Playlist onSave={this.savePlaylist} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/> 
           </div>
          </div>
        </div>
        );
    }
}

export default App;
