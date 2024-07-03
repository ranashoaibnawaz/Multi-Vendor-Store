import React, { useState } from 'react'
import './SignIn_SignUp.css';
import Image from '../assets/Multivendor.png'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const [userData,setUserData] = useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:""
    });
   
    console.log(userData);
    const addData=(e) =>{
        const {name,value} = e.target;

        setUserData(()=>{
            return{
                ...userData,
                [name] : value
            }
        })
    }

    const SendData = async(e) =>{
        e.preventDefault();
        const {name,email,phone,password,confirmPassword} = userData;

        const res = await fetch ("Register",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                name,email,phone,password,confirmPassword
            })
        });
        const data = await res.json();
        
        if(res.status === 422 || !data)
        {
            toast.warn("Already Exist This Account",{
                position:"top-center",
            })
        }

        else
        {
            toast.success("Successfully added",{
                position:"top-center",
            })
            setUserData({...userData,name:"",email:"",phone:"",password:"",confirmPassword:""});
        }
    }

    return (
        <>
            <section>
                <div className="sign_container">
                    <div className="sign_header">
                        {/* <img src={Image} alt="" /> */}
                    </div>
                    <div className="sign_form">
                        <form method="POST">
                            <h1>Sign Up</h1>
                            <div className="form_data">
                                <label htmlFor="name">Name</label>
                                <input type="name" onChange={addData} value={userData.name} name='name' id='name' placeholder='Enter Your Name' />
                            </div>
                            <div className="form_data">
                                <label htmlFor="email">Email</label>
                                <input type="Email" onChange={addData} value={userData.email} name='email' id='email' placeholder='Enter Your Email' />
                            </div>
                            <div className="form_data">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="phone" onChange={addData} value={userData.phone} name='phone' id='phone' placeholder='Enter Your Phone Number' />
                            </div>
                            <div className="form_data">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={addData} name='password' id='password' placeholder='Enter Your Password At least 5 Character' />
                            </div>
                            <div className="form_data">
                                <label htmlFor="password">Password Again</label>
                                <input type="password" onChange={addData} value={userData.confirmPassword} name='confirmPassword' id='confirmPassword' placeholder='Enter Your Password At least 5 Character' />
                            </div>
                            <button className='signin_btn' onClick={SendData}>Continue</button>
                            <div className="signinfo">
                                <p>Already have an account?Then <Link to="/signin">Sign In</Link></p>
                                
                            </div>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default SignUp