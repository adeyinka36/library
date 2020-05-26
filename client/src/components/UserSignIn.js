import React, {Component} from 'react';
import {Link}from 'react-router-dom';
import Cookies from 'js-cookie';
import {HeaderContext} from '../App.js'




class UserSignIn extends Component{
    constructor(props){
        super(props);
        this.state={
          authenticated:null,
         passwordn:null,
         emailAddress:null,
         id:"",
         firstname:null,
         lastname:null,
         error:[]
        }
    }


change=(e)=>{
  // here i store form values into state
  this.setState({
    password:document.getElementById('password').value,
    emailAddress:document.getElementById('emailAddress').value
  })
}

submit= async (event)=>{
event.preventDefault();
// here i get the value of previous location from  props if there has been a redirect
const { from } = this.props.location.state || { from: { pathname: '/courses' } }


 try{
const emailAddress= this.state.emailAddress
const password=this.state.password
const signIn= this.props.context.data.signIn

signIn(emailAddress,password)

.then(res=>{if(res.status===401){
  this.setState({error:"Invalid credentials"})
  return
  
  
}
else if(res.status===500){return this.props.history.push("/notFound")}
else{
  
  return res.json()
}
})
.then(res=>{
  
  res.password=this.state.password
  let user=res
  this.props.context.make(user)

  this.setState({authenticated:user,id:res.id,firstname:res.firstName,lastname:res.lastName})
  Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });

Cookies.set("userId",JSON.stringify(this.state.id))
this.props.history.push(from)

})


.catch(err=>console.log(`there was an error siginin in :${err}`))
}catch(err){
console.log(`this is the try catch error : ${err}`)
}finally{
  // this.props.context.data.checkAuthentication()
}


}
    render(){

      // here i check if errors exist in state so that i can render them into the form
      let error=  this.state.error
      let errList
       if (error.length){
         errList=<li>{error}</li>
      
       }
       
      return(
       <div>
          <HeaderContext/>
            <div className="bounds">
            
              <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                {error.length?<div>
            {/* vlidation errors/error */}
            <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
              {errList}
              </ul>
            </div>
          </div>
          </div>:null}
                <div>
                  <form>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.change}/></div>
                    <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.change}/></div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={this.submit}>Sign In</button><Link to="/"><button className="button button-secondary"  >Cancel</button></Link></div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
              </div>
            </div>
          </div>
        
        )
    }
}

export default UserSignIn