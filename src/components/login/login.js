import React, { useState } from 'react';

import auth from '../../config/auth';

export default function Login(props) {

    const [username, setUsername] = useState({});
    const [password, setPassword] = useState({});
    let [loginFail, setLoginFail] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
    }

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
        <React.Fragment>
            <h1>Login</h1>
            
            {loginFail === true ? <p>Your login attempt was unsuccessful. Please try again.</p> : null}
            
            {sessionStorage.loggedIn === 'true' ? (
                <React.Fragment>
                    <p>You are logged in.</p>
                    <h2>Useful links</h2>
                    <ul>
                        <li><a href='./admin/add-result'>Add result</a></li>
                    </ul>
                </React.Fragment>
            ) : (
                <form method='GET'>
                    <label>Username:
                        <input type='text' name='username' onChange={handleUsernameChange} />
                    </label>
                    <label>Password:
                        <input type='text' name='password' onChange={handlePasswordChange} />
                    </label>
                    <button onClick={
                        (e) => {
                            handleSubmit(e);
                            if (username === auth.adminLogin.username && 
                                password === auth.adminLogin.password) {
                                auth.login(() => {
                                    props.history.push('/admin/add-result');
                                })
                            } else {
                                setLoginFail(true);
                            }
                        }
                    }>
                        Login
                    </button>
                </form>
            )}
        </React.Fragment>
    )
}
