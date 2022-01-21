const express=require("express");
const app=express();
const auth=require("./routes/auth");
const dashboard=require("./routes/dashboard");
const cors=require("cors");
const env=require('dotenv')
env.config();




app.use(express.json())
app.use(cors());

app.use("/auth", auth);
app.use("/dashboard", dashboard);

app.listen(process.env.PORT,()=> {
  console.log(`the server is running on port` + process.env.PORT)
})
