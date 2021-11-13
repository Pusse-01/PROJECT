import React, {Component} from 'react'
import "./timeLogs.css"

// **** Import this file and use it in each component ********
export default class Timelogsidebar extends Component{
    render(){
        return(
          
      
    <div className="dashboardmainComponent title">
            
            <div className="ps-3 pe-3  mt-3">
              
            <button className="cpbutton col-12 " >
  
            Total hours spent on project <p class="fs-2">4</p></button></div>
    

    
        <div className="ps-3 pe-3  mt-3">
          <button className="ptbutton col-12 " >



          Total hours user has logged<p class="fs-2">3</p>

          
        </button>
        </div>
        
      </div>
           
        )
    }
}
