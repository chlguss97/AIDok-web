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

const OCRTextBox = styled.div`
  width: 100%;
  max-width: 550px;
  margin-top: 20px;
  border: 1px solid #6F4E37;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  background: #FFF8DC;
  white-space: pre-wrap; /* Preserve whitespace and line breaks */
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

const Video = styled.video`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  border: 1px solid #6F4E37;
  border-radius: 5px;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 550px;
  margin-bottom: 20px;
`;

const WriteNote = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({
    title: '책 추가',
    authors: '',
    cover: book
  });
  const [ocrText, setOcrText] = useState('');
  const [imageData, setImageData] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [isAIExtract, setIsAIExtract] = useState(false);

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

  const handlePictureClick = () => {
    setIsAIExtract(false);
    setShowWebcam(true);
  };

  const handleAIExtractClick = () => {
    setIsAIExtract(true);
    setShowWebcam(true);
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
    if (window.Android) {
      window.Android.receiveImage(dataUrl);
    }
  };

  useEffect(() => {
    if (showWebcam && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } } })
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
      setOcrText(result); // OCR 결과를 새로운 텍스트 박스에 설정
      setShowWebcam(false);
    };
  }, [showWebcam]);

  useEffect(() => {
    if (ocrText) {
      // 기존 입력 내용에 OCR 결과를 추가
      setOcrText((prevText) => prevText + '\n' + ocrText);
    }
  }, [ocrText]);

  const bookData = Array.from({ length: 20 }, (_, index) => ({
    title: `트렌드 코리아 ${2024 - index}`,
    authors: `저자 ${index + 1}`,
    cover: 'https://via.placeholder.com/150'
  }));

  return (
    <Container>
      <BackBtn onClick={handleBackClick} />
      <Header>
        <BookInfo onClick={handleBookInfoClick}>
          <BookImage src={selectedBook.cover} alt='Book Cover' />
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
        {ocrText && (
          <OCRTextBox>
            {ocrText}
          </OCRTextBox>
        )}
        <NoteInput
          placeholder='노트에 저장할 내용을 작성하세요'
          value={ocrText}
          onChange={(e) => setOcrText(e.target.value)}
        />
        <SaveBtn name={'저장하기'} style={{ marginTop: '10px', marginBottom: '60px' }} />
      </Content>
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
