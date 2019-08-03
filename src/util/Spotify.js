/* Spotify Search */
let accessToken = undefined;
let expiresIn = undefined;
const clientID = '681d13c710284a338877e93e0c36aa3a';
const redirectURL = 'http://localhost:3000/';
const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;

const Spotify = {
    getAccessToken () {
       if (accessToken) {
            return accessToken;
        } 

        let tokenFromURL = window.location.href.match(/access_token=([^&]*)/);
        let expireFromURL = window.location.href.match(/expires_in=([^&]*)/);
 
        if(tokenFromURL && expireFromURL) {
            accessToken = tokenFromURL[1].replace('access_token=', '');
            expiresIn = expireFromURL[1].replace('expires_in=', '');
            
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/'); 
 
       } else {

            window.location = authorizeURL;

        }
    },


    search (term) {
        let searchTerm = term.replace(' ', '%20'); 
        const url = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`; 
        return fetch(url, {
                headers: {'Authorization': `Bearer ${accessToken}`} 
        })
            .then(response => {
                            return response.json();
                    })
            .then(jsonResponse => {
                    let returnArr = [];                
                    if (jsonResponse.tracks) {
                         returnArr = jsonResponse.tracks.items.map(track => {
                            return {
                                    id: track.id, 
                                    name: track.name,
                                    artist: track.artists[0].name,
                                    album: track.album.name,
                                    uri: track.uri
                            }
                        })
                    }

                   return returnArr; 
        })
            .catch(error => {
                    console.log(error)
            })
    },

    getUsername () {
        const url = 'https://api.spotify.com/v1/me';

        return fetch(url,{
            headers: {'Authorization' : `Bearer ${accessToken}`}
        })
            .then(response => {
                return response.json();
            })

            .then(jsonResponse => {
                if(jsonResponse.id) {
                    return jsonResponse.id
                } else {
                    return null;
                }
            })
    },

    createPlaylist (username,playlistName) {
        const url = `https://api.spotify.com/v1/users/${username}/playlists`;

        return fetch(url,{
                method: 'post',
                headers: {'Authorization' : `Bearer ${accessToken}`},
                body: JSON.stringify({name: `${playlistName}`})
            })

            .then(response => {
                return response.json();
            })

            .then(jsonResponse => {
                if(jsonResponse.id) {
                    return jsonResponse.id
                } else {
                    return null;
                }
            }) 

    },

    addToPlaylist (username, playlistId, trackURIs) {
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`; 
        return fetch(url,{
                method: 'post',
                headers: {'Authorization' : `Bearer ${accessToken}`},
                body: JSON.stringify({uris : trackURIs})
        })
        
        .then(response => {
                return response.json();
        })

        .then(jsonResponse => {
                if(jsonResponse.snapshot_id) {
                    return jsonResponse.snapshot_id;
                } else {
                    return 'Error retrieving snapshot';
                } 
        })
    },

    savePlaylist (playlistName, trackURIs) {
        let userID = undefined;
        let playlistID = undefined;
        this.getUsername()
            .then(username => {
                userID = username; 
                return this.createPlaylist(username, playlistName)
            })
            .then(playID => {
                this.addToPlaylist(userID, playID, trackURIs) 
                    .then(id => {
                        playlistID = id;
                    })
            })
        return playlistID;
    }
}

export default Spotify;
