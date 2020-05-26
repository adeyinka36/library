import React, {Component} from 'react'
import Data from './Data.js'
import Cookies from 'js-cookie';

const courseContext= React.createContext();

export const UserConsumer= courseContext.Consumer




export class Provider extends Component{
    constructor(){
        super();
        this.data=new Data()
        this.state={
            authentication:Cookies.getJSON('authenticatedUser')||null
        }
        }
make=(user)=>{
          this.setState({authentication:user})
          console.log(this.state.authentication)
          console.log("wow")
        }   
signOut=()=>{
  console.log("signin out")
           Cookies.remove("authenticatedUser")
           Cookies.remove("authenticatedUserNum")
      //    setState doesnt
      this.setState({authentication:null})
    
    }

      
render(){
  const signOut=this.signOut
  const make=this.make
let  authentication=this.state.authentication
    const value ={
          make,
          signOut,
         authentication,
        data:this.data
          }

    return (
      <courseContext.Provider value={value}>
      {this.props.children}
      </courseContext.Provider>
    )
}






}

export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <courseContext.Consumer>
          {context => <Component {...props} context={context} />}
        </courseContext.Consumer>
      );
    }
  }