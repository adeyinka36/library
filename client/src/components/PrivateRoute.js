import {UserConsumer} from  './Context.js';
import {Redirect,Route} from 'react-router-dom'
import React from 'react'

const   PrivateRoute=  ({component:Component,...rest})=>{

 
    
   return(
       <UserConsumer>
           {context=>(
               <Route
               {...rest}
               render={props=> context.authentication? (<Component {...props}/>):(<
                   Redirect to={{pathname:"/signin",state:{from:props.location}}}/>)}/>
           )}
       </UserConsumer>
   )
}


export default PrivateRoute