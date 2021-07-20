import React,{ Component } from 'react';
import './Time.css';

class Time extends Component {
    render() {
        const [min,sec] = [parseInt(this.props.min.split(' ')[0]),parseInt(this.props.min.split(' ')[2])]
        return (
            <div className="Time">
                <p>{min}:{sec}</p>
            </div>
        );
    }
}

export default Time;