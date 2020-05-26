import React from 'react';
import { Link,NavLink} from 'react-router-dom';



 const Header =(props)=>{
 let auth=props.context.authentication
  
  
if(auth){
    return(
            <div className="header">
            <div className="bounds">
                <Link to="/"><h1 className="header---logo">Courses</h1></Link>
                <nav><span>{`Welcome ${auth.firstName} ${auth.lastName}`}</span><NavLink className="signout" to="/signout">Sign Out</NavLink></nav>:
                  
            </div>
            </div>
        
    )}
    else{
    return(
        <div className="header">
        <div className="bounds">
        <Link to="/"><h1 className="header---logo">Courses</h1></Link>
              <nav><NavLink className="signup" to="/signup">Sign Up</NavLink></nav>
             <nav> <NavLink  className="signin" to="/signin">Sign In</NavLink></nav>
        </div>
        </div>
    )
}
 }

export default Header