import React,{useContext,useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
// import {UserContext} from '../Context/UserContext'
import ContactForm from './ContactForm';

function Profile() {
  // const {user}=useContext(UserContext)

  const [user,setUser]=useState([]);


  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUser = async () => {

    try {
      const res = await fetch("http://localhost:5000/auth/me", {
        method: "GET",
        headers: { token: token }
      });
      const parseRes = await res.json();
      setUser(parseRes.data.user) 
    } catch (err) {
     console.log(err)
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser(); 

    } 
  }, []);

  const logout = () => {
    
    localStorage.removeItem("token");
    navigate("/login");
  };


  return (
    <div>
      <div className="header-container">
        <p>Welcome, {user.name}</p>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
      <ContactForm/>
     
    </div>
  )
}

export default Profile
