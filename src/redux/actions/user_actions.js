import * as actionTypes from "../actionTypes";

export function getUserHistory() {
  
  return {
    type: actionTypes.GET_HISTORY
  }
}

export function saveGame(values) {

  return {
    type: actionTypes.SAVE_GAME,
    payload: values
  }
}

export function updateGame(values){
  return {
    type: actionTypes.UPDATE_GAME,
    payload: values
  }
}

export function getNewWord() {

  let new_word = getRandomString()
  
  return {
    type: actionTypes.REQUEST_NEW_WORDS,
    payload: new_word
  }
}

function getRandomString(){

  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charactersLength = 27;
  for ( var i = 0; i < 10; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}