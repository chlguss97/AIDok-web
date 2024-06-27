import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import book from '../assets/book.png';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import SaveBtn from '../components/SaveBtn';
import BackBtn from '../components/BackBtn';
import BookModal from '../components/BookModal';
import BottomSheetModal from '../components/BottomSheetModal';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import loadingImg from '../assets/loading.gif'

const WriteNote = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({
    title: '책 추가',
    authors: '',
    img: book,
    isbn: ''
  });
  const [ocrText, setOcrText] = useState('');
  const [imageData, setImageData] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [isAIExtract, setIsAIExtract] = useState(false);
  const user = useSelector((state) => state.userA.userAccount);
  const navigate = useNavigate();

  const handleBookInfoClick = () => {
    setModalIsOpen(true);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setModalIsOpen(false);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handlePictureClick = () => {
    setIsAIExtract(false);
    setShowWebcam(true);
  };

  const handleAIExtractClick = () => {
    if (window.AndroidInterface && window.AndroidInterface.openCameraForOCR) {
      window.AndroidInterface.openCameraForOCR();
    }
  };

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      if (isAIExtract) {
        sendImageToApp(dataUrl);
      } else {
        setImageData(dataUrl);
      }
      setShowWebcam(false); // 웹캠 종료
    }
  };

  const sendImageToApp = (dataUrl) => {
    if (window.AndroidInterface && window.AndroidInterface.receiveImage) {
      window.AndroidInterface.receiveImage(dataUrl);
    }
    setLoading(true); // 로딩 화면 표시
    setTimeout(() => {
      setLoading(false); // 2초 후 로딩 화면 숨기기
    }, 2000);
  };

  useEffect(() => {
    if (showWebcam && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch(err => {
          console.error('Error accessing the camera: ', err);
        });
    }

    window.handleOCRResult = (result) => {
      setLoading(true); // OCR 결과를 받을 때 로딩 화면 표시
      setTimeout(() => {
        setOcrText((prevText) => prevText + '\n' + result);
        setLoading(false); // 2초 후 로딩 화면 숨기기
      }, 2000);
    };
  }, [showWebcam]);

  const handleSaveClick = async () => {
    const noteData = {
      authors: selectedBook.authors || '',
      bookImgUrl: selectedBook.img || '',
      date: new Date(),
      noteText: ocrText,
      title: selectedBook.title || '',
    };

    try {
      const docRef = doc(db, "note", user.userId);
      const subColRef = collection(docRef, "books");
      const bookDocRef = doc(subColRef, selectedBook.isbn);

      await setDoc(bookDocRef, noteData);
      alert("노트가 저장되었습니다.");
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error("노트 저장 중 오류 발생:", error);
      alert("노트 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

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
        } else {
          console.log("도큐먼트가 존재하지 않습니다.");
        }

        const endStateQuery = query(subColRef, where("state", "==", "end"));
        const endQuerySnapshot = await getDocs(endStateQuery);
        const endBooks = [];
        if (!endQuerySnapshot.empty) {
          endQuerySnapshot.forEach((doc) => {
            endBooks.push(doc.data());
          });
          setEndBooks(endBooks);
        } else {
          console.log("도큐먼트가 존재하지 않습니다.");
        }

        setBookData([...ingBooks, ...endBooks]); // 가져온 ing 및 end 북들을 필터된 노트로 설정
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
          <Header>
            <BookInfo onClick={handleBookInfoClick}>
              <BookImage src={selectedBook.img} alt='Book Cover' />
              <BookTitle>{selectedBook.title}</BookTitle>
              <BookAuthors>{selectedBook.authors}</BookAuthors>
            </BookInfo>
          </Header>
          <BottomSheetModal
            isOpen={isBottomSheetOpen}
            onRequestClose={() => setIsBottomSheetOpen(false)}
          />
          <ActionButtons>
            <ActionButton onClick={handlePictureClick} style={{ cursor: 'pointer' }}>
              <Icon src={icon1} alt='Underline Icon' />
              사진 & 하이라이트
            </ActionButton>
            <ActionButton onClick={handleAIExtractClick} style={{ cursor: 'pointer' }}>
              <Icon src={icon2} alt='AI Extract Icon' />
              AI로 텍스트 추출
            </ActionButton>
          </ActionButtons>
          {showWebcam && (
            <div>
              <Video ref={videoRef} autoPlay playsInline></Video>
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
              <ActionButton onClick={takePicture} style={{ cursor: 'pointer', margin: '20px auto' }}>
                <Icon src={icon1} alt='Capture Icon' />
                사진 찍기
              </ActionButton>
            </div>
          )}
          <Content>
            {imageData && (
              <ImageContainer>
                <img src={imageData} alt='Captured' style={{ width: '100%', height: 'auto', marginBottom: '10px', border: '1px solid #6F4E37', borderRadius: '5px' }} />
              </ImageContainer>
            )}
            <NoteInput
              placeholder='노트에 저장할 내용을 작성하세요'
              value={ocrText}
              onChange={(e) => setOcrText(e.target.value)}
            />
            <SaveBtn name={'저장하기'} style={{ marginTop: '10px', marginBottom: '60px' }} onClick={handleSaveClick} />
          </Content>
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

export default WriteNote;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8%;
  padding-bottom: 20%;
  padding-left: 8%;
  padding-right: 8%;
  background-color: white;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: Arial, sans-serif;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px;
  border: 2px solid #6F4E37;
  border-radius: 10px;
  padding: 20px;
  background-color: #FFFAED;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
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

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  flex: 1;
  max-width: 150px;
  padding: 10px;
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
  width: 100%;
  max-width: 550px;
  height: 300px;
  margin-top: 20px;
  border: 1px solid #6F4E37;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  background: none;
  resize: none;
  &:focus {
    outline: 2px solid #5E7E71;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 550px;
  margin-bottom: 20px;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 9999;
`;

const LoadingContainer = styled.div`
  text-align: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  border: 1px solid #6F4E37;
  border-radius: 5px;
`;
