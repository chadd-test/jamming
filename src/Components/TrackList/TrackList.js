import React from 'react';
import Track from '../Track/Track'; 

class TrackList extends React.Component {
    render () {
        const tracks = this.props.tracks;

        return (
            <div className="TrackList">

            {tracks.map((track,index) =>
                    <Track onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} key={track.id} track={this.props.tracks[index]} />
            )} 
            </div>
               );
     }

}

export default TrackList;
