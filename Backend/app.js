const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const cors=require("cors");
const app=express();
const cookieParser=require("cookie-parser");
const connectToDb=require("./db/db");
const userRoutes=require("./routes/user.routes");
const captainRoutes=require("./routes/captain.routes");
const mapsRoutes=require('./routes/maps.routes');
const rideRoutes=require('./routes/ride.routes');

connectToDb();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    //console.log("hello Uber");
    res.send("Hello Uber");
});   

//User routes
app.use('/users',userRoutes);

//Captain routes
app.use('/captains',captainRoutes);

//Maps routes
app.use('/maps',mapsRoutes);

//Ride routes
app.use("/rides",rideRoutes);




module.exports=app;




// const port=3000;
// app.listen(port,(req,res)=>{
//     console.log(`listening on port ${port}`);
// });