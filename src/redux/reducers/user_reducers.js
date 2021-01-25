import * as actionTypes from "../actionTypes";

const initialState = {
  user_history: [],
  new_word: null,
  redirect: false
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
   
    case actionTypes.GET_HISTORY:
      return {
        ...state,
        redirect: false
      };

    case actionTypes.REQUEST_NEW_WORDS:

      return {
        ...state,
        new_word: action.payload,
        redirect: false
    };

    case actionTypes.SAVE_GAME:
      
      let user_history_temp = state.user_history ? state.user_history : []
      user_history_temp.push(action.payload)
      
      return{
        ...state,
        user_history: user_history_temp,
        redirect: true
    }

    case actionTypes.UPDATE_GAME:
      
      let existing_user_history = state.user_history ? state.user_history : []

      existing_user_history = existing_user_history.filter((item,index)=>{
        if(item.id === action.payload.id){
          return action.payload
        }else{
          return item;
        }
      })
      
      return{
        ...state,
        user_history: existing_user_history,
        redirect: true
    }

    default:
      return state;
  }
};

export default userReducers;