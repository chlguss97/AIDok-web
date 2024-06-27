import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import SaveBtn from '../components/SaveBtn';
import BackBtn from '../components/BackBtn';
import BookModal from '../components/BookModal';
import bookImage from '../assets/book.png';
import BottomSheetModal from '../components/BottomSheetModal';
import '@tensorflow/tfjs-backend-webgl';
import axios from 'axios';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import { doc, setDoc, collection, Timestamp, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import loadingImg from '../assets/loading.gif'

const proxyUrl = './backend/etri_bert.php';

const WriteAi = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({
    isbn: '',
    title: '책 추가',
    authors: '',
    img: bookImage
  });
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userA.userAccount);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookImgUrl: '',
    title: '',
    passage: '.',
    question: '',
    answer: '',
  });
  const [isbn, setIsbn] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const save = async () => {
    const timestamp = Timestamp.fromDate(new Date());
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        alert(`'${key}'가 비어있습니다. 모든 데이터를 입력해주세요.`);
        return;
      }
    }
    try {
      const userDocRef = doc(db, 'bert', user.userId);
      const booksCollectionRef = collection(userDocRef, 'books');
      const subDocRef = doc(booksCollectionRef, isbn);
      await setDoc(subDocRef, {
        ...formData,
        date: timestamp
      });
      alert('데이터가 성공적으로 업로드되었습니다.');
      navigate(-1)
    } catch (error) {
      alert('데이터 업로드가 실패하였습니다.');
      console.log(formData);
    }
  };

  const findAnswer = async () => {
    const requestJson = {
      argument: {
        question: formData.question,
        passage: formData.passage ? formData.passage : ocrText
      }
    };
    try {
      const response = await axios.post(proxyUrl, requestJson, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const answer = response.data.return_object.MRCInfo.answer;
      setFormData((prevData) => ({
        ...prevData,
        answer: answer
      }));
    } catch (error) {
      console.error('Error accessing ETRI API:', error);
    }
  };

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Selected file: ${file.name}`);
      // Handle file change logic here
      setIsBottomSheetOpen(false);
    }
  };

  const handleBookInfoClick = () => {
    setModalIsOpen(true);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setIsbn(book.isbn);
    setFormData((prevData) => ({
      ...prevData,
      bookImgUrl: book.img,
      title: book.title
    }));
    setModalIsOpen(false);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAIExtractClick = () => {
    setIsBottomSheetOpen(false);
    if (window.AndroidInterface && window.AndroidInterface.openCameraForOCR) {
      window.AndroidInterface.openCameraForOCR();
    }
    setIsVisible(false);
  };

  const handleOpenGalleryClick = () => {
    setIsBottomSheetOpen(false);
    if (window.AndroidInterface && window.AndroidInterface.openGalleryForImage) {
      window.AndroidInterface.openGalleryForImage();
    }
    setIsVisible(false);
  };

  useEffect(() => {
    window.handleOCRResult = (result) => {
      const cleanedResult = result.replace(/(\r\n|\n|\r)/gm, " ");
      const trimmedResult = cleanedResult.trim();
      setOcrText(trimmedResult);
      setLoading(true);
      setTimeout(() => {
        setLoading(false); // 2초 후에 로딩 상태를 false로 설정
      }, 2000);
    };
  }, [ocrText]);

  useEffect(() => {
    const checkUserDocumentExists = async () => {
      try {
        const docRef = doc(db, "user", user.userId);
        const subColRef = collection(docRef, "book");
        const ingStateQuery = query(subColRef, where("state", "==", "ing"));
        const ingQuerySnapshot = await getDocs(ingStateQuery);
        const ingBooks = [];
        if (!ingQuerySnapshot.empty) {
          ingQuerySnapshot.forEach((doc) => {
            ingBooks.push(doc.data());
          });
          setIngBooks(ingBooks);
        }
        const endStateQuery = query(subColRef, where("state", "==", "end"));
        const endQuerySnapshot = await getDocs(endStateQuery);
        const endBooks = [];
        if (!endQuerySnapshot.empty) {
          endQuerySnapshot.forEach((doc) => {
            endBooks.push(doc.data());
          });
          setEndBooks(endBooks);
        }
        setBookData([...ingBooks, ...endBooks]);
      } catch (error) {
        console.error("도큐먼트 존재 확인 중 오류 발생:", error);
      }
    };
    checkUserDocumentExists();
  }, [user.userId]);

  const [ingBooks, setIngBooks] = useState([]);
  const [endBooks, setEndBooks] = useState([]);
  const [bookData, setBookData] = useState([]);

  return (
    <Container>
      {loading && (
        <LoadingOverlay>
          <LoadingContainer>
            <img src={loadingImg} alt='loading' style={{ width: '200px' }} />
            <p style={{ color: '#5E7E71' }}>AI가 데이터를 추출 중입니다.</p>
          </LoadingContainer>
        </LoadingOverlay>
      )}
      {!loading && (
        <>
          <BackBtn onClick={handleBackClick} />
          <BookInfo onClick={handleBookInfoClick}>
            <BookImage src={selectedBook.img} alt="Book Cover" />
            <BookTitle>{selectedBook.title}</BookTitle>
            <BookAuthors>{selectedBook.authors}</BookAuthors>
          </BookInfo>
          {isVisible && (
            <AddImg onClick={openBottomSheet} style={{ cursor: "pointer" }}>
              <FaPlus style={{
                color: '#5E7E71',
                width: '3rem',
                height: '3rem',
                position: "absolute",
                left: '50%',
                top: '50%',
                transform: "translate(-50%, -50%)",
              }} />
              <p style={{
                color: '#5E7E71',
                position: "absolute",
                left: '50%',
                top: '70%',
                transform: "translate(-50%, -50%)",
              }}>사진 추가</p>
            </AddImg>
          )}
          <BottomSheetModal
            isOpen={isBottomSheetOpen}
            onRequestClose={closeBottomSheet}
            handleAIExtractClick={handleAIExtractClick}
            handleOpenGalleryClick={handleOpenGalleryClick}
            onFileChange={onFileChange}>
          </BottomSheetModal>
          <ExtractedText placeholder='사진을 추가해보세요! 텍스트가 자동으로 인식됩니다.' defaultValue={ocrText} onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              passage: e.target.value
            }))
          }></ExtractedText>
          <InputText placeholder="질문 내용을 입력하세요." value={formData.question} onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              question: e.target.value
            }))}>
          </InputText>
          <InputBtn onClick={findAnswer}>입력 완료</InputBtn>
          <Answer>A: {formData.answer}</Answer>
          <SaveBtn name="저장하기" onClick={save}></SaveBtn>
          <BookModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            books={bookData}
            onBookSelect={handleBookSelect}
          />
        </>
      )}
    </Container>
  );
};

export default WriteAi;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8%;
  padding-bottom: 35%;
  padding-left: 8%;
  padding-right: 8%;
  background-color: white;
  height: 100%;
  font-family: Arial, sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 70px;
  height: auto;
  margin-bottom: 10px;
`;

const BookTitle = styled.div`
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #5F5C5C;
`;

const BookAuthors = styled.div`
  font-size: 10px;
  color: #5F5C5C;
`;

const AddImg = styled.div`
  position: relative;
  border: 2px solid #5E7E71;
  border-radius: 10px;
  height: 150px;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
`;

const ExtractedText = styled.textarea`
  background-color: #5E7E71;
  color: white;
  border: 2px solid #6F4E37;
  height: 150px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 1rem;
  overflow: auto;
  font-size: 11px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder{
    color: white;
  }
`;

const InputText = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  height: 150px;
  background-color: white;
  color: black;
  border: 2px solid #5E7E71;
  border-radius: 10px;
  margin-bottom: 1rem;
  font-size: 11px;
  padding: 10px;
`;

const Answer = styled.p`
  font-size: 15px;
  color: #5F5C5C;
  font-weight: bold;
  width: 100%;
  height: 5rem;
  overflow: auto;
`;

const InputBtn = styled.button`
  background-color: #5E7E71;
  border: none;
  border-radius: 2px;
  color: white;
  width: 100px;
  height: 2rem;
  margin-left: auto;
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 20px;
`;
