import React,{ Component } from 'react';
import './StartPage.css';

class StartPage extends Component {
    render() {
        return (
            <div className="StartPage">
                <div>
                <p className="Welcome">Welcome to the Quiz App</p>
                <button onClick={this.props.quizStart}>Click to continue and give the Test</button>
                </div>
            </div>
        );
    }
}

export default StartPage;