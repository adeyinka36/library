import React ,{Component} from 'react'
import { Link} from 'react-router-dom';
import {HeaderContext} from '../App.js';
import Cookies from 'js-cookie';

class UserSignUp extends Component{
    constructor(props){
        super(props)
  this.state={
     firstName:"",
     lastName:"",
     emailAddress:"",
     password:"",
     confirmPassword:"",
     errors:[]
  }
}

// belloe i put the values of the input into the component state
  change=()=>{
    this.setState({
      firstName:document.getElementById("firstName").value,
      lastName:document.getElementById("lastName").value,
       emailAddress:document.getElementById("emailAddress").value,
       password:document.getElementById("password").value,
       confirmPassword:document.getElementById("confirmPassword").value,

    })
  }

  // here i store the values from state into variables to make it easier to work with them
submit=(e)=>{
 e.preventDefault()
 try{
  const emailAddress= this.state.emailAddress
  const password=this.state.password
  const confirmPassword=this.state.confirmPassword
  const firstName=this.state.firstName
  const lastName=this.state.lastName
  const signUp= this.props.context.data.createUser
  const newUser={emailAddress,password,firstName,lastName}
  
  // here i check to make sure the password and confirm passowrd from the form match before the signup
  if(password===confirmPassword){
    
    
    signUp(newUser)
    .then(res=>{if(res.status===201)
      {
        // sign them in after sign up
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
            console.log("works")
            res.password=this.state.password
            let user=res
            this.props.context.make(user)
          
            this.setState({authenticated:user,id:res.id,firstname:res.firstName,lastname:res.lastName})
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
          
          Cookies.set("userId",JSON.stringify(this.state.id))
          this.props.history.push("/")
          
          })
          
          
          .catch(err=>console.log(`there was an error siginin in :${err}`))
          }catch(err){
          console.log(`this is the try catch error : ${err}`)
          }finally{
            // this.props.context.data.checkAuthentication()
          }
       }
        else if(res.status===500){ this.props.history.push("/notFound");return}
      else{
        return res.json()
      }
    })
    .then(errors =>{
     
      if(errors){
        //  here i check errors recieved from the backend and store them as an array in state
        if(typeof errors===Array){
          
        let errorMessages=errors.map(err=>err.message)
        
        this.setState({ 
          errors:errorMessages}
      );
        }else {
          
          let errorMessages=errors.message
          this.setState({
            errors:[errorMessages]
          })
        }

      }
    })
        
  
}
  else if(password!==confirmPassword){
    console.log("passwords dont match")
}
 }
catch(err){
 console.log(`there was an error trying to create : ${err}`)
}
}    
    render(){
    
      // here i create a list with errors stored in state and insert them into the form for user to see 
      let error=  this.state.errors
     let errList
      if (error.length){
        
     errList= error.map((error,i)=>{return(
     <li key={i}>{error}</li>
     )})
      }
      else if(typeof error===Object){
        errList=error.message
      }
      
        return(
      <div>
      <HeaderContext/>
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <h1>Create Course</h1>
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
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.change}/></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.change}/></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.change}/></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.change}/></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                  onChange={this.change}/></div>
              <div className="grid-100 pad-bottom"><button className="button" onClick={this.submit}>Sign Up</button><Link  to="/"><button className="button button-secondary">Cancel</button></Link></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
      </div>
    
        )
    }
}



export default UserSignUp