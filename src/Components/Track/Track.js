import React from 'react';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.renderAction = this.renderAction.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this); }

    renderAction () {
        const isRemoval = this.props.isRemoval;
        let status = '';
        let trackStyle = '';
            
        if (isRemoval) {
            status = '-';
        } else {
            status = '+';
            trackStyle = 'Track-action';
        }
    }

    addTrack() {
        const track = this.props.track;
        this.props.onAdd(track);
    }
    
    removeTrack() {
        const track = this.props.track;
        this.props.onRemove(track);
    }

    handleClick () {
        const isRemoval = this.props.isRemoval;
        if (isRemoval) {
           this.removeTrack();
        } else {
            this.addTrack();
        }
    }

    render () {
        return (

        <div className="Track">
          <div className="Track-information">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p> 
         </div>
          <button className={this.renderAction.trackStyle} onClick={this.handleClick}> {this.renderAction.status} </button>
        </div>

            )
        
    }

}

export default Track;
