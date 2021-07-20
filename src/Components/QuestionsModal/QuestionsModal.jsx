import React,{ Component } from 'react';
import AUX from '../../auxiliary';
import ScorePage from '../ScorePage/ScorePage';
import Timer from '../Timer/Time'
import './QuestionsModal.css';

class QuestionsModal extends Component {

        state = {
            questions: ['Which table is a permanent database that has an entry for each terminal symbol?','The action of parsing the source program into proper syntactic classes is called','The bottom-up parsing method is also called','The system variable that controls whether or not the image of an object is visible while it is being copied or moved is'],
            asnwers: [{
                options: ['Reductions','Identifier table','Literal table','Terminal table'],
                correct: 'Terminal table'
            },{
                options: ['General syntax analysis','Interpretation analysis','Syntax analysis','Lexical analysis'],
                correct: 'Lexical analysis'
            },{
                options: ['Left-most derivation in reverse','Left-most derivation','Right-most derivation in reverse','Right –most derivation'],
                correct: 'Right-most derivation in reverse'
            },{
                options: ['DRAG MODE','REGENAUTO','IMAG MODE','VIS MODE'],
                correct: 'DRAG MODE'
            }],
            userReply: [null,null,null,null],
            current: 0,
            timer: '1 min 30 sec',
            submitted: false
        }

        componentDidMount() {
            if(!localStorage.getItem('ques')) {
                localStorage.setItem('ques',this.state.current)
            }
            const userReply = localStorage.getItem('userReply')
            const ques = localStorage.getItem('ques')
            if(userReply) {
                const array =  userReply.split(',').map(ele => {
                    if(ele) {
                        return parseInt(ele)
                    }
                    return null
                })
                console.log(array)
                if(parseInt(ques) === 0) {
                    document.querySelector(`.ans-${parseInt(ques)}-${array[parseInt(ques)]}`).classList.add(`option-${parseInt(ques)}-${array[parseInt(ques)]}`)
                }
                this.setSelected(parseInt(ques))
                this.setState({
                    userReply: array,
                    current: parseInt(ques)
                })
            }
            if(!this.props.isSubmitted) {
                let time = this.state.timer.split(' ')
            if(localStorage.getItem('time')) {
                time = localStorage.getItem('time').split(' ')
            }
            this.updateTimer(time)
            }
        }

        updateTimer = (time) => {
            console.log(time)
            let [min,sec] = [parseInt(time[0]),parseInt(time[2])]
            console.log(this.state.timer)
            if(min === 0 && sec === 0) {
                localStorage.removeItem('time')
                this.props.submit()
                return ;
            }
            setTimeout(() => {
                sec = sec - 1
                if(sec < 0){
                    sec = 59
                    min = min -1
                }
                const str = [min,'min',sec,'sec'].join(' ')
                console.log(str)
                if(localStorage.getItem('time')) {
                    localStorage.removeItem('time')
                }
                localStorage.setItem('time',str)
                this.setState({
                    timer: str
                })
                if(!this.props.isSubmitted)
                this.updateTimer(str.split(' '))
            },1000)
        }

        componentDidUpdate(prevProps,prevState) {
            if(this.state.current !== prevState.current) {
                const ans = this.state.userReply[this.state.current]
            if(ans !== null) {
                this.selectAns(ans,this.state.current)
            }
            }
        }

    setSelected(event) {
        for(let i=0; i<4; i++) {
            if(document.querySelector(`.ques-${i+1}`).classList.contains(`tab-${i+1}`)) {
                document.querySelector(`.ques-${i+1}`).classList.remove(`tab-${i+1}`)
            }
        }
        if(typeof(event) === 'number') {
            document.querySelector(`.ques-${event+1}`).classList.add(`tab-${event+1}`)
            this.setState({
                current: event
            })
            localStorage.removeItem('ques')
            localStorage.setItem('ques',event)
        }
        else {
        const selectedClass = event.target.className.split(' ')[1].split('-')[1]
        document.querySelector(`.ques-${parseInt(selectedClass)}`).classList.add(`tab-${parseInt(selectedClass)}`)
        this.setState({
            current: parseInt(selectedClass)-1
        })
        }
    }

    selectAns = (index,ques) => {
        let userReply = [...this.state.userReply]
        if(localStorage.getItem('userReply')) {
            const array = localStorage.getItem('userReply').split(',')
            userReply = array.map(ele => {
                if(ele) {
                    return parseInt(ele)
                }
                return null
            })
        }
            userReply[ques] = index
            for(let i=0; i<4; i++) {
                if(document.querySelector(`.ans-${ques}-${i}`).classList.contains(`option-${ques}-${i}`)) {
                    document.querySelector(`.ans-${ques}-${i}`).classList.remove(`option-${ques}-${i}`)
                }
            }
            document.querySelector(`.ans-${ques}-${index}`).classList.add(`option-${ques}-${index}`)
            localStorage.removeItem('userReply')
            localStorage.removeItem('ques')
            localStorage.setItem('userReply',userReply)
            localStorage.setItem('ques',this.state.current)
            this.setState({
                userReply: userReply,
                current: ques
            })
    }

    previous = () => {
        let count = this.state.current
        if(count > 0) {
            count=count-1;
            this.setSelected(count);
        }
    }

    next = () => {
        let count = this.state.current
        if(count < 3) {
            count=count+1
            this.setSelected(count)
        }
    }

    submit = () => {
        localStorage.removeItem('userReply')
        localStorage.removeItem('ques')
        localStorage.removeItem('time')
        this.props.submit()
        this.setState({
            submitted: true
        })
    }

    home = () => {
        this.props.quizStart()
        this.props.main()
        localStorage.removeItem('time')
        localStorage.removeItem('userReply')
        localStorage.removeItem('ques')
        localStorage.removeItem('time')
        this.setState({
            timer: '1 min 30 sec'
        })
    }

    render() {
        return (
            <div>
                <Timer min={localStorage.getItem('time') ? localStorage.getItem('time') : this.state.timer }/>
                {!this.props.isSubmitted ? <div className="question">
                <header>
                    <ul>
                        <li className="tab ques-1 tab-1" onClick={(e) => this.setSelected(e)}>Ques 1</li>
                        <li className="tab ques-2" onClick={(e) => this.setSelected(e)}>Ques 2</li>
                        <li className="tab ques-3" onClick={(e) => this.setSelected(e)}>Ques 3</li>
                        <li className="tab ques-4" onClick={(e) => this.setSelected(e)}>Ques 4</li>
                    </ul>
                </header>
                <main className="main">
                    <p>{this.state.questions[this.state.current]}</p>
                    <ul>
                        {this.state.asnwers[this.state.current].options.map((option,index) => {
                            return (
                            <AUX>
                            <li className={`option ans-${this.state.current}-${index}`} onClick={() => this.selectAns(index,this.state.current)}>{option}</li>
                            <br />
                            </AUX>);
                        })}
                    </ul>
                </main>
                <div className="navi">
                    <button onClick={this.previous}>&#8592; Previous</button>
                    {this.state.current === 3 ? <button className="submit" onClick={this.submit}>Submit</button> : null}
                    <button onClick={this.next}>Next &#8594;</button>
                </div>
            </div> : <ScorePage userReply={this.state.userReply} answers={this.state.asnwers} home={this.home}></ScorePage>}
            </div>
        );
    }
}

export default QuestionsModal;