// src/Bets.js (or wherever your component is located)
// src/Bets.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bets = ({ userId, token }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bets, setBets] = useState([]);

    useEffect(() => {
        const fetchBets = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/bets/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Bets data:', response.data);
                // Handle response data as needed
            } catch (error) {
                console.error('Error fetching bets:', error);
                // Handle error state
            }
        };

        fetchBets();
    }, [userId, token]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="bets-container">
            {bets.length === 0 ? (
                <p>No bets found for this user.</p>
            ) : (
                bets.map(bet => (
                    <div key={bet.id} className="bet">
                        <p>Name: {bet.name}</p>
                        <p className="price">Price: {bet.price}</p>
                        <p>Time: {new Date(bet.time).toLocaleString()}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Bets;
