import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bookImage from '../assets/book.png';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import SaveBtn from '../components/SaveBtn';
import BackBtn from '../components/BackBtn';
import BookModal from '../components/BookModal';
import BottomSheetModal from '../components/BottomSheetModal'
import { useSelector } from 'react-redux';
import { Timestamp, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

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

  const user = useSelector((state) => state.userA.userAccount);

  // 상태 객체로 모든 필드값을 관리
  const [formData, setFormData] = useState({
    bookImgUrl: '',
    title: '',
    authors: '',
    // noteImg: '',
    noteText: '',
  });

  const [isbn, setIsbn] = useState('')

  const save = async () => {
    const timestamp = Timestamp.fromDate(new Date());

    // Firestore에 데이터 저장
    try {
      // 'bert' 컬렉션의 user.userId 문서 참조
      const userDocRef = doc(db, 'note', user.userId); 
      // 'bert' 컬렉션의 user.userId 문서의 'books' 서브컬렉션 참조
      const booksCollectionRef = collection(userDocRef, 'books');
      // 'books' 서브컬렉션의 isbn 서브문서 참조
      const subDocRef = doc(booksCollectionRef, isbn);
      
      await setDoc(subDocRef, {
        ...formData,
        date: timestamp
      });
      console.log('데이터가 성공적으로 업로드되었습니다.');
      alert('데이터가 성공적으로 업로드되었습니다.');
    } catch (error) {
      console.error('데이터 업로드 중 오류 발생:', error);
      alert('데이터 업로드가 실패하였습니다.');
      console.log(formData);
    }
  }


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({
    isbn: '',
    title: '책 추가',
    authors: '',
    cover: bookImage
  });

  useEffect(() => {
    setIsbn(selectedBook.isbn)
    setFormData((prevData) => ({
      ...prevData,
      bookImgUrl: selectedBook.cover,
      title: selectedBook.title,
      authors: selectedBook.authors
    }));
  }, [selectedBook]);



  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const bookData = Array.from({ length: 20 }, (_, index) => ({
    isbn: "100000000000"+index,
    title: `트렌드 코리아 ${2024 - index}`,
    authors  : `저자 ${index + 1}`,
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
        <NoteInput placeholder="노트에 저장할 내용을 작성하세요" value={formData.noteText} onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              noteText: e.target.value
            }))
          }/>
      </Content>
      <SaveBtn name={"저장하기"}  onClick={save}/>
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
