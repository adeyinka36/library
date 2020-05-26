import React , { Component} from 'react';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {HeaderContext} from '../App.js'



class CourseDetail extends Component{
    constructor(props){
        super(props);
     this.state={
       course:"",
       id:"",
       userId:"",
       emailAddress:"",
       password:""
     }
    }

deleteCourse=async(e)=>{
  e.preventDefault()

  await this.props.context.data.deleteCourse(this.state.id,this.props.context.authentication.emailAddress,this.props.context.authentication.password)
.then(res=>{if(res.status===204){
  this.props.history.push("/")
  
}
else if(res.status===400){
  this.props.history.push("/forbidden")
  return
}
else{
  this.props.history.push("/error")
  return
}})
  
}

    componentDidMount=()=>{
    
      
     
      this.props.context.data.getCourseDetail(this.props.match.params.id)
      .then(response=>{if(response.status!==200){ return this.props.history.push("/NotFound")}
      else{
       return response.json()
      }})
      .then(res=>{
        console.log(res)
        this.setState({course:res,
                        id:res.id,
                      userId:res.User.id
                      
        })})

    
       
    
     .catch(err=>{
      this.props.history.push("/NotFound")
      
       return})
    }
    render()
    {
  // here i make sure userid is he same as the id of the creator of the current course in order  to render update and delete
let userId
if (this.props.context.authentication){
  userId=this.props.context.authentication.id
}
else{
  userId=null
}
let idVerify= Number(this.state.course.userId)===Number(userId)



let shouldUpdateRender
 if(idVerify){
   shouldUpdateRender=true
 }
 else{
   shouldUpdateRender=false
 }

if(this.state.course){
return(
    <div>
    <HeaderContext/>
      
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">{ shouldUpdateRender?<span><Link className="button" to={`/courses/${this.state.id}/update`}>Update Course</Link><button className="button" onClick={this.deleteCourse}>Delete Course</button></span>:null}<Link
                className="button button-secondary" to="/">Return to List</Link></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>{`${this.state.course.User.firstName} ${this.state.course.User.lastName}`}</p>
            </div>
            <div className="course--description">
              <p>{this.state.course.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                     <ReactMarkdown source={this.state.course.materialsNeeded}/>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
      );
}
  
    return(
      <div>
         Loading..
      </div>
    )
  
}
}


export default CourseDetail