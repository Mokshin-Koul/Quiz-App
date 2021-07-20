import React,{ Component } from 'react';
import './ScorePage.css';

class ScorePage extends Component {

    state = {
        marks: null
    }

    componentDidMount() {
        let count = 0
        this.props.userReply.forEach((ele,index) => {
            if(this.props.answers[index].options[ele] === this.props.answers[index].correct) {
                count+=1
            }
        })
        
        this.setState({
            marks: count
        })
    }

    render() {
        return (
            <div className="ScorePage">
                <div>
                <p className="cong">Congratulations</p>
                <p className="desc">You Score is:</p>
                <p className="score">{this.state.marks}/4</p>
                <button onClick={this.props.home}>Home</button>
                </div>
            </div>
        );
    }
}

export default ScorePage;