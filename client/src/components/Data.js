import  {Component} from 'react'


export default class Data extends Component{

    constructor(props){
       super(props);
       this.state={
        authentication:null,
          emailAddress:"",
          password:"",
         
       }
     
    }

    
deleteCourse(id,emailAddress,password){
    return fetch(`http://localhost:5000/api/courses/${id}`,{
        method:"DELETE",
        headers: new Headers({
       "Authorization": "Basic "+ btoa(emailAddress+":"+password)
     })
})
}
   updateCourse(val,obj,emailAddress,password){
       return fetch(`http://localhost:5000/api/courses/${val}`,{
        method:"PUT",
        headers:{
           'Content-Type': 'application/json',
           'Authorization': "Basic "+ btoa(emailAddress+":"+password)  
        },
        body: JSON.stringify(obj)
})
   }
    getCourses(){
       return  fetch(`http://localhost:5000/api/courses`)

    }
    getCourseDetail(val){
        return fetch(`http://localhost:5000/api/courses/${val}`)
    }
    // updateCourse(val){
    //     return fetch(`http://localhost:5000/api/courses/${val}`)
    // }

     signIn  =async (emailAddress,password)=>{
         this._isMounted=true
        // let encodedCrendtials=btoa(`${emailAddress}:${password}`)
        // let unmounted = false
         return fetch(`http://localhost:5000/api/users`,{
             method:"GET",
             headers: new Headers({
            "Authorization": "Basic "+ btoa(emailAddress+":"+password)
          })
    })
 
}


createNewCourse(obj,emailAddress,password){
    return fetch(`http://localhost:5000/api/courses/`,{
             method:"POST",
             headers:{
                'Content-Type': 'application/json',
                'Authorization': "Basic "+ btoa(emailAddress+":"+password)  
             },
             body: JSON.stringify(obj)
    })
}


// CupdateCourse(data,id,emailAddress,password){
//     // 
//     axios.PUT(`http://localhost:5000/api/course${id}`,{
//         headers: {
//         "content-Type" : "application/json",
//         'Authorization': "Basic "+ btoa(emailAddress+":"+password)  
//       },user:data})
// .then(response=>console.log(response))
// }



createUser(obt){
    return fetch(`http://localhost:5000/api/users`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(obt)
});
  
}






}