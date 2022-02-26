import Injector from 'lib/Injector';
import { combineReducers } from 'redux';
import TodoReducer from 'state/todo/TodoReducer';


export default () => {
  Injector.reducer.registerMany({
    todo: TodoReducer,
  });
};
