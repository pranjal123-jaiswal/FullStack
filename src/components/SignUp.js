import React , {useState} from 'react'
import sigup from "../images/signup.jpeg"
// import { NavLink , useHistory } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate = useNavigate();

  const [user , setUser] = useState({name: "" , email: "" , phone: "" , work: "" , password: "" , cpassword: ""})

  let name ;
  let value;
  const handleInputChange= (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({...user , [name]:value})
  }

  // POST DATA
  const postData = async(e) => {
     
    e.preventDefault();
    const {name , email , phone , work , password , cpassword} = user;

    const res = await fetch("/register" , {
      method: "POST",
      headers: {
        "content-Type": "application/json"  
      },
      body: JSON.stringify({
        name , email , phone , work , password , cpassword
      })
    })
    const data = await res.json();
    if(data.status === 422) {
      window.alert(" Invalid Registration")
      console.log("")
    }else {
      window.alert(" Registration successful")
      console.log("")
      navigate("/Login")
    }

  }


  return (
    <>
    <section className='signup'>
      <div className='container mt-5'>
        <div className='signup-content'>
        <div className='signup-form'>
          <h2 className='form-title'>Sign Up</h2>
          <form method="POST" className='register-form' id = "register-form">
            <div className='form-group'>
              <label htmlFor='name'>
                <i className='zmdi zmdi-account material-icons-name'></i>
              </label>
              <input type='text' name = "name" id="name" autoComplete='off' placeholder='Your Name' value = {user.name} onChange={handleInputChange}/>
            </div>

            <div className='form-group'>
              <label htmlFor='email'>
                <i className='zmdi zmdi-email material-icons-name'></i>
              </label>
              <input type='text' name = "email" id="email" autoComplete='off' placeholder='Your email' value = {user.email} onChange={handleInputChange}/>
            </div>

            <div className='form-group'>
              <label htmlFor='Phone'>
                <i className='zmdi zmdi-Phone-in-talk material-icons-name'></i>
              </label>
              <input type='text' name = "Phone" id="Phone" autoComplete='off' placeholder='Your Phone' value = {user.phone} onChange={handleInputChange}/>
            </div>

            <div className='form-group'>
              <label htmlFor='work'>
                <i className='zmdi zmdi-slideshow-in-talk material-icons-name'></i>
              </label>
              <input type='text' name = "work" id="work" autoComplete='off' placeholder='Your Profession' value = {user.work} onChange={handleInputChange}/>
            </div>

            <div className='form-group'>
              <label htmlFor='password'>
                <i className='zmdi zmdi-lock material-icons-name'></i>
              </label>
              <input type='password' name = "password" id="password" autoComplete='off' placeholder='Your password' value = {user.password} onChange={handleInputChange}/>
            </div>

            <div className='form-group'>
              <label htmlFor='cpassword'>
                <i className='zmdi zmdi-lock material-icons-name'></i>
              </label>
              <input type='password' name = "cpassword" id="cpassword" autoComplete='off' placeholder='Your cpassword' value = {user.cpassword} onChange={handleInputChange}/>
            </div>

            <div className='form-group form-button'>
              <input type = "submit" name = "signup" id = "signup" className='form-submit' value='register' onClick={postData}/>
              
            </div>
          </form>
          </div>
          <div className='signup-image'>
            <figure>
              <img src = {sigup} alt = "dummy"/>
            </figure>
            <NavLink className="signup-iamge-link"  to = "/Login">I am already register</NavLink>
          </div>

         
        </div>
      </div>
    </section>
    </>
  )
}

export default Signup