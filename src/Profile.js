

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './sportsbook.css';
import axios from 'axios';
import cookie from 'cookie';

const Profile = () => {
    const [userBets, setUserBets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserBets = async () => {
            try {
                const cookies = cookie.parse(document.cookie);
                const response = await axios.get(`https://ace-betting-final.vercel.app/bets/${cookies.id}`);
                const uniqueBets = response.data.data.filter((bet, index, self) =>
                    index === self.findIndex((b) => b.name === bet.name && b.price === bet.price && b.time === bet.time)
                );
                setUserBets(uniqueBets);
            } catch (error) {
                setError(error);
                console.error('Error fetching user bets:', error);
            }
        };

        fetchUserBets();
    }, []);

    const handleDeleteBet = async (betId) => {
        try {
            await axios.delete(`https://ace-betting-final.vercel.app/delete-bet/${betId}`);
            // Refetch user bets after deletion
            const cookies = cookie.parse(document.cookie);
            const response = await axios.get(`https://ace-betting-final.vercel.app/bets/${cookies.id}`);
            const uniqueBets = response.data.data.filter((bet, index, self) =>
                index === self.findIndex((b) => b.name === bet.name && b.price === bet.price && b.time === bet.time)
            );
            setUserBets(uniqueBets);
        } catch (error) {
            setError(error);
            console.error('Error deleting bet:', error);
        }
    };

    return (
        <div className='everything'>
            <div className='nflHeader'>
                <div id="h1div">
                    <h1 className='header'>ACE Betting</h1>
                </div>
                <div>
                    <ul className="nav-list">
                        <li className="nav-list-item">
                            <Link to="/home"><HomeIcon sx={{ fontSize: 45 }} /></Link>
                        </li>
                        <li className="nav-list-item">
                            <Link to="/nfl"><SportsFootballIcon sx={{ fontSize: 45 }} /></Link>
                        </li>
                        <li className="nav-list-item">
                            <Link to="/profile"><AccountBoxIcon sx={{ fontSize: 45 }} /></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='profileTitle'>
                <h2 className="title">Profile</h2>
            </div>
            <div className='profileInfo'>
                <div className='profileDiv'>
                    <h2 className='profileh2'>Placed Bets</h2>
                    {error ? (
                        <div>
                            <p>Error loading bets: {error.message}</p>
                        </div>
                    ) : userBets.length > 0 ? (
                        userBets.map((bet, index) => (
                            <div key={index} className='betItem'>
                                <span>{new Date(bet.time).toLocaleDateString('en-US')}</span> &nbsp;&nbsp;
                                <span>{bet.name}</span> &nbsp;&nbsp;
                                <span>{bet.price}</span>
                                {/*<button onClick={() => handleDeleteBet(bet.id)}>Delete</button> */}
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>No bets placed yet.</p>
                        </div>
                    )}
                </div>
                <div className='profileDiv'>
                    <h2 className='profileh2'>Account Information</h2>
                    <p className='emailname' >Name: &nbsp;</p>
                    <p className='emailname'>Email: &nbsp; </p>
                    
                </div>
            </div>
        </div>
    );
};

export default Profile;


