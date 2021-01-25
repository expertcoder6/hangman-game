////////////////////////////////////////////////////
// imports

// react
import React, { Fragment } from 'react';

// redux
import { connect } from 'react-redux';
import { getNewWord, saveGame,updateGame } from "../../redux/actions"

// images
import Clock from '../../images/clock.png'
import Reload from '../../images/reload.png'

// css
import './Play.css'

// constants
let time_interval

////////////////////////////////////////////////////
// component

class Play extends React.Component {
    
    ////////////////////////////////////////////////////
    // life cycles

    constructor(props){
        super(props);
        this.state = {
            timer: 100,
            typedLetter: null,
            selected_letters: [],
            count_faults: 0
        }
    }

    componentDidMount(){
        
        // check if game is new or resume of saved state
        if(this.props.location.state && this.props.location.state.resume){
            this.setState({
                isResume: true
            })
        }


        // request for new word
        this.requestForNewWord()

        // interval
        time_interval = setInterval(()=>{
            this.setState({
                timer: this.state.timer - 1
            })
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState){

        // check update for new word
        if(prevProps.new_word !== this.props.new_word && this.props.new_word){

            console.log("current word is =>" + this.props.new_word)
            this.setState({
                game_word_arr: this.props.new_word.split(''),
                game_word: this.props.new_word,
                timer: 100,
                selected_letters: []
            })
        }

        // check whether system need redirection
        if(prevProps.redirect !== this.props.redirect){
            this.props.history.push('/')
        }

        // check if timer 
        if(this.state.timer===0){

            this.handleSaveGame(true)
            clearInterval(time_interval)
        }
    }

    ////////////////////////////////////////////////////
    // render

    render(){
        return(
            <Fragment>
                <div className="container">
                    <div className="title-container">
                        <p className="title-text">The hangman Game</p>
                    </div>
                    
                    {/*
                        // timer, actual words and refresh word 
                    */}

                    <div className="info-container">
                        <div className="row">
                            <img src={Clock} className="play-image" />
                            <p style={{ marginLeft: 5 }}>{this.state.timer}</p>
                        </div>

                        <div className="game-word-container">
                            {
                                this.state.game_word_arr && this.state.game_word_arr.map((item,index)=>{
                                    if(this.state.selected_letters.includes(item)){
                                        return(
                                            <p style={{ marginLeft: 3, marginRight: 3 }}>{item}</p>
                                        )
                                    }else{
                                        return(
                                            <p>_</p>
                                        )
                                    }
                                })
                            }
                        </div>

                        <div className="row" onClick={()=>{this.requestForNewWord()}}>
                            <img src={Reload} className="play-image" />
                            <p style={{ marginLeft: 5}}>New Word</p>
                        </div>
                    </div>
                    
                    {/*
                        // ui for all input buttons
                    */}

                    <div className="input-container">
                        <div className="button-container">
                            { this.renderUIForInputButton('A') }
                            { this.renderUIForInputButton('B') }
                            { this.renderUIForInputButton('C') }
                            { this.renderUIForInputButton('D') }
                            { this.renderUIForInputButton('E') }
                            { this.renderUIForInputButton('F') }
                        </div>

                        <div className="button-container">
                            { this.renderUIForInputButton('G') }
                            { this.renderUIForInputButton('H') }
                            { this.renderUIForInputButton('I') }
                            { this.renderUIForInputButton('J') }
                            { this.renderUIForInputButton('K') }
                            { this.renderUIForInputButton('L') }
                        </div>

                        <div className="button-container">
                            { this.renderUIForInputButton('M') }
                            { this.renderUIForInputButton('N') }
                            { this.renderUIForInputButton('O') }
                            { this.renderUIForInputButton('P') }
                            { this.renderUIForInputButton('Q') }
                            { this.renderUIForInputButton('R') }
                        </div>

                        <div className="button-container">
                            { this.renderUIForInputButton('S') }
                            { this.renderUIForInputButton('T') }
                            { this.renderUIForInputButton('U') }
                            { this.renderUIForInputButton('V') }
                            { this.renderUIForInputButton('W') }
                            { this.renderUIForInputButton('X') }
                        </div>

                        <div className="button-container">
                            { this.renderUIForInputButton('Y') }
                            { this.renderUIForInputButton('Z') }
                        </div>
                    </div>

                    <div className="action-button-container" onClick={()=>{this.handleSaveGame(false)}}>
                        <button>Save Game</button>
                    </div>

                </div>
            </Fragment>
        )
    }

    ////////////////////////////////////////////////////
    // helper: render

    // render ui for buttons
    renderUIForInputButton(letter){
        
        let selected_letters = this.state.selected_letters

        return(
            <button 
                style={{ marginLeft: 5, marginRight: 5 }} 
                onClick={()=>{this.saveToSelectedLetters(letter)}}
                disabled = { selected_letters.includes(letter) }
            >
                {letter}
            </button>
        )
    }

    // used for request new word
    requestForNewWord(){

        this.props.getNewWord()
    }

    ////////////////////////////////////////////////////
    // helper: action

    // handle to add selected letters
    saveToSelectedLetters(letter){

        let selected_letters = this.state.selected_letters
        selected_letters.push(letter)
        this.setState({
            selected_letters: selected_letters,
            timer: 100
        })

        // check if all letters are revealed or not
        this.checkStatusOfWords(selected_letters)
    }

    // handle action for save game
    handleSaveGame(isfinished){

        // get id 
        let pathname = window.location.pathname
        let path_arr = pathname.split('/')
        
        let actual_faults = this.state.selected_letters.length - 10
        let current_game_state = {
            error: actual_faults > 0 ? actual_faults : 0,
            date: new Date(),
            finished: isfinished,
            id: path_arr[path_arr.length - 1]
        }

        if(this.state.isResume){
            this.props.updateGame(current_game_state)
        }else{
            this.props.saveGame(current_game_state)
        }
    }

    // check whether all letters are revealed or not
    checkStatusOfWords(){

        let resultent_arr = this.state.game_word_arr.filter((item,index)=>{
            let is_exist = this.state.selected_letters.includes(item)
            if(is_exist){
                return item;
            }
        })

        if(resultent_arr.length === this.state.game_word_arr.length){
            alert('Congratualations!!!, you won the game')
            this.handleSaveGame(true)
        }
    }
}

////////////////////////////////////////////////////
// redux

const mapStateToProps = (state) => {
    
    return {
        new_word: state.user_ac_activity.new_word,
        user_history: state.user_ac_activity.user_history,
        redirect: state.user_ac_activity.redirect,
    };
  }
  
  const PlayScreen = connect(mapStateToProps, { getNewWord,saveGame,updateGame })(Play)
  export default PlayScreen
