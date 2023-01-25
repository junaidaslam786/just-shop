import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import Routers from './routes';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Provider } from 'react-redux';
import store from './app/store';

const Root = () => {
  return (
    <React.StrictMode>
      <BrowserRouter basename={'/'}>
        <PerfectScrollbar>
          <Routers />
        </PerfectScrollbar>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
