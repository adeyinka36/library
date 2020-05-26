import React , { Component } from  'react';
import {Link} from 'react-router-dom'
import {HeaderContext} from '../App.js'

class CreateCourse extends Component{
    constructor(props){
        super(props);
        this.state={
          title:null,
          description:null,
          estimatedTime:null,
          materialsNeeded:null,
          error:[]
        }
    }
    change=()=>{
  
      this.setState({
        title:document.getElementById('title').value,
        description:document.getElementById('description').value,
        estimatedTime:document.getElementById('estimatedTime').value,
        materialsNeeded:document.getElementById('materialsNeeded').value
      })
    }
  
  
createCourse= async(e)=>{
  
  e.preventDefault()
  
 
   
  const title=this.state.title
  const description=this.state.description
  const course={title:title,description:description}
this.props.context.data.createNewCourse(course,this.props.context.authentication.emailAddress,this.props.context.authentication.password)
.then(errors =>{
  if(errors.status===201){
     this.props.history.push("/")
  return
  }
  else if(errors.status===500){return this.props.history.push('/error')}
  else{
  return errors.json()}})

  .then(errors =>{
    console.log(errors)
    if(errors){
      this.setState({ 
       error: errors}
    )}
else{
  return console.log("coure has been added")
}
})

.catch(err => {
  console.log(err);
  this.props.history.push('/error');
});

}

   render(){
     let error=this.state.error
     let errList
      if (error.length){
     errList= error.map((error,i)=>{return(
     <li key={i}>{error}</li>
     )})
      }
  

       return(
         <div>
        <HeaderContext/>
        <div className="bounds course--detail">
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
          
            <form>
              <div className="grid-66">
               <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                      onChange={this.change}/></div>
                  <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                  <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.change}></textarea></div>
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
                      <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.change}></textarea></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom"><button className="button"  onClick={this.createCourse}>Create Course</button><Link to="/"><button className="button button-secondary" >Cancel</button></Link></div>
            </form>
            </div>
            </div>
            
          
          
      
       )
   }
}


export default CreateCourse