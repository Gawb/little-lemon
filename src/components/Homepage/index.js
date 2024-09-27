import './index.css'
import restFood from './restauranfood.jpg';
import { Link } from 'react-router-dom';


const Homepage = () => {
    return (
        <div className="homepage-container">
            <div>
                <h1>Little Lemon</h1>
                <p>Chicago</p>
                <p>We are a family owned
                    Mediterranean restaurant.
                    focus on traditional
                    recipes seved with modern
                    twist
                </p>
                <button>
                    <Link to={`/reservation`}
                        className='nav-item'>
                        Reserve a Table
                    </Link>
                </button>
            </div>
            <div>
                <img src={restFood}/>
            </div>
        </div>
    )

}

export { Homepage };