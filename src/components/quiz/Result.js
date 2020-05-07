import React from 'react';
import { Helmet } from 'react-helmet';
import {RiMedalLine} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import  swal  from '@sweetalert/with-react';


const TITLE = "Result | Quiz app";

class Result extends React.Component {

    constructor (props){
        super(props);
        this.state = {  
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions:0,
            correctAnswers:0,
            wrongAnswers:0,
            hintsUsed:0
        };
    }

    componentDidMount () {
        const { state } = this.props.location;
        if (state) {
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                hintsUsed: state.hintsUsed,
            });
        }
    }


    render() { 

        const submitAlert = () =>{
            swal({
                title: "Thank you so much!",
                icon: "success",
                button: "Ok",
                timer:3000,
              });
        }

        const { state } = this.props.location;
        let stats, remark;
        const userScore = this.state.score;


        if(userScore <= 30 ) {
            remark = 'You need more practice !';
        }
        else if(userScore > 30 && userScore <= 50 ){
            remark = 'Better luck for the next time !';
        }
        else if (userScore >50 && userScore <= 70){
            remark = 'Wow it\'s better !';
        }
        else if(userScore >= 71 && userScore <= 84){
            remark = 'You did it greate!';
        }
        else {
            remark = 'You\'re an absolute genuis!';
        }

        if (state !== undefined){
            stats = (
                <React.Fragment>
                    <div className="m-auto flex justify-center p-0 mt-10">
                        <span className="icon text-indigo-800 text-6xl"><RiMedalLine/></span>
                    </div>
                    <h2 id="result-header" className=" text-indigo-800 text-center">Quiz has ended</h2>
                    <form onSubmit={this.submitForm} className="bg-indigo-200 container shadow-xl rounded px-8 pt-6 pb-8 mb-4 mx-auto mt-12 h-full">
                        <div className="container text-center">
                            <h3 className=" container ">{remark}</h3>
                            {/* &#37 = % */}
                            <h4 className="text-pink-900">Your score is: {this.state.score.toFixed(0)}&#37;</h4> 
                        </div>
                        <div className="container p-12">
                            <span>Total of the number questions: {this.state.numberOfQuestions}</span><br/><br/>
                            <span>Number of attempted questions: {this.state.numberOfAnsweredQuestions}</span><br/><br/>
                            <span>Number of correctAnswers: {this.state.correctAnswers}</span><br/><br/>
                            <span>Number of incorrectAnswers: {this.state.wrongAnswers}</span><br/><br/>
                            <span>Hints used: {this.state.hintsUsed}</span>
                        </div>
                        <section>
                           <Link to="/play/quiz"> <button className="w-32 mr-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"> Play agian!</button></Link>
                           <Link to="/"> <button className="w-32 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="button" onClick={submitAlert}> Submit </button></Link>
                        </section>
                    </form>
                </React.Fragment>
            )
        }
        else{
            stats =(<form className="bg-indigo-200 container text-center shadow-xl rounded px-8 pt-6 pb-8 mb-4 mx-auto mt-12 h-full">
                 <h1>No stats available please take a quiz!</h1>
            </form>)
        }
        
        return (    
            <React.Fragment>
                <Helmet><title>{TITLE}</title></Helmet>
                {stats}
            </React.Fragment>
         );
    }
}
 
export default Result;