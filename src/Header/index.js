import Logo from './Logo.svg';


function Header(){
    return (
        <header>
            <img src={Logo} alt="Logo"/>
        </header>
    );
}

export {Header};