import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchResults: [{
                name: 'Someone You Loved',
                artist: 'Lewis Capaldi',
                album: 'Breach',
                id: 100
            },
            {
                name: 'Everything I Wanted',
                artist: 'Billie Eilish',
                album: 'Single',
                id: 200
            },
            {
                name: 'Does To Me',
                artist: 'Luke Combs Featuring Eric Church',
                album: 'What You See Is What You Get',
                id: 300
            }],
            playlistName: 'myPlaylist',
            playlistTracks: [
                {
                    name: 'The House That Built Me',
                    artist: 'Miranda Lambert',
                    album: 'Revolution',
                    id: 400
                }
            ]
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }
    addTrack(track){
        if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
           return;
        } else{
            this.setState = {
                searchResults: this.state.searchResults,
                playlistName: this.state.playlistName,
                playlistTracks: this.state.playlistTracks.push(track)
            }
        }
        
    }
    removeTrack(track){
        let newPlaylist = this.state.playlistTracks.filter(savedTrack => savedTrack.id === track.id);
        this.setState = {
            searchResults: this.state.searchResults,
            playlistName: this.state.playlistName,
            playlistTracks: newPlaylist
        }
        
    }
    updatePlaylistName(name){
        this.setState = {
            searchResults: this.state.searchResults,
            playlistName: name,
            playlistTracks: this.state.playlistTracks
        }
    }

    savePlaylist(){
        let trackURIs = [];
        this.state.playlistTracks.map(track => {
            trackURIs.push(`spotify:track:${track.id}`);
        })
        return trackURIs;
    }

    search(searchTerm){
        console.log(searchTerm);
    }

    render() {

        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch = {this.search} />
                    <div className="App-playlist">
                        <SearchResults searchResults = {this.state.searchResults}  onAdd = {this.addTrack}/>
                        <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onNameChange = {this.updatePlaylistName} onRemove = {this.removeTrack} onSave = {this.savePlaylist}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
