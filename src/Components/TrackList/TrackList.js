import React from 'react';

class TrackList extends React.Component {
    render () {
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => 
                        <li key={this.props.track.id}>
                            <p>{this.props.track.name}</p>
                            <p>{this.props.track.artist}</p>
                            <p>{this.props.track.album}</p>
                        </li>
                        )}
            </div>
               );
     }

}

export default TrackList;
