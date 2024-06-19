import React from "react";
import { Link } from 'react-router-dom';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './sportsbook.css'
import './App.css';
import cookie from 'cookie';

const Home = () => {
    const cookies = cookie.parse(document.cookie)
    const userId = cookies.id

    return(
        <div className="everything">
            <div className='nflHeader'>
                <div id="h1div">
                    <h1 className='header'>ACE Betting</h1>
                </div>
                <div>
                    <ul className="nav-list">
                        <li className="nav-list-item">
                            <Link to="/home"><HomeIcon sx={{ fontSize: 45 }}/></Link>
                        </li>
                        <li className="nav-list-item">
                            <Link to="/nfl"><SportsFootballIcon sx={{ fontSize: 45 }}/></Link>
                        </li>
                        <li className="nav-list-item">
                            <Link to="/profile"><AccountBoxIcon sx={{ fontSize: 45 }}/></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="homeInfo">
                <h2 className="title">WELCOME!</h2>
                <h2>Discover Ace Betting: Your Gateway to Risk-Free Thrills!</h2>
                <h3>Step into a World Where Winning is Guaranteed!</h3>
                <h3>Explore All Your Beloved Teams!</h3>
                <h4>Dive Into The Action On The Upcoming NFL Season Below!</h4>
                <Link to="/nfl" className="homeButton">NFL LINES HERE!</Link>
            </div>          
        </div>   
    )
}

export default Home;



