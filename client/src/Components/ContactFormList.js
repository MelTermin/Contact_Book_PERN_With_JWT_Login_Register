import React,{useState,useEffect} from 'react';
import {useNavigate } from "react-router-dom";

function ContactFormList() {
  const [userDetail, setUserDetail]=useState([]);
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  
  const fetchUser1 = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/contact", {
        method: "GET",
        headers: { token: token }
      });
      const parseRes1 = await res.json();
      // console.log(parseRes1,"parseres1")
      setUserDetail(parseRes1)
    } catch (err) {
     console.log(err)
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser1();  
    } 
  }, [userDetail]);


  const onDeleteUser= async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/dashboard/contact/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        }
      });

    setUserDetail(userDetail.filter(detail => detail.contact_form_id !== id));
    } catch (err) {
    console.error(err.message);
    }
}

const handleContactSelect = ( id) => {
  
  navigate(`/contact/${id}/update`)
}

const handleEdit = (e, id) => {
  e.stopPropagation();
  navigate(`/contact/${id}/update`)
}
  return <div>
        <table class="highlight centered responsive-table">
        <thead>
          <tr>
          
            <th style= {{textAlign:"center"}}>First Name</th>
            <th style= {{textAlign:"center"}}>Last Name</th>
            <th style= {{textAlign:"center"}}>Phone</th>
            <th style= {{textAlign:"center"}}>Edit</th>
            <th style= {{textAlign:"center"}}>Delete</th>

          </tr>
        </thead>
        <tbody>
          {userDetail.map((details)=>{
            return(
              <tr key= {details.contact_form_id} onClick={()=>handleContactSelect(details.contact_form_id)} >
                <td>{details.first_name}</td>
                <td>{details.last_name}</td>
                <td>{details.phone} </td>
                <td>
                    <button onClick={(e) =>handleEdit(e,details.contact_form_id)} className="btn btn-edit">
                      Edit
                    </button>
                </td>
                <td>
                  <button className="btn btn-delete" onClick= {()=>onDeleteUser(details.contact_form_id)}  >Delete</button>
                </td>
                
              </tr>
            )
          })}
        </tbody>
      </table>
  </div>;
}

export default ContactFormList;

