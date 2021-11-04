import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createBookReducer} from '../reducers/TaskBackLog/calendarReducer';
import {userReducer} from '../reducers/Users/userAuthReducer';

const middlewares =[thunk];

const reducer = combineReducers({
    taskLogcreated:createBookReducer,
    userRegister:userReducer,
});


const store =createStore(reducer,composeWithDevTools(applyMiddleware(...middlewares)));


export {store};

