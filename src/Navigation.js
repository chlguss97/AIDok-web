import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/Ai">Ai</Link>
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
          <Link to="/NotePage">NotePage</Link>
        </li>
        <li>
          <Link to="/WriteAi">WriteAi</Link>
        </li>
        <li>
          <Link to="/WriteNote">WriteNote</Link>
        </li>
        <li>
          <Link to="/Board">Board</Link>
        </li>
        


        
      </ul>
    </nav>
  );
};

export default Navigation