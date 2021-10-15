

const createTaskBackLogReducer = (state={}, action) =>{
    switch(action.type){
        case 'CREATE_TASK-REQUEST':
            return{
                loading:true,
            };
        case 'CREATE_TASK-SUCCESFUL':
            return{
                tasklog: action.payload,
            };
        case 'CREATE_TASK-FAIL':
            return{
                loading:false,
                error:action.payload,
             };
        default: 
            return state;

    } 
}
export {createTaskBackLogReducer}