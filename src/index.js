import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { combineReducers, legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import userAccountReducer from "./redux/account";
import aReducer from "./redux/a";


const rootReducer = combineReducers({
  userA: userAccountReducer,
  a: aReducer,
});
const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App></App>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
