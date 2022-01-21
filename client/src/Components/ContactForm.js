import React,{useState} from 'react'
import ContactFormList from './ContactFormList';

function ContactForm() {
  const [firstname, setFirstName]=useState("");
  const [lastname, setLastName]=useState("");
  const [phone, setPhone]=useState("");


  const onSubmitForm = async (e) =>  {
    e.preventDefault();
    const body = { firstname,lastname,phone };
    const req = await fetch('http://localhost:5000/dashboard/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'token': localStorage.getItem('token'),
			},
      body: JSON.stringify(body)
		})

		const data = await req.json()
    console.log(data, "from contact form")
    setFirstName("")
    setLastName("")
    setPhone("")
  }

  return (
    <div class="row" className="contact-form-container">
      
      <form onSubmit={onSubmitForm} >
        
          
          <label>First Name</label>
          <input type="text" name="firstname" value= {firstname} onChange= {(e)=> setFirstName(e.target.value)} />
  
          <label>Last Name</label>
          <input  type="text" name="lastname" value= {lastname} onChange= {(e)=> setLastName(e.target.value)} />
  
          <label>Telephone</label>
          <input type="number" name="phone" value= {phone} onChange= {(e)=> setPhone(e.target.value)} />
  
      <button class="btn waves-effect waves-light" >ADD
        <i class="material-icons right">add</i>
      </button>
    </form>
    <ContactFormList/>
  </div>
  )
}

export default ContactForm
