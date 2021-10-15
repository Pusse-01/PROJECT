import axios from 'axios';

const registerUserAction =(email, password)=>{
    return  async dispatch =>{
        try
        {
            dispatch({
                type:'USER_REGISTER_REQUEST',
            });
    
            const config ={
                headers: {
                    'Content-Type': 'application/json',
                },
            };
    
            const data =await axios.post('/auth', {
                email,
                password,
            },
            config
            );
      
            dispatch({
                type:'USER_REGISTER_SUCCESS',
                payload: data,
            });
            //save user
        localStorage.setItem('userAuthData', JSON.stringify(data));

        }
        catch(error)
        {
            dispatch({
                type:'USER_REGISTER_FAIL',
                payload: error.response && error.response.data.message,
            });
        }
    };
};

export {registerUserAction};