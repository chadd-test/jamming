import React from 'react';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render () {
        const tracks = this.props.tracks;

        return (
            <div className="TrackList">

            {tracks.map((track,index) =>
                    <Track key={track.id} track={this.props.tracks[index]} />
            )}
                        
            </div>
               );
     }

}

export default TrackList;
