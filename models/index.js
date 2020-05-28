// const Sequelize = require('sequelize');


// const sequelize = new Sequelize({
//     dialect:"sqlite",
//     storage:"fsjstd-restapi.db"
//   })

//     const User=sequelize.define("User",{
//       id:{
//           type:Sequelize.INTEGER,
//           autoIncreament:true,
//           primaryKey:true
//       },
//       firstName:{
//           type:Sequelize.STRING,
//           allowNull:false,
//           validate: {
//             notNull: {
              
//               msg: 'Please provide a value for "firstName"',
//            }
//         }
//          },
//       lastName:{
//           type:Sequelize.STRING,
//           allowNull:false,validate: {
//             notNull: {
              
//               msg: 'Please provide a value for "lastName"',
//           }
//         }
//     },
//       emailAddress:{
//           type:Sequelize.STRING,
//           allowNull:false,
//           validate: {
//             notNull: {
//               // custom error message
//               msg: 'Please provide a value for "emailAdress"',
//           }
//         }
//     },
//       password:{
//           type:Sequelize.STRING,
//           allowNull:false,
//           validate: {
//             notNull: {
    
//               msg: 'Please provide a value for "password"',
//           }
//         }
//     },
//     });

    



// // coures model

//     const Courses= sequelize.define("Courses",{
//       id:{
//           type:Sequelize.INTEGER,
//           autoIncreament:true,
//           primaryKey:true
//       },
//       title:{
//           type:Sequelize.STRING,
//           notEmpty:true,
//           allowNull:false,
//           validate: {
//             notEmpty:{
//               msg:"Please provide a value for  'title'"
//             },
//             notNull: {
             
//               msg: 'Please provide a value for "title"',
//             }
//       }},
//       description:{
//           type:Sequelize.TEXT,
//           notEmpty:true,
//           allowNull:false,
//           validate: {
//             notEmpty:{
//               msg:"Please provide a value for  'description'"
//             },
//             notNull: {
            
//               msg: 'Please provide a value for "description"',
//            }
//         }
//      },
//       estimatedTime:{
//           type:Sequelize.STRING,
//           allowNull:true,
//     },
//     materialsNeeded:{
//         type:Sequelize.STRING,
//       allowNull:true
//   },

//     });

// User.hasMany(Courses,{foreignKey:"userId"})     
// Courses.belongsTo(User)


// models={
//     Course:Courses,
//     User,
//     sequelize
// };
// module.exports= models





const mongoose=require('mongoose');

const { Schema }= mongoose;

const UsersSchema= new Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    emailAddress:{type:String, required:true},
    password:{type:String, required:true},
})



const addition = new Schema({
    id:{type:mongoose.Schema.Types.ObjectId,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    emailAddress:{type:String,required:true}
})

const CoursesSchema= new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    estimatedTime:{type:String},
    materialsNeeded:{type:String},
    UserId:{type:mongoose.Schema.Types.ObjectId,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    emailAddress:{type:String,required:true}
    
})



const User= mongoose.model('Users',UsersSchema);
const Course= mongoose.model('Courses',CoursesSchema);


const myModels={User,Course}

module.exports=myModels;