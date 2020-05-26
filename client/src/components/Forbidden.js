import React from 'react'
import {HeaderContext} from '../App.js'

const Forbidden =()=>{
    return(
        <div>
        <HeaderContext/>
        <div className="error">
            Sorry access denied
        </div>
        </div>
    )
}


export default Forbidden