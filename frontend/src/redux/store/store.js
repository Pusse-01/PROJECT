import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createTaskBackLogReducer} from '../reducers/TaskBackLog/createTaskBacklogReducer';
import {userReducer} from '../reducers/Users/userAuthReducer';

const middlewares =[thunk];

const reducer = combineReducers({
    taskLogcreated:createTaskBackLogReducer,
    userRegister:userReducer,
});


const store =createStore(reducer,composeWithDevTools(applyMiddleware(...middlewares)));


export {store};

