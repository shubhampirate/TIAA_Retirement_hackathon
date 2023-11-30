import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Dashboard  from '../Dashboard/Dashboard';
import './App.css';
import { gapi } from 'gapi-script';

const { SetCookie, DeleteCookie, hasCookie } = require('../../Utility/CookieManager.js');
const CLIENT_ID = '807129563400-0ibt7d71upkjrol0osqmg07ed6autbjf.apps.googleusercontent.com';

const App = () => { 
  const [user, setUser] = useState({ haslogin: false, accessToken: '' });

  useEffect(() => {
    function start()
    {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
    const cookieObject = hasCookie();
    if (cookieObject.haslogin) {
      setUser({
        ...cookieObject
      });
    }
  }, []);

  function login(response) {
    console.log(response.accessToken)
    if (response.accessToken) {
      setUser({
        ...response.profileObj,
        haslogin: true,
        accessToken: response.accessToken
      })
    }
    SetCookie({
      ...response.profileObj,
      accessToken: response.accessToken
    });
  }

  function logout(response) {
    setUser({ haslogin: false, accessToken: '' });
    DeleteCookie(['accessToken', 'email', 'givenName', 'familyName', 'imageUrl', 'name', 'googleId']);
  }

  function handleLoginFailure(response) {
    alert('Failed to log in')
  }
  function handleLogoutFailure(response) {
    alert('Failed to log out')
  }
  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" style={{backgroundColor: '#fff'}}>
        <Nav className="mr-auto">
        </Nav>
        <Nav style={{textAlign:"right"}}>
          {user.haslogin ?
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText='Logout'
              onLogoutSuccess={logout}
              onFailure={handleLogoutFailure}
            >
            </GoogleLogout> : <GoogleLogin
              clientId={CLIENT_ID}
              buttonText='Login'
              onSuccess={login}
              onFailure={handleLoginFailure}
              cookiePolicy={'single_host_origin'}
              responseType='code,token'
              scope = { 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read'}
            />
          }
        </Nav>
      </Navbar>
      <Dashboard user={user}/>
    </div>
  );
}

export default App;
