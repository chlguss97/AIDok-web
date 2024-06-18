// src/components/BookModal.js
import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 20px;
`;

const BookCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
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

const ModalButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #6F4E37;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const BookModal = ({ isOpen, onRequestClose, books, onBookSelect }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="책 선택 모달"
      ariaHideApp={false}
    >
      <ModalContent>
        {books.map((book, index) => (
          <BookCard key={index} onClick={() => onBookSelect(book)}>
            <BookImage src={book.cover} alt={book.title} />
            <BookTitle>{book.title}</BookTitle>
          </BookCard>
        ))}
      </ModalContent>
      <ModalButton onClick={onRequestClose}>닫기</ModalButton>
    </Modal>
  );
};

export default BookModal;