import React, {useState,useEffect} from 'react';
import { useParams,useNavigate} from "react-router-dom";
import axios from "axios";

function Update() {
  const [firstname, setFirstName]=useState("");
  const [lastname, setLastName]=useState("");
  const [phone, setPhone]=useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleEdit= async (e) =>{
    e.preventDefault();
    try {
      const body = { firstname,lastname,phone };
      const response = await fetch(
        `http://localhost:5000/dashboard/contact/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token'),
          },
          body: JSON.stringify(body)
        })
      const parseRes = await response.json();
      
      navigate("/profile")

    }catch(err) {
      console.log(err)
    }

  }

  useEffect(()=> {
    getContact();

  },[])

  const token = localStorage.getItem("token");
  const getContact= async () => {

    const res = await fetch(`http://localhost:5000/dashboard/contact/${id}`, {
      method: "GET",
      headers: { token: token }
    });
    const parseRes = await res.json();
    // console.log(parseRes,"update")
    setFirstName(parseRes.first_name);
    setLastName(parseRes.last_name);
    setPhone(parseRes.phone);
  }
  
  return <div class="row" className="contact-form-container">
    <h2>Update A Contact</h2>
    
    <form onSubmit= {handleEdit}  >  
        <label>First Name</label>
        <input type="text" name="firstname" value= {firstname} onChange= {(e)=> setFirstName(e.target.value)} />

        <label>Last Name</label>
        <input  type="text" name="lastname" value= {lastname} onChange= {(e)=> setLastName(e.target.value)} />

        <label>Telephone</label>
        <input type="number" name="phone" value= {phone} onChange= {(e)=> setPhone(e.target.value)} />

    <button class="btn waves-effect waves-light" >UPDATE</button>
  </form>
  
  </div>;
}

export default Update;
