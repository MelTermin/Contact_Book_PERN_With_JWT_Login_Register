import React,{useState} from 'react'
import { Link,useNavigate } from "react-router-dom";
import axios from "axios"

function Login() {
  const[password,setPassword]=useState("");
  const[email,setEmail]=useState("");
  const[errorMsg,setErrorMsg]=useState("");

  let navigate = useNavigate();

  const onSubmitForm = async (e) => {
  
    e.preventDefault();
    try {
      const response= await axios.post("http://localhost:5000/auth/login",{ password,email
      }).then(response=> {
      
      // console.log(response.data.data.token)
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
      <h2 class="teal-text ">Login</h2>

      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" name="email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
          <label>Email</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate" name="password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
          <label >Password</label>
        </div>
      </div>
      {errorMsg && <small style={{color:"red"}}>{errorMsg}</small>}
      <br/>
      <button class="btn waves-effect waves-light ">Submit
        <i class="material-icons right">send</i>
      </button>
      <div className="register-container" style={{marginTop:"20px", display:"flex",alignItems:"center"}}>
          <p>No account ?</p>
          <Link style={{textDecoration:"none", color:"black", marginLeft:"10px"}} to="/">Register here</Link>
      </div>
    </form>
   
  </div>
  )
}

export default Login
