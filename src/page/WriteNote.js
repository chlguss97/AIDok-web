import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import book from '../assets/book.png';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import SaveBtn from '../components/SaveBtn';
import BackBtn from '../components/BackBtn';
import BookModal from '../components/BookModal';
import BottomSheetModal from '../components/BottomSheetModal'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8%;
  background-color: white;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Content = styled.div`
  width: 85%;
  max-width: 400px;
  border: 2px solid #6F4E37;
  border-radius: 10px;
  padding: 20px;
  background-color: #FFFAED;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  height: calc(100vh - 350px);
  margin-bottom: 20px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  color: #5F5C5C;
  cursor: pointer;
`;

const BookImage = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 10px;
`;

const BookTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #5F5C5C;
`;

const BookAuthors = styled.div`
  font-size: 14px;
  color: #5F5C5C;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px dashed #5F5C5C;
  background-color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  color: #6F4E37;
`;

const NoteInput = styled.textarea`
  width: 92%;
  height: 60%;
  margin-top: 20px;
  border: 1px solid #6F4E37;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  background: none;
  &:focus { outline:2px solid #5E7E71; }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  align-items: end;
  display: flex;
  justify-content: start;
  align-items: start;
`;

const WriteNote = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({
    title: '책 추가',
    authors: '',
    cover: book
  });

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const bookData = Array.from({ length: 20 }, (_, index) => ({
    title: `트렌드 코리아 ${2024 - index}`,
    authors: `저자 ${index + 1}`,
    cover: "https://via.placeholder.com/150"
  }));

  const handleBookInfoClick = () => {
    setModalIsOpen(true);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setModalIsOpen(false);
  };

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <BackBtn onClick={handleBackClick} />
      <Header>
        <BookInfo onClick={handleBookInfoClick}>
          <BookImage src={selectedBook.cover} alt="Book Cover" />
          <BookTitle>{selectedBook.title}</BookTitle>
          <BookAuthors>{selectedBook.authors}</BookAuthors>
        </BookInfo>
      </Header>
      <BottomSheetModal
        isOpen={isBottomSheetOpen}
        onRequestClose={closeBottomSheet}
      />
      <Content>
        <ActionButton onClick={openBottomSheet} style={{cursor:"pointer"}}>
          <Icon src={icon1} alt="Underline Icon" />
          사진 & 하이라이트
        </ActionButton>
        <ActionButton onClick={openBottomSheet} style={{cursor:"pointer"}}>
          <Icon src={icon2} alt="Underline Icon"  />
          AI로 텍스트 추출
        </ActionButton>
        <NoteInput placeholder="노트에 저장할 내용을 작성하세요" />
      </Content>
      <SaveBtn name={"저장하기"} />
      <BookModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        books={bookData}
        onBookSelect={handleBookSelect}
      />
    </Container>
  );
};

export default WriteNote;
