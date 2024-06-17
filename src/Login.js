import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation'; 
import axios from 'axios';
import cookie from 'cookie';
import './App.css';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if( errors.email === "" && errors.password === "") {
            axios.post('https://ace-betting-final.vercel.app/login', values)
            .then(res => {
                console.log(res)
                if(res.data.msg === "Success") {
                    document.cookie = cookie.serialize("id", res.data.data[0].id, {
                        maxAge: 60*60*24*7
                    })
                    navigate('/home');
                } else{ 
                    alert("No Record Existed");
                }
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div id='logindiv' className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <h2 className='h2login'>ACE Betting</h2>
            <div className='bg-white p-3 rounded w-25'>
                <h3>Login</h3>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.email && <span className='text-danger'> {errors.email} </span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.password && <span className='text-danger'> {errors.password} </span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Login</strong></button>
                    <p></p>
                    <Link to="/signup" className='btn btn-default border w-100 rounded-0 text-decoration-none'>Sign Up!</Link>
                </form>
            </div>
        </div>
    )
}

export default Login
