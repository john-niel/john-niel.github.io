import React, { createElement, useState, useEffect, useCallback } from 'react';
import { render } from 'react-dom';

window.createReactElement = createElement;
window.renderReact = render;

window.ReactApp = props => {
  const {user} = props;

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) authenticate(token);
    else setIsAuth(false);
  }, [user]);

  const authenticate = useCallback(token => {
    fetch('../user.json')
      .then(data => data.json())
      .then(user => setIsAuth(token === user.token));
  }, []);

  if (!isAuth) return <h1>Forbidden...</h1>

  return (
    <React.Fragment>
      <h1>{user.username}</h1>
      <h1>{user.role}</h1>
    </React.Fragment>
  )
};
