import './index.css';
import { BookingForm } from '../BookingForm'
import { Homepage } from '../Homepage';
import { About } from '../About';
import { Routes, Route, Link } from 'react-router-dom';

const elements = ['HOME', 'ABOUT', 'MENU', 'RESERVATION', 'ORDER ONLINE', 'LOGIN'];

function Nav() {

    const navItems = elements.map((element, index) => (
        <li key={index} id={`nav-item-${index}`}>
            <Link to={`${element.toLowerCase().replace(" ", "-")}`}
             className='nav-item'>{element}
             </Link>
        </li>
    ));

    return (
        <>
        <nav>
            <ul>
                {navItems}
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/home" element={<Homepage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/reservation" element={<BookingForm />}></Route>
        </Routes>
        </>

    );
}

export { Nav };
