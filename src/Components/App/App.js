import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

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
    }
    
    render() {

        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar/>
                    <div className="App-playlist">
                        <SearchResults searchResults = {this.state.searchResults} />
                        <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
