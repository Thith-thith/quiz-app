import React from "react";
import { Helmet } from "react-helmet";
import { RiCoinsLine } from "react-icons/ri";
import { MdAlarm ,MdLiveHelp } from "react-icons/md";
import M from 'materialize-css';
import swal from '@sweetalert/with-react'
 




import questions from "../data/questions.json";
import isEmpty from "../../utils/is_empty";


const TITLE = "Quiz App | Play";

class Play extends React.Component {
  
constructor (props) {
  super(props);
  this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: '',
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 2,
      previousRandomNumbers: [],
      time: {}
  };
  this.interval = null;
}

componentDidMount () {
  const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
  this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
  this.startTimer();
}

componentWillUnmount () {
  clearInterval(this.interval);
}

displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
  let { currentQuestionIndex } = this.state;   
  if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
          previousRandomNumbers: []
      }, () => {
          this.showOptions();
      });
  }     
};

handleOptionClick = (e) => {
  if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctTimeout = setTimeout(() => {
      }, 500);
      this.correctAnswer();
  } else {
      this.wrongTimeout = setTimeout(() => {
      }, 500);
      this.wrongAnswer();
  }
}




correctAnswer = () => {
  M.toast({
      html: 'Correct Answer!',
      classes: 'toast-valid',
      displayLength:300,
  });
  this.setState(prevState => ({
      score: prevState.score + 1,
      correctAnswers: prevState.correctAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
  }), () => {            
      if (this.state.nextQuestion === undefined) {
          this.endGame();
      } else {
          this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      }
  });
}

wrongAnswer = () => {
  M.toast({
      html: 'Wrong Answer!',
      classes: 'toast-invalid',
      displayLength:300,
  });
  this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
  }), () => {
      if (this.state.nextQuestion === undefined) {
          this.endGame();
      } else {
          this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      }
  });
}

showOptions = () => {
  const options = Array.from(document.querySelectorAll('.option'));

  options.forEach(option => {
      option.style.visibility = 'visible';
  });

}

handleHints = () => {
  console.log('hello');
  
  if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll('.option'));
      let indexOfAnswer;

      options.forEach((option, index) => {
          if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
              indexOfAnswer = index;
          }
      });

      while (true) {
          const randomNumber = Math.round(Math.random() * 3);
          if (randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
              options.forEach((option, index) => {
                  if (index === randomNumber) {
                      option.style.visibility = 'hidden';
                      this.setState((prevState) => ({
                          hints: prevState.hints - 1,
                          previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                      }));
                  }
              });
              break;
          }
          if (this.state.previousRandomNumbers.length >= 3) break;
      }
  }
}



startTimer = () => {
  const countDownTime = Date.now() + 600600;
  this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
          clearInterval(this.interval);
          this.setState({
              time: {
                  minutes: 0,
                  seconds: 0
              }
          }, () => {
              this.endGame();
          });
      } else {
          this.setState({
              time: {
                  minutes,
                  seconds,
                  distance
              }
          });
      }
  }, 1000);
}



endGame = () => {
  this.endAlert();
  const { state } = this;
  const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      hintsUsed: 2 - state.hints
  };
  setTimeout(() => {
      this.props.history.push('/play/Result', playerStats);
  }, 1000);
}

endAlert = () => {
  swal("Good job!", "Your game has ended!", "success");
}

  render() {

    const quitAlert = () =>{
      swal({
        title: "Are you sure to close it?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willClose) => {
        if (willClose) {          
          swal("Thank you so much!", {
            icon: "success",
            timer: "3000",
          })
          .then(() => {
            this.props.history.push('/');
          })          
        }
      });
    }



    const { 
      currentQuestion, 
      currentQuestionIndex,        
      hints, 
      numberOfQuestions,
      time 
  } = this.state;

    return (  
      <React.Fragment>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <h4 className="header mt-12 text-center lg:block">Quiz Time</h4>
        <form className=" bg-gray-200 container shadow-xl rounded px-8 pt-6 pb-8 mb-4 mx-auto mt-12 h-full">
          <div className="lifeline fill-current text-xl p-8 flex justify-between">
            <div className="text-teal-600">
              <RiCoinsLine />{currentQuestionIndex + 1} of {numberOfQuestions}
            </div>
            <div className="text-red-600">
              <MdAlarm /> {time.minutes}:{time.seconds}
            </div>
            <div onClick={this.handleHints} className="text-blue-600">
              <MdLiveHelp />{hints}
            </div>
          </div>
          <div className="max-w-4xl mx-auto flex p-8 bg-white rounded-lg shadow-xl h-auto text-2xl">
            <h5>{currentQuestion.question}</h5>
          </div>

          <div className="question container text-xl sm:block">
              <button  type="button" onClick={this.handleOptionClick} className=" option xs:w-2/4 inline-blocklg:w-2/4 lg:my-5 xl:w-2/4  lg:py-3 lg:px-4 bg-teal-400 hover:bg-teal-600 text-white font-bold rounded-full">
                {currentQuestion.optionA}
              </button>
              <button type="button" onClick={this.handleOptionClick} className=" option xs:w-2/4 sm:w-full lg:w-2/4 lg:my-5 xl:w-2/4 lg:py-3 lg:px-4 bg-teal-400 hover:bg-teal-600 text-white font-bold rounded-full">
                {currentQuestion.optionB}
              </button>

              <button type="button" onClick={this.handleOptionClick} className="option xs:w-2/4 sm:w-full lg:w-2/4 lg:my-5 xl:w-2/4 lg:py-3 lg:px-4 bg-teal-400 hover:bg-teal-600  text-white font-bold rounded-full">
                {currentQuestion.optionC}
              </button>
              <button type="button" onClick={this.handleOptionClick} className="option xs:w-2/4 sm:w-full lg:w-2/4 lg:my-5 xl:w-2/4 lg:py-3 lg:px-4 bg-teal-400 hover:bg-teal-600 text-white font-bold rounded-full">
                {currentQuestion.optionD}
              </button>
            </div>
          <button type="button" className=" bg-red-600 hover:bg-red-800 rounded mt-10">
              <button type="button" className="w-32 shadow-lg text-white font-bold py-2 px-4 rounded justify-center text-center" onClick={quitAlert}>quit</button>
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Play;
