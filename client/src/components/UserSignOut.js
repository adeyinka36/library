import React from 'react';
import {Redirect} from 'react-router-dom'




export default  (props) => {
  
      props.context.signOut()

return(
    <div>
    
    <Redirect to="/"/>
    </div>
)
}