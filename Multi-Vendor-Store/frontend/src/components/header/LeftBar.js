import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from '../ContextProvider/Contextprovider';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import "./LeftBar.css";

const LeftBar = ({ Close, LogOutUser }) => {
    const { account, setAccount } = useContext(LoginContext);
    return (
        <>
            <div className='leftheader'>
                <div className="left_nav">
                    {
                        account ? <Avatar className='avtar2'>{account.name[0].toUpperCase()}</Avatar> :
                            <Avatar className='avtar'></Avatar>
                    }
                    {
                        account ? <h3>{account.name.toUpperCase()}</h3> : ""
                    }
                </div>
                <div className="nav_btn" onClick={() => Close()}>
                    <Link to="/">Home</Link>
                    <Divider />
                    <Link to="/Dashboard">Dashboard</Link>
                    <Divider />
                    <Link to="/Admin">Add Products</Link>
                    <Divider />
                    <Link to="/">Today Deal's</Link>
                    <Divider />



                    {
                        account ? <Link to="/buynow">Your Order</Link> : <Link to="/login">Your Order</Link>
                    }
                    <Divider />
                    {/* <Link to="/">Settings</Link>
                <Divider/> */}
                    {
                        account ?
                            <h3 onClick={() => LogOutUser()} style={{ cursor: "pointer" }}>LogOut</h3>
                            : <Link to="/signin">SignIn</Link>
                    }
                </div>
            </div>
        </>
    )
}

export default LeftBar