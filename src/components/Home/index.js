////////////////////////////////////////////////////
// imports

// ext lib
import { format } from 'date-fns'

// react
import React, { Fragment } from 'react';

// redux
import { connect } from 'react-redux';
import { getUserHistory } from "../../redux/actions"

// image
import playIcon from '../../images/play.png'

// css
import './home.css'

////////////////////////////////////////////////////
// component

class Home extends React.Component {
    
    ////////////////////////////////////////////////////
    // life cycles

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){

        this.props.getUserHistory()
    }

    componentDidUpdate(prevProps, prevState){
        
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

                    {
                        this.props.user_history.length > 0 && this.renderHistory()
                    }

                    <div className="new-game-container" onClick={()=>{ this.handleNewGameRequest() }}>
                        <button>
                            Play New Game
                        </button>
                    </div>
                </div>
            </Fragment>
        )
    }

    renderHistory(){

        return(
            <div className="history-container">
                <p>History</p>
                <table className="table">
                    <tr>
                        <th className="table-heading">Date</th>
                        <th className="table-heading">Erros</th>
                        <th className="table-heading">Finished</th>
                        <th className="table-heading">Actions</th>
                    </tr>

                    {
                        this.props.user_history.map((item,index)=>{
                            return(
                                <tr>
                                    <td className="table-data">{ format(new Date(item.date), 'MM/dd/yyyy')}</td>
                                    <td className="table-data">{item.error}</td>
                                    <td className="table-data">
                                        <input type="checkbox" disabled="disabled" checked={item.finished}/>
                                    </td>
                                    <td className="table-data">
                                        { !item.finished && 
                                        <div onClick={()=>{ this.handleResumeGameRequest(item) }}>
                                            <img className="play-image" src={playIcon} />  
                                        </div>}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        )
    }

    handleResumeGameRequest = (item) => {

        this.props.history.push('/play/'+item.id, { resume: true })
    }

    handleNewGameRequest(){

        let id = this.getRandomString()
        this.props.history.push('/play/'+id, { id: id })
    }

    getRandomString(){

        var result = '';
        var numbers = '1234567890';
        var numbersLength = 10;
        for ( var i = 0; i < 5; i++ ) {
            result += numbers.charAt(Math.floor(Math.random() * numbersLength));
        }
        return result;
    }
}

////////////////////////////////////////////////////
// redux

const mapStateToProps = (state) => {
    // this method handle response when reducer return anything
    return {
        user_history: state.user_ac_activity.user_history,
    };
  }
  
  const HomeScreen = connect(mapStateToProps, { getUserHistory })(Home)
  export default HomeScreen
