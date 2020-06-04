import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
Spotify.getAccessToken();


class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchResults: [],
            playlistName: 'New Playlist',
            playlistTracks: []
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
        this.updateResults = this.updateResults.bind(this);
       
    }
 
    addTrack(track){
        let tracks = this.state.playlistTracks;
        if(tracks.find(savedTrack => savedTrack.id === track.id)){
           return;
        } 
        tracks.push(track);
        this.setState({
            playlistTracks: tracks,
            searchResults: this.updateResults(this.state.searchResults)
        });

        console.log(this.state.playlistTracks);
        
    }
    removeTrack(track){
        let tracks = this.state.playlistTracks;
        tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
        this.setState({playlistTracks: tracks});        
    }
    updatePlaylistName(name){
        this.setState({playlistName: name});
    }

    savePlaylist(){
        const trackUris = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
            this.setState({
                playlistName: 'New Playlist',
                playlistTracks: []
              });
              
        });
        
    }

    search(searchTerm){
        Spotify.search(searchTerm).then(searchResults => {
            
          let results = this.updateResults(searchResults);
          this.setState({
              searchResults: results
          });
          
         
        });
    }
    //Checks to see if any tracks from the searchResults from Spotify API are in the playlist and filters
    //them out
    updateResults(searchResults){
        let results = searchResults;
        let tracks = JSON.stringify(this.state.playlistTracks);
        let newResults = results.filter(result => !tracks.includes(result.id));
        return newResults;
    }
  
    render() {
        
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults searchResults = {this.state.searchResults}   playlistTracks = {this.state.playlistTracks} onAdd = {this.addTrack}/>
                        <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onNameChange = {this.updatePlaylistName} onRemove = {this.removeTrack} onSave = {this.savePlaylist}/>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
