import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';

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

const BookModal = ({ isOpen, onRequestClose, onBookSelect }) => {
  const [books, setBooks] = useState([]);
  const user = useSelector((state) => state.userA.userAccount);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const docRef = doc(db, "user", user.userId);
        const subColRef = collection(docRef, "book");

        // state : ing인 서브도큐먼트 찾기
        const ingStateQuery = query(subColRef, where("state", "==", "ing"));
        const ingQuerySnapshot = await getDocs(ingStateQuery);
        const iBooks = [];
        if (!ingQuerySnapshot.empty) {
          ingQuerySnapshot.forEach((doc) => {
            iBooks.push(doc.data());
          });
        }

        // state : end인 서브도큐먼트 찾기
        const endStateQuery = query(subColRef, where("state", "==", "end"));
        const endQuerySnapshot = await getDocs(endStateQuery);
        const eBooks = [];
        if (!endQuerySnapshot.empty) {
          endQuerySnapshot.forEach((doc) => {
            eBooks.push(doc.data());
          });
        }

        setBooks([...iBooks, ...eBooks]);
      } catch (error) {
        console.error("도큐먼트 존재 확인 중 오류 발생:", error);
      }
    };

    fetchBooks();
  }, [user.userId]);

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