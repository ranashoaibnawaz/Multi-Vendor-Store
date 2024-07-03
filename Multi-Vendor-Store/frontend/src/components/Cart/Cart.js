import React, { useContext, useEffect, useState } from 'react'
import './Cart.css';
import { Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from '../ContextProvider/Contextprovider';

const Cart = () => {

  const { account, setAccount } = useContext(LoginContext);

  const { id } = useParams("");

  const navigate = useNavigate("");

  const [IndividualData, setIndividualData] = useState([]);

  const getIndividualData = async () => {
    const res = await fetch(`/getProductOne/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await res.json();

    if (res.status !== 201) {
      console.log("Data is not available");
    }
    else {
      console.log("Data is available");
      setIndividualData(data);
    }
  }

  useEffect(() => {
    getIndividualData();
  }, [id]);

  const AddToCart = async (id) => {
    const Checkres = await fetch(`/AddCart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        IndividualData
      }),
      credentials: "include"
    });

    const data1 = await Checkres.json();
    console.log(data1);

    if (Checkres.status === 401 || !data1) {
      console.log("User Invalid");
      alert("User Invalid");
    }
    else {
      navigate("/buynow")
      setAccount(data1);
    }
  }

  return (

    <div className="cart_section">
      {IndividualData && Object.keys(IndividualData).length &&
        <div className="cart_container">
          <div className="left_cart">
            <img src={IndividualData.detailUrl} alt="" />
            <div className="cart_btn">
              <button className='cart_btn1' onClick={() => AddToCart(IndividualData.id)}>Add To Cart</button>
              <button className='cart_btn2'>Buy Now</button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{IndividualData.title.longTitle}</h3>
            <h4>{IndividualData.title.shortTitle}</h4>
            <div className="dividerBlack">
            <Divider />
            </div>
            <p className='mrp'>Rs. : {IndividualData.price.mrp}</p>
            <p>Deal Of The Day : <span style={{ color: "blue" }}>Rs.{IndividualData.price.cost}</span></p>
            <div className="discount_box">
              <h4>Discount : {IndividualData.discount}</h4>
              <h4>Free Delivery</h4>
            </div>
            <div className="description">
              <h2>About Item</h2>
              {IndividualData.description}
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default Cart