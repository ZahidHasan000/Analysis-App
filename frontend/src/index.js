import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api";
// import dotenv from "dotenv";

const root = ReactDOM.createRoot(document.getElementById('root'));
const preloadedState = window.__PRELOADED_STATE__
// to use .env variables
// dotenv.config();

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

root.render(
  <React.StrictMode>
    <Provider store={store} serverState={preloadedState}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
