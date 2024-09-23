import LogoFooter from './LogoFooter.png';
import './index.css';

const elements = ['Home', 'About', 'Menu', 'Reservation', 'Order Online', 'Login'];
const contactInfo = ['Adress','Phone number','Email'];
const socialMedia = ['facebook','Instagram','X'];

function Footer(){

    const navItems = elements.map((element, index) => (
        <li key={index} id={`nav-item-${index}`}>
            <a href={`#${element.toLowerCase().replace(" ", "-")}`}>{element}</a>
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
                <p>Social Media Links</p>
                <ul>
                    {SocialItems}
                </ul>
            </div>

        </footer>
    );
}

export { Footer };