import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store  } from './redux/store';

import App from './App';
import {BrowserRouter} from 'react-router-dom';




ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
     <PersistGate persistor={persistor}>
      <App />
     </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

