const express = require('express');
const router= express.Router();
const models= require('../models');
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');
const mongoose = require("mongoose");
const { User }= models;
const { Course }= models;



// connect to database
const db=`mongodb+srv://adeyinka36:Nitrogene2000@cluster0-kni2n.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(db
    ,{
    useUnifiedTopology: true ,
        useNewUrlParser: true }
        )

// authentication middlewear

const authenticate= async (req,res,next)=>{
  console.log(`from authenticate:${req.body}`)
  
   let  message = null
   const credentials= auth(req)
   
   if(credentials){
     let gottenUsers
await User.find().then(response=>gottenUsers=response)
      //  let  gottenUsers =  await User.findAll();
      //  gottenUsers=gottenUsers.map(u=>u.toJSON());

       const foundUser = gottenUsers.find(u=>u.emailAddress===credentials.name);

        if(foundUser){
            const authenticated = bcrypt.compareSync(credentials.pass, foundUser.password);
        
            if(authenticated){
            req.currentUser = foundUser
            console.log("assigned")
            }
            else{
            message= "Incorrect password "
            }
        }else{
            message= "User not found"
        }
    

    }else{
        message="Plese provide credentials"
    }
  if(message){
      const err = new Error(message)
      err.status=401
      next(err)
  }
  else{
      next()
  }

}





// function for validating  e-mail with regular expression
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

// home route
// setup a friendly greeting for the root route
router.get('/',(req, res) => {
      
    
    res.json({
      message: 'Welcome to the REST API project!',
    });
  });

  
//   return currently authenticated user
  router.get('/users',authenticate,async (req,res)=>{
     console.log(`getuser route line 87 ${req.currentUser}`)
     user=req.currentUser
    res.status(200).json({id:user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress})
  });

  
  
 // Creates a user, sets the Location header to "/", and returns no content 
  router.post('/users',async(req,res,next)=>{
  
    let dataBaseEmails
      const userPassword = req.body.password
      const email=req.body.emailAddress
      const emailValidationResult= validateEmail(email);

      
      await User.find().then(response=>dataBaseEmails=response )
      
      // let  dataBaseEmails= await User.find();
        //  dataBaseEmails= dataBaseEmails.map(m=>m.toJSON())


         const doesEmailAlreadyExist= dataBaseEmails.find(e=>e.emailAddress===email)
         if(!req.body.emailAddress&&!req.body.password&&!req.body.firstName&!req.body.lastName){res.status(400).json({message:"Please provide values for all input fields"})}
         if(!req.body.password&&!req.body.emailAddress){res.status(400).json({message:"Please provide valid emailaddress and password"})}
         if(!req.body.password){res.status(400).json({message:"Please provide valid  password"})}
         if(!req.body.emailAddress){res.status(400).json({message:"Please provide valid emailaddress"})}
         if(!req.body.firstName){res.status(400).json({message:"Please make sure name fields are filled"})}
         if(!req.body.lastName){res.status(400).json({message:"Please make sure name fields are filled"})}
if(emailValidationResult && !doesEmailAlreadyExist ){
    if(!req.body.password){ return res.status(400).json({message:"please provide valid password"})}

      try{
          req.body.password=bcrypt.hashSync(req.body.password)
          const newUser=await User(req.body)
           await newUser.save()
        res.setHeader("location","/")
        return res.status(201).end()
      }catch(error){
        
        if(error.name=== 'ValidationError'){
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
            return res.status(400).json(errors)
        }
        
        console.log(`this is not a validation error: ${error}`)
        return res.status(500).json({message:"Sorry there was an error on the server side"})
      }
    }
    else{
      console.log("invalid email or email already exists")
       return res.status(400).json({message:"Invalid email or email already exists"})
    }
  });

  
  
  // Returns a list of courses
  router.get('/courses',async (req,res)=>{
        let exceptions={}
      
      
        
        await  Course.find()
        .then(response=>{
          
         
          
         return res.status(200).json(response)
        })
          .catch(err=>console.log(`get courses error: ${err}`))
         
    

      //   let courses = await Course.findAll({
      //   attributes: {
      //     exclude: ["createdAt", "updatedAt"]
      //   },
      //   include: [
      //     {
      //       model: User,
      //       attributes: {
      //         exclude: ["password", "createdAt", "updatedAt"]
      //       }
      //     }
      //   ]
      // });
      //  courses = courses.map(c=>c.toJSON())
     
   
  }) 

  
// Returns course including users that own course for that id
  router.get('/courses/:id',async (req,res)=>{
    try{
      console.log(`logging the body ${ req.params.id}`)
  await  Course.findById(req.params.id).populate({path:'User',select:"emailAddress",select:"firstName",select:"lastName"})

  .then(response=>{
        console.log("hey"+response)
        res.status(200).json(response)})
  .catch(err=>console.log(`error from get request:${err}`))


    // let  course = await Course.findByPk(req.params.id, {
    //     attributes: {
    //       exclude: ["createdAt", "updatedAt"]
    //     },
    //     include: [
    //       {
    //         model: User,
    //         attributes: {
    //           exclude: ["password", "createdAt", "updatedAt"]
    //         }
    //       }
    //     ]
    //   });
  
    // course=course.toJSON()
    

    
   
    }
    catch(err){
      console.log("course not found")
      res.status(404).end()
    }
  }) 

  //Creates a course, sets the Location header to the URL for the course, and returns no content
  router.post('/courses/',authenticate, async (req,res,next)=>{
      
     try{
       console.log(req.body)
     

      req.body.UserId=req.currentUser._id
      req.body.firstName=req.currentUser.firstName
      req.body.lastName=req.currentUser.lastName
      req.body.emailAddress=req.currentUser.emailAddress
      
       
        let newCourse = await new Course(req.body)
        //  const newCourse = await   Course.build(req.body)
          await newCourse.save()

        let  data
       await Course.find({title:req.body.title}).then(response=> {
        res.setHeader("location",`api/courses/${response._id}`)
       return res.status(201).end()})
       
          // = await Course.findAll({where:{"title":req.body.title}})
          // data  =  data.map(m=>m.toJSON())
        
        
       
        
     }catch(error){
         if(error.name==="ValidationError"){
             const errors = error.errors.map(err=>err.message)
             console.log(`there were the following validation errors : ${errors}`)
            return  res.status(400).json(errors)
         }
         console.log(`this is not a validation error: ${error}`)
         return res.status(500).json({message:"server error"})
         
     }
    
  }) 


  //Updates a course and returns no content
  router.put('/courses/:id',authenticate, async (req,res)=>{
    
    let userofCourse
     await Course.findById(req.params.id).then(response=>userofCourse=response)
       
     
    
    // = await Course.findByPk(req.params.id)
    // userCourse= userCourse.toJSON()
    const userIdofCourse= userofCourse.UserId
    
    if(req.body.title && req.body.description){
     if (req.currentUser._id.toString()===userIdofCourse.toString()){
         
      try{
         Course.updateOne({_id:req.params.id},
         {title:req.body.title,
         description:req.body.description,
         materialsNeeded:req.body.materialsNeeded,
         estimatedTime:req.body.estimatedTime}).then(res.status(204).end()
         )

        // await Course.updateOne({_id:req.body.id},req.body).then(res.status(204).end())
       
        // = await Course.findByPk(req.params.id);
        // await  updateCourse.update(req.body,{where:{id:req.params.id}});
        
        // res.status(204).end()
      
    }catch(error){
        if(error.name==="ValidataionError"){
            console.log(`we have this validation error ${error}`)
        return res.status(403).json({message:"Please provide value for title and description"})
        }
        else{
            console.log(error)
           return res.status(500).end()
            
        }
      }
}
else{
   res.status(403).json({message:"you do not have access to this course"})
}
    }
    else{
      if(!req.body.title && !req.body.description){
        console.log("no detal")
        return   res.status(400).json({message:"please enter value for title and description"})}
      
      if(!req.body.title){
      console.log("no title")
      return   res.status(400).json({message:"please enter value for title "})}
      if(!req.body.description){
        console.log("no description")
        return   res.status(400).json({message:"please enter value for description"})
      }
      
    }

  })

    // Deletes a course and returns no content
  router.delete('/courses/:id',authenticate,async (req,res)=>{
    let userofCourse 
    
    await Course.findById(req.params.id).then(res=>userofCourse=res)
       
    
    // = await Course.findByPk(req.params.id)
    
    
    
    if (!userofCourse){return res.status(404).json({message:"Course not found"})}
    const userIdofCourse= userofCourse.UserId
    if (req.currentUser.id.toString()===userIdofCourse.toString()){
        
       await  Course.deleteOne({_id:req.params.id}).then(res.status(204).end())
       
      
      // const courseTodelete = await Course.findByPk(req.params.id)
      // await courseTodelete.destroy()
      
    // res.status(204).end()
}
 else{
     res.status(400).json({message:"you do not have access to this course"})
 }
})


module.exports= router
