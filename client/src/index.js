import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { Provider} from 'react-redux';
import { store } from './store/index';
import restProvider from 'ra-data-simple-rest'
const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);
// const dataProvider = restProvider("http://localhost:5000");
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);
