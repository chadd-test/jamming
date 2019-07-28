import React from 'react';

class Track extends React.Component {
    renderAction () {
        const status;
        const trackStyle;
            
        if (isRemoval) {
            status = '-';
            trackStyle = '';
        } else {
            status = '+';
            trackStyle = 'Track-action';
        }
    }

    render () {
        return (
        <div className="Track">
          <div className="Track-information">
            <h3>Track Name<h3>
            <p>Track Artist | Track Album <p>
          </div>
          <button className={this.trackStyle}>{this.status}<button>
        </div>
            );
        
            }

}

export default Track;
