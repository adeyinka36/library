import React from 'react'
import {HeaderContext} from '../App.js'

const UnhandledError=()=>{
    return(
        <div>
        <HeaderContext/>
        <div className="error">An unexpected error has occured</div>
        </div>
    )
}


export default UnhandledError