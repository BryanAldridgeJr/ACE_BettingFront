import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'
import './App.css';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

    const togglePasswordRequirements = () => {
        setShowPasswordRequirements(!showPasswordRequirements);
    };

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('https://ace-betting-final.vercel.app/signup', values)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div id='signupdiv' className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <h2 className='h2login'>ACE Betting</h2>
            <div className='bg-white p-3 rounded w-25'>
                <h3>Sign Up</h3>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder='Enter Name' name='name'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.name && <span className='text-danger'> {errors.name} </span>}
                    </div>
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
                    <button type='submit' className='btn btn-success border w-100 rounded-0'><strong>Sign Up</strong></button>
                    <p></p>
                    <Link to="/" className='btn btn-default w-100 rounded-0'>Already Signed Up? Log In</Link>
                    <div className='passwordReq'>
                        <button type="button" onClick={togglePasswordRequirements}>
                            Password Requirements
                        </button>
                        {showPasswordRequirements && (
                            <div >
                                <br />
                                <ul>
                                <li>Be at least 8 characters long</li>
                                <li>Contain at least one uppercase letter (A-Z)</li>
                                <li>Contain at least one lowercase letter (a-z)</li>
                                <li>Contain at least one digit (0-9)</li>
                                <li>Contain at least one special character (@$!%*?&)</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup