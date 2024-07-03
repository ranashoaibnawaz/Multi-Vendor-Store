import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
// import SnapchatIcon from '@mui/icons-material/Snapchat';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-column">
            <h4>About Us</h4>
            <p>We are a company dedicated to providing the best services and products for our customers.</p>
          </div>
          <div className="footer-column">
            <h4>International Links</h4>
            <ul>
              <li><a >Pakistan</a></li>
              <li><a >America</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact Us</h4>
            <p>Email: ranashoaib6162@gmail.com</p>
            <p>Phone: +92 311 6162845</p>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <LinkedInIcon/> <YouTubeIcon/> <InstagramIcon/> <FacebookIcon/> <TwitterIcon/> 
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
