import React,{Component} from 'react';
import './App.css';
import {BrowserRouter,
       Route,
       Switch} from 'react-router-dom';
import Header from './components/Header.js';
import Courses from './components/Courses.js';
import withContext from './components/Context.js';
import CourseDetail from './components/CourseDetail.js';
import UpdateCourse from './components/UpdateCourse.js';
import UserSignIn from './components/UserSignIn.js';
import SignOut from './components/UserSignOut.js';
import CreateCourse from './components/CreateCourse.js';
import UserSignUp from './components/UserSignUp.js';
import PrivateRoute from './components/PrivateRoute.js'
import NotFound from './components/NotFound.js'
import Forbidden from './components/Forbidden.js'
import UnhandledError from './components/UnhandledError.js'







const CoursesWithContext= withContext(Courses)
const CourseDetailContext=withContext(CourseDetail)
const CourseUpdateContext= withContext(UpdateCourse)
const SignInContext=withContext(UserSignIn)
const SignOutContext=withContext(SignOut)
const CreateCourseContext=withContext(CreateCourse)
const SignUpContext=withContext(UserSignUp)
export const HeaderContext=withContext(Header)

class  App extends Component {
   constructor(props){
     super(props);
     this.state={
       authentication:null
     }
   }


   
   render(){
     
  return (
    
    <div className="App">
    <BrowserRouter>
      
        
        <Switch>
        <Route exact path="/" component={CoursesWithContext}/>
        <PrivateRoute  exact path="/courses/create" component={CreateCourseContext}/>
        
        <PrivateRoute   path="/courses/:id/update" component={CourseUpdateContext}/>
      
        <Route   exact path="/courses/:id" component={CourseDetailContext}/>
        <Route   exact path="/signin" component={SignInContext}/>
        <Route   exact path="/signup"  component={SignUpContext}/>
        <Route  exact path="/signout" component={SignOutContext}/>
        <Route  exact path="/forbidden"   component={Forbidden}/>
        <Route exact path="/unhandledError" component={UnhandledError}/>
        <Route  path="/notFound" component={NotFound}/>
        <Route  component={NotFound}/>
        </Switch>
         
      
    
    </BrowserRouter>
     
    </div>
  );
}
}

export default App;

