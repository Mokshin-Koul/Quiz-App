import React,{ Component } from 'react';
import './App.css';
import StartPage from './Components/StartPage/StartPage';
import QuestionsModal from './Components/QuestionsModal/QuestionsModal';
class App extends Component {
  state = {
    quizStart: false,
    submitted: false
  }

  componentDidMount() {
    if(localStorage.getItem('ques')) {
      this.setState({
        quizStart: true
      })
    }
  }

  showQuiz = () => {
    this.setState({
      quizStart: true
    })
  }

  isSubmitted = () => {
    this.setState({
      submitted: true
    })
  }

  main = () => {
    this.setState({
      submitted: false
    })
  }

  stop = () => {
    this.setState({
      quizStart: false
    })
  }

  render() {
    return (
      <div className="main-back">
      {!this.state.quizStart ? <StartPage quizStart={this.showQuiz}/> : <QuestionsModal quizStart={this.stop} main={this.main} isSubmitted={this.state.submitted} submit={this.isSubmitted}></QuestionsModal>}
    </div>
    );
  }
}

export default App;
