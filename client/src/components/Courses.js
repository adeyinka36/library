import React ,{Component,Fragment} from 'react';
import { Link } from 'react-router-dom';
import {HeaderContext} from '../App.js'



class Courses extends Component{
    constructor(props){
      super(props);
      this.state={
        courses:[]
      }
    }
   
    
    componentDidMount=()=>{
      
      this.props.context.data.getCourses().then(response=>response.json())
      .then(res=>this.setState({courses:res}))
      .catch(err=>console.log(`here is the error : ${err}`))
    }
  
  
   
  
  
    render()
    
    
    {
      
      if(this.state.courses.length>0){
        const content = this.state.courses.map(course =>{
          return(
              <div key={course.id.toString()} className="grid-33">
              <Link className="course--module course--link" to={`/courses/${course.id}`}>
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
              </Link>
              </div>
          );
        });
        return(
          <Fragment>
          <HeaderContext/>
          <div className="bounds">
              {content}
              <div className="grid-33">
              <Link
                  className="course--module course--add--module"
                  to="/courses/create">
                  <h3 className="course--add--title">
                  <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 13 13"
                      className="add"
                  >
                      <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                  </svg>
                  New Course
                  </h3>
              </Link>
              </div>
          </div>
      </Fragment>
        );
      }
      return(
        <div>
        Loading...
        </div>
      )
    }
  }
export default Courses