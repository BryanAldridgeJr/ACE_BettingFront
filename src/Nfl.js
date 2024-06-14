import './sportsbook.css'
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import cookie from 'cookie';
import axios from 'axios';

const Nfl = () => {
    const [arrayOfTeams, setArrayOfTeams] = useState([]);
    const [error, setError] = useState(null);

    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
            fetch('https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=06bb6e725b4fe91fe4a2569838028b06&regions=us&markets=h2h&oddsFormat=american')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return response.json();
                })
                .then(data => {
                    const teamsData = [];
                    data.forEach(game => {
                        const commenceTime = game.commence_time;

                        const bookmakers = game.bookmakers;
                        if (!bookmakers || bookmakers.length === 0) {
                            setError('Error: Missing bookmakers data');
                            return;
                        }

                        const markets = bookmakers[0].markets;
                        if (!markets || markets.length === 0) {
                            setError('Error: Missing markets data');
                            return;
                        }

                        const outcomes = markets[0].outcomes;
                        if (!outcomes || outcomes.length === 0) {
                            setError('Error: Missing outcomes data');
                            return;
                        }

                        const odds = outcomes.map(outcome => ({
                            team: outcome.name,
                            price: outcome.price,
                        }));

                        const gameData = {
                            time: commenceTime,
                            odds: odds,
                        };

                        teamsData.push(gameData);
                    });
                    setArrayOfTeams(teamsData);
                })
                .catch(error => {
                    setError('Error fetching API data: ' + error.message);
                });
        }, []);
   

    const placedBet = (time, team) => {
      const cookies = cookie.parse(document.cookie)
      console.log(time, team)
      axios.post('http://localhost:8081/placed', {
        id: cookies.id,
        time,
        name: team.team,
        price: team.price
      }).then(data=>{
        console.log(data)
      })
    }

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
            <h2 className='title'>NFL</h2>              
          {error && <p>{error}</p>}
          {arrayOfTeams.length === 0 ? (
            <p>No games available</p>
          ) : (
            arrayOfTeams.map(game => (
              <div key={game.time} className='divGames'>
                <div id='divTimes'>
                  <span id='divTimesSpan'>{new Date(game.time).toLocaleString()}</span>
                </div>
                {game.odds.map(team => (
                  <div onClick={() => placedBet(game.time, team)} key={team.team} className='divTeam'>
                    <div className='divTeams'>
                      <span>{team.team}</span>
                    </div>
                    <div className='divPrice'>
                      <span className='spanPrice'>{team.price}</span> 
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
        
    );
}

export default Nfl;








/*
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import nflData from './nflData.json'; 
import cookie from 'cookie';
import axios from 'axios';

const Nfl = () => {
  const [arrayOfTeams, setArrayOfTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const teamsData = [];
    nflData.forEach(game => {
      const commenceTime = game.commence_time;

      const bookmakers = game.bookmakers;
      if (!bookmakers || bookmakers.length === 0) {
        setError('Error: Missing bookmakers data');
        return;
      }

      const markets = bookmakers[0].markets;
      if (!markets || markets.length === 0) {
        setError('Error: Missing markets data');
        return;
      }

      const outcomes = markets[0].outcomes;
      if (!outcomes || outcomes.length === 0) {
        setError('Error: Missing outcomes data');
        return;
      }

      const odds = outcomes.map(outcome => ({
        team: outcome.name,
        price: outcome.price,
      }));

      const gameData = {
        time: commenceTime,
        odds: odds,
      };

      teamsData.push(gameData);
    });
    setArrayOfTeams(teamsData);
  }, []);

  const placedBet = (time, team) => {
    const cookies = cookie.parse(document.cookie)
    console.log(time, team)
    axios.post('http://localhost:8081/placed', {
      id: cookies.id,
      time,
      name: team.team,
      price: team.price
    }).then(data=>{
      console.log(data)
    })
  }

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
      <h2 className='title'>NFL</h2>
      
      {error && <p>{error}</p>}
      {arrayOfTeams.length === 0 ? (
        <p>No games available</p>
      ) : (
        arrayOfTeams.map(game => (
          <div key={game.time} className='divGames'>
            <div id='divTimes'>
              <span id='divTimesSpan'>{new Date(game.time).toLocaleString()}</span>
            </div>
            {game.odds.map(team => (
              <div onClick={() => placedBet(game.time, team)} key={team.team} className='divTeam'>
                <div className='divTeams'>
                  <span>{team.team}</span>
                </div>
                <div className='divPrice'>
                  <span className='spanPrice'>{team.price}</span> 
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Nfl;
*/