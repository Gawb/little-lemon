import './index.css';

const elements = ['HOME', 'ABOUT', 'MENU', 'RESERVATION', 'ORDER ONLINE', 'LOGIN'];

function Nav() {

    const navItems = elements.map((element, index) => (
        <li key={index} id={`nav-item-${index}`}>
            <a href={`#${element.toLowerCase().replace(" ", "-")}`}>{element}</a>
        </li>
    ));

    return (
        <nav>
            <ul>
                {navItems}
            </ul>
        </nav>
    );
}

export { Nav };
