import './index.css'
import restFood from './restauranfood.jpg';


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
                <button>Reserve a Table</button>
            </div>
            <div>
                <img src={restFood}/>
            </div>
        </div>
    )

}

export { Homepage };