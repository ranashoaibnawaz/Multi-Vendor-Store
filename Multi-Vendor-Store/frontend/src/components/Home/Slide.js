import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
//import { products } from './ProductData1';
import './Slide.css';
import {Link} from 'react-router-dom';

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const Slide = ({Product}) => {
  return (
    <>
    <div className='products_section'>
    <Carousel
        responsive={responsive}
        infinite={true}
        draggable={false}
        swipeable={true}
        showDots={false}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
        >
            {
              
                Product?.map((e)=>{
                    return(
                      <Link to={`/cart/${e.id}`}>
                        <div className="products_items">
                            <div className="product_img">
                                <img src={e.url} alt="Products Items" />
                            </div>
                            <p className='products_name'>{e.title.shortTitle}</p>
                            <p className='products_offer'>{e.discount}</p>
                            <p className='products_explore'>{e.tagline}</p>
                        </div>
                        </Link>
                    )
                })
                
            }

    </Carousel>
    </div>

    </>
  )
}

export default Slide