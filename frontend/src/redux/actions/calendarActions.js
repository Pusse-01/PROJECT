import axios from 'axios';

const createTaskBackLogAction = (bookData) =>{
    return async (dispatch) =>{
try
{
    dispatch({
        type:'CREATE_TASK-REQUEST',
    });
    const config ={
        'Content-Type': 'application/json'
    };
    const {data} = await axios.post('/api/calendarTaskBackLog', bookData, config);
    
    dispatch({
        type:'CREATE_TASK-SUCCESFUL',
        payload: data,
    });

}
catch(error)
{
    dispatch({
        type:'CREATE_TASK-FAIL',
        payload: error.response && error.response.data.message,
    }); 
}
    };
};

export {createTaskBackLogAction};