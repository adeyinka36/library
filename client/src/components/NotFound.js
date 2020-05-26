import React from 'react';
import {HeaderContext} from '../App.js'

const NotFound=()=>{
    return(
    <div>
    <HeaderContext/>
    <div className="error">
       Sorry this resource was not found
    </div>
    </div>
    )
}

// console.log 


export default NotFound