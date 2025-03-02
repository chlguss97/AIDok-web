import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BoardPage from './page/BoardPage';
import BookDetail from './page/BookDetail'
import Ai from './page/Ai'
import BookEdit from './page/BookEdit'
import Home from './page/Home'
import List from './page/List'
import NotePage from './page/NotePage'
import WriteAi from './page/WriteAi'
import WriteNote from './page/WriteNote'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BoardPage></BoardPage> */}
    {/* <BookDetail></BookDetail> */}
    {/* <Ai></Ai> */}
    {/* <BookEdit></BookEdit> */}
    {/* <Home></Home> */}
    {/* <List></List> */}
    {/* <NotePage></NotePage> */}
    {/* <WriteAi></WriteAi> */}
    {/* <WriteNote></WriteNote> */}
    <App></App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
