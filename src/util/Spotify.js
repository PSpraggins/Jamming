let accessToken ;
const clientID = '';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        } 

        //check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=[^&]*/);

        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            //This clears the paramaters, allowing us to grab a new access token when it expires.
            window.setTimeout(() => accessToken = '', expiresIn * 1000); 
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else{
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }
    },
    search(searchTerm){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, 
            {headers: {Authorization: `Bearer ${accessToken}`}}
        ).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            } 
            return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
            }))
        })
        
    
    },
    savePlaylist(playlistName, trackURIs){
        const accessToken = this.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userID; 

        if(!playlistName || !trackURIs.length){
            return;
        }

        return fetch(`https://api.spotify.com/v1/me`, {headers: headers}).then(
            response => response.json()
        ).then(jsonResponse => {
            userID = jsonResponse.id
        });
        
    }
};

export default Spotify;