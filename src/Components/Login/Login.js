import './Login.css';
import React, { useState } from 'react'
import login from './login.png';
import env from '../settings';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
    let handlesubmit = async (e) => {
        e.preventDefault();
        try {
            let loginData = await axios.post(`${env.api}/login`, { userName, password })
            console.log(loginData);
            window.localStorage.setItem("app_token", loginData.data.token)
            history.push("/todo")
        }
        catch (error) {
            console.error();
            alert("Wrong password!");
        }
    }

    return (
        <main className="form-signin">
            <form onSubmit={handlesubmit}>
                <div className="loginhead__container">
                    <img className="mb-4" src={login} alt="" width="57" height="57" />
                </div>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating ">
                    <input type="email" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" id="floatingInput" placeholder="name@example.com" required />
                    <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mt-2">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Password" required />
                    <label for="floatingPassword">Password</label>
                </div>
                <div className="registerlink mt-2">
                    <a href={"./register"}>New user? Click here</a>
                </div>
                <input className="w-100 btn btn-lg btn-primary mt-3" type="submit" value="Sign in" />
                <p className="mt-3 mb-3 text-muted">© Surya's Todo</p>
            </form>
        </main>
    )
}

export default Login
