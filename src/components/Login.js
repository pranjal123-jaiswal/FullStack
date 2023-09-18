import React , {useState} from 'react'
import login from "../images/login.jpeg"
import { NavLink , useNavigate } from 'react-router-dom'


const Login = () => {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const navigate = useNavigate

  const loginUser = async(e) => {
    // stops this default  the browser is to perform a full page reload
    e.preventDefault();
    const res = await fetch("/signin" , {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({
         email ,  password 
      })
    })

    const data = await res.json();
    if(data.status === 422) {
      window.alert(" Invalid Login")
      console.log("")
    }else {
      window.alert(" Login successful")
      console.log("")
      navigate("/Home")
    }
  }

  return (
   <>
    <section className='signin'>
      <div className='container mt-5'>
        <div className='signin-content'>
        <div className='signin-image'>
            <figure>
              <img src = {login} alt = "dummy"/>
            </figure>
            <NavLink className="signin-iamge-link"  to = "/Signup">Create account</NavLink>
          </div>
        <div className='signin-form'>
       
          <h2 className='form-title'>Sign in</h2>
          <form method = "POST" className='register-form' id = "register-form">
          {/* The method attribute is set to "POST". This means that when the form is submitted, the data entered into the form's input fields will be sent to the server using the HTTP POST method. */}

            <div className='form-group'>
              <label htmlFor='email'>
                <i className='zmdi zmdi-email material-icons-name'></i>
              </label>
              <input type='text' name = "email" id="email" autoComplete='off' placeholder='Your email' value = {email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='form-group'>
              <label htmlFor='password'>
                <i className='zmdi zmdi-lock material-icons-name'></i>
              </label>
              <input type='password' name = "password" id="password" autoComplete='off' placeholder='Your password' value = {email} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className='form-group form-button'>
              <input type = "submit" name = "signin" id = "signin" className='form-submit' value='Signin' onClick={loginUser}/>
              
            </div>
          </form>
          </div>
          

         
        </div>
      </div>
    </section>
   </>
  )
}

export default Login