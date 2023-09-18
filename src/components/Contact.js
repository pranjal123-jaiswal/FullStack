import React, { useEffect, useState } from 'react'

const Contact = () => {
  const [userData , setUserData] = useState({name : "" , email: "" , phone: "" , message: ""})

  const callContactPage = async() => {
    try{
      const res = await fetch("/getData" , {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json()
      setUserData({...userData , name : data.name , email:  data.email , phone: data.phone})

      if( !res.status === 200){
        const error = new Error(res.error)
        throw error
      }
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    callContactPage()
  } ,[])

  let name;
  let value;
  const handleInputChange= (e) => {
    name = e.target.name;
    value = e.target.value
    setUserData({...userData , [name]:value})
  }

  const sendMessage= async(e) => {
    e.preventDefault()

    const {name , email , phone , message} = userData;

    const res = await fetch('/contact' , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name , email , phone , message
      })
    })
    const data = await res.json()
    if(!data) {
      console.log("error")
    } else {
      alert(" MEssage send")
      setUserData({...userData , message: ""})
    }

  }

  return (
    <>
    <div className='contact_info'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>
            {/* // phone number */}
            <div className='contact_info_item d-flex justify-content-start align-items-center' style={{ height: '50px' }}>
  <img src='' alt='phone' />
  <div className='contact_info_content'>
    <div className='contact_info_title'>
      Phone
    </div>
    <div className='text'>
      56426465356
    </div>
  </div>
</div>


             {/* // email */}
             <div className='contact_info_item d-flex justify-content-start align-items-center' style={{ height: '50px' }}>
  <img src='' alt='emai;' />
  <div className='contact_info_content'>
    <div className='contact_info_title'>
      emai;
    </div>
    <div className='text'>
      pjaiwal@gmail.com
    </div>
  </div>
</div>

             {/* // Address */}
             <div className='contact_info_item d-flex justify-content-start align-items-center' style={{ height: '50px' }}>
  <img src='' alt='address' />
  <div className='contact_info_content'>
    <div className='contact_info_title'>
      Address
    </div>
    <div className='text'>
      jndj l555ndmas 
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>

    {/* contact form */}
    <div className='contact-form'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-10 offset-lg-1'>
            <div className='contact_form_container py-5'>
              <div className='contact_form_title'>
                Get in touch
              </div>
              <form method ="Post" id = "contact_form">
              <div class='contact_form_name d-flex justify-content-between align-items-between'>
  <input type="text" name = "name" id="contact_form_name" class='contact-form-name-input-field' value = {userData.name} onChange={handleInputChange} placeholder='Your name' required="true"/>
  <input type="email" name = "email" id="contact_form_email" class='contact-form-name-input-field' value = {userData.email} onChange={handleInputChange} placeholder='Your email' required="true"/>
  <input type="number" name = "phone" id="contact_form_number" class='contact-form-name-input-field' value = {userData.phone} onChange={handleInputChange} placeholder='Your number' required="true"/>
</div>


                <div className='contact_form_text mt-5'>
                  <textarea className='text_field contact-form_message' placeholder='Message' cols= "30" rows="10" name = "message" value = {userData.message} onChange={handleInputChange}></textarea>
                </div>

                <div className='contact_form_button'>
                  <button type= "submit" className='button contact_submit_button' onClick={sendMessage}>Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact