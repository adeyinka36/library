import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import {HeaderContext} from '../App.js'


class UpdateCourse extends Component{
    constructor(props){
        super(props);
        this.state={
          course:"",
          courseId:"",
          emailAddress:"",
          password:"",
          title:null,
          description:null,
          estimatedTime:"",
          materialsNeeded:"",
          errors:[]
        }
    }

  // here i store values form the form ino the state 
   change=async ()=>{
   console.log(document.getElementById('title').value)
     await this.setState({
        title:document.getElementById('title').value,
        description:document.getElementById('description').value,
        estimatedTime:document.getElementById('estimatedTime').value,
        materialsNeeded:document.getElementById('materialsNeeded').value
      })
     
    }
   
    componentDidMount(){
     
    
      this.props.context.data.getCourseDetail(this.props.match.params.id)
      .then(response=>{if(response.status!==200){
          this.props.history.push('/notFound');return}
         else if(response.status===500){
            this.props.push('/notFound')
            ;return}
         else{
       return response.json()}})
    
      .then(res=>{this.setState({course:res,
        courseId:res.id,
        emailAddress:Cookies.getJSON('authenticatedUser').emailAddress,
      password:Cookies.getJSON("authenticatedUser").password})

      // checking for verification to prevent update by unauthorized
      
      let userId
      if (this.props.context.authentication){
        userId=this.props.context.authentication.id
      }
      else{
        userId=null
      }
      let idVerify= Number(this.state.course.userId)===Number(userId)
      if(!idVerify){
        return this.props.history.push("/forbidden")
      }
    })
    // redirect to forbidden if id stored in cookies isnt the same as the user id return for this course using the ".then" below
    
      
       .catch(err=>console.log(`there was this error ${err}`))
    }

    update=(e)=>{
    e.preventDefault()
  
    try{
  
      // here i store the updates in a variable 
 let updates={title:this.state.title,
                   description:this.state.description,
                  estimatedTime:this.state.estimatedTime,
                materialsNeeded:this.state.materialsNeeded}
      
    // this function tries the update , stores errors in sate if there are any and pushes to appropraite route after
    this.props.context.data.updateCourse(this.state.courseId,updates, this.props.context.authentication.emailAddress,this.props.context.authentication.password)
    .then(err=>{if(err.status !==204){ 
      return err.json()}

      else{
        return this.props.history.push("/")
      }
    })
   
    .then(errors =>{
    
      if(errors){
      
        if(typeof errors===Array){
      
        let errorMessages=errors.map(err=>err.message)
        console.log(errorMessages)
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
    
    .catch(err => {
      console.log(err)
      this.props.history.push('/error');
    });
    
  }catch(err){
    console.log(err)
  }

    }

    // here i check if errors exist in state in order to render them on the form
    render(){
      console.log(`this is the course id : ${this.state.courseId}`)
      console.log(this.state.errors)
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
      

      if(this.state.course){
        return(
    <div>
    <HeaderContext/> 
      
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
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
          <form>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" defaultValue={this.state.course.title}
                     onChange={this.change}/></div>
                <p>{`${this.state.course.User.firstName} ${this.state.course.User.lastName}`}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className=""  defaultValue={this.state.course.description} onChange={this.change}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" onChange={this.change}/></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className=""  defaultValue={this.state.course.materialsNeeded} onChange={this.change}>
</textarea></div>
                  </li>
                </ul>
              </div>
              
            </div>
            <div className="grid-100 pad-bottom"><button className="button" onClick={this.update}>Update Course</button><Link to={`/courses/${this.state.course.id}`}><button className="button button-secondary" >Cancel</button></Link></div>
          </form>
        </div>
        
      </div>
    </div>
    
        )
      }
     return(
       <div>Loading...</div>
     )
  }
 
}

export default UpdateCourse