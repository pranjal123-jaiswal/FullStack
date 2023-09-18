import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    console.log("test")
    const navigate = useNavigate()
    useEffect(() => {
        fetch('/logout' , {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            console.log("test")
            navigate("/Login")
        }).catch(() => {
            console.log("error")
        })
    } , )
    
  return (  
    <>
{/* <h1>Logout</h1> */}
    </>
  )
}

export default Logout;