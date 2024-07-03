import React from 'react'
import Carousel from 'react-material-ui-carousel';
import './Banner.css';

const data = [
    "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/galaxy_s23_ultra_technizoconcept.jpg",
    "https://cdn.mos.cms.futurecdn.net/vmsWJ6touRStmRz37Nj54W.jpg",
    "https://specifications-pro.com/wp-content/uploads/2022/05/iPhone-14-Pro-scaled.jpg",
    "https://fscl01.fonpit.de/userfiles/7687254/image/Samsung_Galaxy_Watch_4/NextPit_Samsung_Galaxy_Watch_4_test.jpg"
]

const Banner = () => {
    return (
        
            <Carousel className='carasousel'>
                {
                    data.map((imag, i) => {
                        return (
                            <>
                                <img src={imag} alt="img" key={i} className='banner_img' />
                            </>
                        )
                    })
                }
            </Carousel>
        
    )
}

export default Banner