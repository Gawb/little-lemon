import Logo from './Logo.svg';
import './index.css';


function Header(){
    return (
        <header>
            <img src={Logo} alt="Logo"/>
        </header>
    );
}

export {Header};