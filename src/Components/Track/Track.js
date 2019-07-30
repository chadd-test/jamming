import React from 'react';

class Track extends React.Component {
        /*    renderAction () {
        const status = '';
        const trackStyle = '';
            
        if (isRemoval) {
            status = '-';
        } else {
            status = '+';
            trackStyle = 'Track-action';
        }
    } */

    render () {
        return (

        <div className="Track">
          <div className="Track-information">
            <h3>Track: {this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p> </div>
          <button className={this.trackStyle}> {this.status} </button>
        </div>

            )
        
    }

}

export default Track;
