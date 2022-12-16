import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-s54zoxdts8jhvu3j.us.auth0.com'
      clientId='QY0LuinJnWgIgqqd1tev9MqTxUDCdiOU'
      redirectUri='http://localhost:3000'
   
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);
