import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import decks from './decks';

export default combineReducers({
  decks,
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  //   form: formReducer,
});
