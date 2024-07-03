import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css';
import Image from '../assets/cart1.PNG';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Link,NavLink,useNavigate } from 'react-router-dom';
import { LoginContext } from '../ContextProvider/Contextprovider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import LeftBar from './LeftBar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { ListItem } from '@mui/material';


const Navbar = () => {
    const { account, setAccount } = useContext(LoginContext);
    const navigate = useNavigate();
    console.log(account[0]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [text,setText] = useState("");
    console.log(text);
    const [liopen,setLiopen] = useState(true);

     const {Product} = useSelector(state => state.getProductsData);
    const [DrawerOpen, setDrawerOpen] = useState(false);

    const getdetailvaliduser = async () => {
        const res = await fetch("/ValidUser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data = await res.json();
        console.log(data);
        if (res.status !== 201) {
            console.log("error");
        }
        else {
            console.log("Data is valid");
            setAccount(data);

        }
    };

    const Open = () => {
        setDrawerOpen(true)
    }

    const Close = () => {
        setDrawerOpen(false)
    }

    const LogOut = async () => {
        const res1 = await fetch("/LogOut", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data1 = await res1.json();
        console.log(data1);
        if (res1.status !== 201) {
            console.log("error");
        }
        else {
            
            setAccount(false);
            navigate("/");
            console.log("User logout");
            toast.success("Successfully LogOut", {
                position: "top-center",
            })
        }
    };

    const getText = (iteams)=>{
        setText(iteams);
        setLiopen(false);
    }

    useEffect(() => {
        getdetailvaliduser();
    }, [])

    return (

        <header>
            <nav>
                <div className="left">
                    <IconButton className='hamburgur' onClick={Open}>
                        <MenuIcon style={{ color: "white" }} />
                    </IconButton>
                    <Drawer open={DrawerOpen} onClick={Close} >
                        <LeftBar Close={Close} LogOutUser={LogOut}/>
                    </Drawer>
                    <div className="navlogo">
                        <img src={Image} alt="" />
                    </div>
                    <div className="nav_searchbaar">
                        <input type="text" name=""
                        onChange={(e)=>getText(e.target.value)}
                        placeholder='Search The Products'
                        id="" />
                        <div className="search_icon">
                            <SearchIcon id='search' />
                        </div>

                        {
                            text && 
                            <List className='extrasearch' hidden={liopen}>
                                {
                                    Product.filter(Product=> Product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(Product=>
                                        <ListItem>
                                            <NavLink to={`/cart/${Product.id}`} onClick={() =>setLiopen(true)}>
                                                 {Product.title.longTitle}
                                            </NavLink>
                                        </ListItem>
                                    )
                                }
                            </List>
                        }
                    </div>
                </div>
                <div className="right">
                    <div className="nav_btn">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="nav_btn">
                    {/* <Link to="/signin">SignIn</Link>  */}
                {
                    account ?  <Link to="/signin" onClick={LogOut}>Sign Out</Link> : <Link to="/signin">SignIn</Link>
                }
                
                    </div>
                    <div className="cart_btn">
                        {
                            account ? <Link to='/buynow'>
                                <Badge badgeContent={account.carts?.length} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </Link> : <Link to='/login'>
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </Link>
                        }
                        <p>Cart</p>
                        < ToastContainer />
                        
                    </div>
                    {
                        account ? <Avatar className='avtar2' onClick={handleClick} >
                            {account?.name[0].toUpperCase()}</Avatar> :
                            <Avatar className='avtar' onClick={handleClick}>
                            </Avatar>
                    }
                    
                    <div>
                        <Menu id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >

                            <MenuItem onClose={handleClose} onClick={Open}>My account</MenuItem>
                            {
                                account ? <MenuItem onClose={handleClose} onClick={LogOut}>Logout</MenuItem> : ""
                            }

                        </Menu>
                    </div>
                </div>
            </nav >
        </header >
    )
}

export default Navbar
