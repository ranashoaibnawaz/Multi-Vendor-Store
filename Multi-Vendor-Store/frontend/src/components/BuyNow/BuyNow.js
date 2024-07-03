import React, { useEffect, useState } from 'react';
import './BuyNow.css';
import { Divider } from '@mui/material';
import Option from './Option';
import SubTotal from './SubTotal';

const BuyNow = () => {

    const [CartData, setCartData] = useState([]);

    const getdatabuy = async () => {
        const res = await fetch("/CartDetail", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        if (res.status !== 201) {
            console.log("error");
        }
        else {
            setCartData(data.carts);
        }
    };

    useEffect(() => {
        getdatabuy();
    }, []);
    return (
        <>
            {
                CartData.length ?
                    <div className='buynow_section'>
                        <div className="buynow_container">
                            <div className="left_buy">
                                <h1>Shopping Cart</h1>
                                <p>Select All Items</p>
                                <Divider />
                                {
                                    CartData.map((e, k) => {
                                        return (
                                            <>
                                                <div className="item_containert" key={k}>
                                                    <img src={e.detailUrl} alt="" />
                                                    <div className="item_details">
                                                        <h3>{e.title.shortTitle}</h3>
                                                        <h3>{e.title.longTitle}</h3>
                                                        <h3 className='diffrentprice'>Rs.1495</h3>
                                                        <p>Free Home Dilevery</p>
                                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkKB12OvuNuMRfudem2JHTPGR-vexSjivq9Q&usqp=CAU" alt="" />
                                                        <Option deletedata={e.id} get={getdatabuy} />
                                                    </div>
                                                    <h3 className='item_price'>Rs.{e.price.cost}</h3>
                                                </div>
                                                <div className="dividerBlack">
                                                <Divider />
                                                </div>
                                            </>
                                        )
                                    })
                                }
                                <SubTotal iteam={CartData} />
                            </div>
                        </div>
                    </div> : ""
            }
        </>
    )
}


export default BuyNow;