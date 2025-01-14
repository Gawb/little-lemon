import LogoFooter from './LogoFooter.png';
import './index.css';
import { Routes, Route, Link } from 'react-router-dom';

const elements = ['Home', 'About', 'Menu', 'Reservation', 'Order Online', 'Login'];
const contactInfo = ['P Sherman, 42 Wallaby Way, Sydney','555-3485','contact@littlelemon.com'];
const socialMedia = ['facebook','Instagram','X'];

const Footer = () => {

    const navItems = elements.map((element, index) => (
        <li key={index} id={`nav-item-${index}`}>
            <Link to={`${element.toLowerCase().replace(" ", "-")}`}
             className='nav-item'>{element}
             </Link>
        </li>
    ));
    const contactItems = contactInfo.map((element, index) =>(
        <li key={index} id={`nav-item-${index}`}>
        <a href={`#${element.toLowerCase().replace(" ", "-")}`}>{element}</a>
    </li>
    ));
    const SocialItems = socialMedia.map((element, index) =>(
        <li key={index} id={`nav-item-${index}`}>
        <a href={`#${element.toLowerCase().replace(" ", "-")}`}>{element}</a>
    </li>
    ));

    return(
        <footer>
            <img className='LogoFooter' src={LogoFooter} alt='Logo Footer'/>
            <div className='container'>
            <div>
                <p>Navigation</p>
                <ul>
                    {navItems}
                </ul>
            </div>
            <div>
                <p>Contact</p>
                <ul>
                    {contactItems}
                </ul>
            </div>
            <div>
                <p>Social Media</p>
                <ul>
                    {SocialItems}
                </ul>
            </div>
            </div>
        </footer>
    );
}

export { Footer };