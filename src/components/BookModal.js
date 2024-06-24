// src/components/BookModal.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import { collection, doc, getDocs } from 'firebase/firestore';

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

const BookModal = ({ isOpen, onRequestClose, userId, onBookSelect }) => {

  const user = useSelector((state) => state.userA.userAccount);

  const [books, setBooks] = useState([])

  useEffect(() => {
    if (isOpen) {
      // Firestore에서 데이터 가져오기
      const fetchBooks = async () => {
        try {
          // const booksCollection = await db.collection('user').doc(user.userId).collection('books').get();
          const userDocRef = doc(db, 'user', user.userId)
          const booksCollectionRef = collection(userDocRef, 'book')
          const querySnapshot = await getDocs(booksCollectionRef)
          
          const booksData = [];
          querySnapshot.forEach(doc => {
            booksData.push({
              id: doc.id,
              ...doc.data()
            });
          });

          console.log(booksData)
          setBooks(booksData);
        } catch (error) {
          console.error("Error fetching books: ", error);
        }
      };

      fetchBooks();
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

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
            <BookImage src={book.img} alt={book.title} />
            <BookTitle>{book.title}</BookTitle>
          </BookCard>
        ))}
      </ModalContent>
      <ModalButton onClick={onRequestClose}>닫기</ModalButton>
    </Modal>
  );
};

export default BookModal;