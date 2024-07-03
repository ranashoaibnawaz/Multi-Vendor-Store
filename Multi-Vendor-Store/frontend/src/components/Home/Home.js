import React, { useEffect } from 'react'
import Banner from './Banner'
import './Home.css';
import Slide from './Slide';
import { getProducts } from '../Redux/Action/Action';
import {useDispatch,useSelector} from "react-redux";

const Home = () => {
  const {Product} = useSelector(state => state.getProductsData);
  console.log(Product);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch]);

  return (
    <div className='home_section'>
      <div className="banner_part">
        <Banner />
      </div>
       <Slide Product={Product}/>
      {/* <div className="g">
        <img className='sofa' src="https://images.unsplash.com/photo-1623950015175-ec6f6e28d183?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHw%3D&w=1000&q=80" alt="" />
      </div> */}
      {/* <Slide Product={Product}/> */}
    </div>
  )
}

export default Home;