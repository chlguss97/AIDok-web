import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={{padding:"8%"}}>
      <ul>
        <li>
          <Link to="/ai">Ai</Link>
        </li>
        <li>
          <Link to="/BookDetail">BookDetail</Link>
        </li>
        <li>
          <Link to="/BookEdit">BookEdit</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/List">List</Link>
        </li>
        <li>
          <Link to="/notepage">NotePage</Link>
        </li>
        <li>
          <Link to="/WriteAi">WriteAi</Link>
        </li>
        <li>
          <Link to="/WriteNote">WriteNote</Link>
        </li>
        <li>
          <Link to="/board">Board</Link>
        </li>
        <li>
          <Link to="/timer">Timer</Link>
        </li>
        


        
      </ul>
    </nav>
  );
};

export default Navigation