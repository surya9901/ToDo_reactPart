import './Register.css';
import register from './register.png'
import React, { useState } from 'react'
import axios from 'axios';
import env from '../settings';
import { useHistory } from 'react-router-dom';

function Register() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const history = useHistory();
    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (password === confirmPassword) {
                await axios.post(`${env.api}/register`, { userName, password })
                setUserName("")
                setPassword("")
                setConfirmPassword("")
                history.push("/login")
            } else {
                alert("Password mismatch")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="form-signin">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="registerhead__container">
                    <img src={register} alt="" width="180" height="110" />
                </div>
                <h1 className="h3 mb-3 fw-normal">Please Sign up here</h1>

                <div className="form-floating">
                    <input type="Email" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" id="floatingInput" placeholder="name@example.com" required />
                    <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mt-2">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Password" required />
                    <label for="floatingPassword">Password</label>
                </div>
                <div className="form-floating mt-2">
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Password" required />
                    <label for="floatingPassword">Confirm Password</label>
                </div>
                <div className="loginlink mt-2">
                    <a href={"./login"}>Already a user? Click here</a>
                </div>
                <input className="w-100 btn btn-lg btn-primary mt-3" type="submit" value="Sign up" />
                <p className="mt-3 mb-3 text-muted">© Surya's Todo</p>
            </form>
        </main>
    )
}

export default Register
