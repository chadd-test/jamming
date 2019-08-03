import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.renderAction = this.renderAction.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClass = this.handleClass.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this); 
    }

    renderAction (isRemoval) {
        if (isRemoval === 'true') {
            return '-';
        } else {
            return '+';
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track); 
    }
    
    removeTrack() {
        this.props.onRemove(this.props.track); 
    } 

    handleClick (isRemoval) {
        if (this.props.isRemoval === 'true') {
           this.removeTrack();
        } else {
            this.addTrack(); }
    }
    
    handleClass (isRemoval) {
        if (isRemoval === 'true') {
            return '';
        } else {
            return 'Track-action';
        }
    }

    render () {
        const classResult = this.handleClass(this.props.isRemoval);
        
        return (

        <div className="Track">
          <div className="Track-information">
            
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p> 
                
        </div>
         
            <button className={classResult} onClick={this.handleClick}> 

                {this.renderAction(this.props.isRemoval)} 

            </button> 
        </div>

            )
        
    }

}

export default Track;
