import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding-top: 8%;
  padding-bottom: 35%;
  padding-left: 8%;
  padding-right: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 12%;
  right: 6%;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #5E7E71;
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  z-index: 1000;
`;

const NoteContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  width: 93%;
  max-width: 600px;
  display: flex;
  align-items: center;
`;

const NoteImage = styled.img`
  width: 50px;
  height: 75px;
  margin-right: 10px;
  border-radius: 5px;
`;

const NoteContentContainer = styled.div`
  flex: 1;
`;

const NoteTitle = styled.h2`
  margin: 0;
  font-size: 1.2em;
`;

const NoteContent = styled.p`
  margin: 0.5em 0;
`;

const NoteDate = styled.p`
  margin: 0;
  color: gray;
  font-size: 0.8em;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
`;

const Note = ({ title, content, date, image }) => (
  <NoteContainer>
    <NoteImage src={image} alt="Book Cover" />
    <NoteContentContainer>
      <NoteTitle>{title}</NoteTitle>
      <NoteContent>{content}</NoteContent>
      <NoteDate>{date}</NoteDate>
    </NoteContentContainer>
  </NoteContainer>
);

const NoteList = ({ notes }) => (
  <div id="notesContainer">
    {notes.map((note, index) => (
      <Note 
        key={index}
        title={note.title}
        content={note.noteText}
        date={note.date.toDate().toLocaleString()}
        image={note.bookImgUrl}
      />
    ))}
  </div>
);

const NotePage = () => {
  const user = useSelector((state) => state.userA.userAccount);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const subColRef = collection(db, "note", user.userId, "books");
        const notesQuerySnapshot = await getDocs(subColRef);
        const notes = [];
        notesQuerySnapshot.forEach((doc) => {
          notes.push(doc.data());
        });
        setFilteredNotes(notes);
      } catch (error) {
        console.error("도큐먼트 존재 확인 중 오류 발생:", error);
      }
    };

    fetchNotes();
  }, [user.userId]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    const filtered = filteredNotes.filter(note =>
      note.noteText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const handleCreatePost = () => {
    navigate('/WriteNote');
  };

  const Title = styled.p`
    color: #6F4E37;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
  `;

  return (
    <Container>
      <SearchBarWrapper>
        <SearchBar
          placeholder="노트 검색"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClick={handleSearchClick}
        />
      </SearchBarWrapper>
      <div className="note-details">
        <NoteList notes={filteredNotes} />
      </div>
      <FloatingButton onClick={handleCreatePost}>+</FloatingButton>
    </Container>
  );
};

export default NotePage;
