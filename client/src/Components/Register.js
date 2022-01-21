import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const[name,setName]=useState("");
  const[password,setPassword]=useState("");
  const[email,setEmail]=useState("");
  const[errorMsg,setErrorMsg]=useState("");

  let navigate = useNavigate();
  
  const onSubmitForm = async (e) => {
  
    e.preventDefault();
    try {
      const response= await axios.post("http://localhost:5000/auth/register",{ name, password,email
      }).then(response=> {
      
      
        if(response.data.errors[0]) {
          setErrorMsg(response.data.errors[0].msg)
        }else {
          localStorage.setItem("token", response.data.data.token);
          navigate("/profile");
        }
      })
    
    } catch(err) {
      console.log(err);
    }
  }
  return (
<div class="row">
    <form class="col s6" className="form-container" onSubmit={onSubmitForm}>
      <h2 class="teal-text ">Register</h2>
      <div class="row">
        <div class="input-field col s12">
          <input id="first_name" type="text" required  name="name" value={name} onChange={(e) =>setName(e.target.value)}/>
          <label >User Name</label>
        </div>

      </div>

      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" name="email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
          <label >Email</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password"  name="password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
          <label >Password</label>
         
        </div>
        {errorMsg && <small style={{color:"red"}}>{errorMsg}</small>}
       
      </div>
      <button class="btn waves-effect waves-light ">Submit
        <i class="material-icons right">send</i>
      </button>
      <div className="register-container" style={{marginTop:"20px", display:"flex",alignItems:"center"}}>
          <p>Already registered ?</p>
          <Link style={{textDecoration:"none", color:"black", marginLeft:"10px"}} to="/logim">Login from here</Link>
      </div>
    </form>
   
  </div>
  )
}

export default Register
