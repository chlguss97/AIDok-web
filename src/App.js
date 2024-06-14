import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoardPage from './page/BoardPage';
import BookDetail from './page/BookDetail'
import Ai from './page/Ai'
import BookEdit from './page/BookEdit'
import Home from './page/Home'
import List from './page/List'
import NotePage from './page/NotePage'
import WriteAi from './page/WriteAi'
import WriteNote from './page/WriteNote'
import Navigation from './Navigation';
import Board from './components/Board';
import WriteBoard from './components/WriteBoard';
import BoardComment from './components/BoardComment';


function App() {
  return (
    <Router>
      <Navigation/>
        <Routes>
          <Route path="/Ai" element={<Ai />} />
          {/* <Route path="/BoardPage" element={<BoardPage />} /> */}
          <Route path="/BookDetail" element={<BookDetail />} />
          <Route path="/BookEdit" element={<BookEdit />} />
          <Route path="/" element={<Home />} />
          <Route path="/List" element={<List />} />
          <Route path="/Notepage" element={<NotePage />} />
          <Route path="/WriteAi" element={<WriteAi />} />
          <Route path="/WriteNote" element={<WriteNote />} />
          <Route path="/Board" element={<Board />} />
          <Route path="/write" element={<WriteBoard />} />
          <Route path="/comments" element={<BoardComment />} />
          
          




        </Routes>


    </Router>
  );
}

export default App;
