import React,{useState,useContext} from 'react'
import Image from '../assets/Multivendor.png'
import './SignIn_SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../ContextProvider/Contextprovider';

const SignIn = () => {

  const { account, setAccount } = useContext(LoginContext);
  const [data,setData] = useState({
    email:"",
    password:""
  });
 
  const navigate = useNavigate();
  const addData=(e) =>{
    const {name,value} = e.target;
    console.log(account);
    setData(()=>{
      return{
        ...data,
        [name]:value
      }
    })
  }
  
  const SendData = async(e) => {
    e.preventDefault();
    const {email,password} = data;

    const res = await fetch ("/Login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            email,password
        })
    });
    const Data = await res.json();
        
    if(res.status === 400 || !Data)
    {
        toast.warn("Something went wrong",{
            position:"top-center",
        })
    }
    else
    {
        setAccount(Data);
        navigate("/");
        toast.success("Successfully LogIn",{
            position:"top-center",
        })
        setData({...data,email:"",password:""});
        
    }
  }


  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src={Image} alt="" />
          </div>
          <div className="sign_form">
            <form method='POST'>
              <h1>Sign In</h1>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input type="Email" onChange={addData} value={data.email} name='email' id='email' placeholder='Enter Your Email' />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={addData} value={data.password} name='password' id='password' placeholder='Enter Your Password' />
              </div>
              <button className='signin_btn'onClick={SendData}>Continue</button>
            </form>
          </div>
          <div className="create_accountinfo">
          <p>New To Multivendor Store</p>
          <Link to="/signup"><button >Create Your Account</button></Link>
        </div>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}

export default SignIn