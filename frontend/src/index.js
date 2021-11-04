import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import{Provider} from 'react-redux';
import {store} from './redux/store/store';
import GetCalendarLogs from './components/taskBacklog/calendar'


ReactDOM.render(
  <Provider store={store}>
   <div><App /><GetCalendarLogs/></div> 
  </Provider>,
  document.getElementById('root')
);
