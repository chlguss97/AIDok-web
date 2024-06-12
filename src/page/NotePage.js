import React, { useState } from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import searchIcon from '../assets/searchicon.png'; // 검색 아이콘 이미지를 가져옵니다.
import backIcon from '../assets/backicon.png'; // 뒤로가기 아이콘 이미지를 가져옵니다.

const books = [
  { id: 1, title: 'qwer', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'asdf', image: 'https://via.placeholder.com/150' },
  { id: 3, title: 'test', image: 'https://via.placeholder.com/150' },
  { id: 4, title: 'aaaaa', image: 'https://via.placeholder.com/150' },
  { id: 5, title: 'aaaaaa', image: 'https://via.placeholder.com/150' },
];

const initialNotes = [
  { id: 1, title: "qwer", content: "온 세상이 경연구 사이에 대해 말하고 있다. 인공지능 기술의 발전으로 인한 삶의 변화를 실감할 수 있었습니다.", date: "2024.06.10" },
  { id: 2, title: "Learning React 2", content: "온 세상이 경연구 사이에 대해 말하고 있다. 인공지능 기술의 발전으로 인한 삶의 변화를 실감할 수 있었습니다.", date: "2024.06.10" },
  { id: 3, title: "Learning React 3", content: "온 세상이 경연구 사이에 대해 말하고 있다. 인공지능 기술의 발전으로 인한 삶의 변화를 실감할 수 있었습니다.", date: "2024.06.10" },
  { id: 4, title: "Learning React 4", content: "온 세상이 경연구 사이에 대해 말하고 있다. 인공지능 기술의 발전으로 인한 삶의 변화를 실감할 수 있었습니다.", date: "2024.06.10" }
];

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
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

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  padding: 0; /* 버튼의 기본 패딩을 제거 */
  img {
    width: 20px;
    height: 20px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #5E7E71;
  border-radius: 20px;
  padding: 10px 10px;
  background-color: #6F4E37;
  flex: 1; /* 너비를 늘려서 남은 공간을 채웁니다. */

  &:focus-within {
    background-color: #5E7E71; /* 초록색으로 변경 */
  }
`;

const SearchInput = styled.input`
  border: none;
  font-size: 16px;
  outline: none;
  flex: 1;
  background: none;
  color: white;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #8B4513;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
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
    {notes.map((note, index) => {
      const book = books.find(book => book.id === note.id);
      return (
        <Note 
          key={index}
          title={note.title}
          content={note.content}
          date={note.date}
          image={book ? book.image : 'https://via.placeholder.com/150'}
        />
      );
    })}
  </div>
);

const SearchBarComponent = ({ searchTerm, setSearchTerm }) => (
  <SearchBarWrapper>
    <BackButton>
      <img src={backIcon} alt="Back" />
    </BackButton>
    <SearchBar>
      <SearchInput
        type="text"
        placeholder="노트 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchButton><Icon src={searchIcon} alt="search" /></SearchButton>
    </SearchBar>
  </SearchBarWrapper>
);

const NotePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useState(initialNotes);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <SearchBarComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="note-details">
        <NoteList notes={filteredNotes} />
      </div>
      <FloatingButton>+</FloatingButton>
    </Container>
  );
};

export default NotePage;