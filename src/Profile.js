// Profile.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './sportsbook.css'

const baseUrl = 'http://localhost:8081/profile';

const Profile = () => {
    const [info, setInfo] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(baseUrl, { method: 'GET' });
                const data = await res.json();
                setInfo(data.info);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='everything'>
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
            <div className='profileTitle'>
                <h2 className="title">Profile</h2>
            </div>
            <div className='profileInfo'>
                <div className='profileDiv'>
                    <h2 className='profileh2'>Account Information</h2>
                    <p className='emailname' >Name: &nbsp; {info} </p>
                    <p className='emailname'>Email: &nbsp; {info} </p>
                </div>
                <div className='profileDiv'>
                    <h2 className='profileh2'>Placed Bets</h2>
                </div>
            </div>
            
        </div>
    );
};

export default Profile;

