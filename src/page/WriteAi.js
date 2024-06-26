import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import SaveBtn from '../components/SaveBtn';
import BackBtn from '../components/BackBtn';
import BookModal from '../components/BookModal';
import bookImage from '../assets/book.png';
import BottomSheetModal from '../components/BottomSheetModal'
import '@tensorflow/tfjs-backend-webgl'
import axios from 'axios';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import { doc, setDoc, collection, Timestamp, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const proxyUrl = './backend/etri_bert.php'
const WriteAi = () => {
  // 책 선택 modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({
    isbn: '',
    title: '책 추가',
    authors: '',
    img: bookImage
  });
  // 바텀시트 modal
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 카메라 OCR
  const [ocrText, setOcrText] = useState('');
  // const [imageData, setImageData] = useState('');
  // const videoRef = useRef(null);
  // const canvasRef = useRef(null);
  // const [showWebcam, setShowWebcam] = useState(false);
  // const [isAIExtract, setIsAIExtract] = useState(false);
  const user = useSelector((state) => state.userA.userAccount);
  const navigate = useNavigate();
   // 객체로 모든 필드값을 관리
   const [formData, setFormData] = useState({
    bookImgUrl: '',
    title: '',
    passage: '',
    question: '',
    answer: '',
    // date: '',
  });
  const [isbn, setIsbn] = useState('')
  const [isVisible, setIsVisible] = useState(true)


  // 저장하기 버튼
  const save = async () => {
    const timestamp = Timestamp.fromDate(new Date());
  
    // formData 검증
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        alert(`'${key}'가 비어있습니다. 모든 데이터를 입력해주세요.`);
        return;
      }
    }
      // formData 검증
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        alert(`'${key}'가 비어있습니다. 모든 데이터를 입력해주세요.`);
        return;
      }
    }
    // Firestore에 데이터 저장
    try {
      // 'bert' 컬렉션의 user.userId 문서 참조
      const userDocRef = doc(db, 'bert', user.userId);
      // 'bert' 컬렉션의 user.userId 문서의 'books' 서브컬렉션 참조
      const booksCollectionRef = collection(userDocRef, 'books');
      // 'books' 서브컬렉션의 isbn 서브문서 참조
      const subDocRef = doc(booksCollectionRef, isbn);
      await setDoc(subDocRef, {
        ...formData,
        date: timestamp
      });
      // console.log('데이터가 성공적으로 업로드되었습니다.');
      alert('데이터가 성공적으로 업로드되었습니다.');
    } catch (error) {
      // console.error('데이터 업로드 중 오류 발생:', error);
      alert('데이터 업로드가 실패하였습니다.');
      console.log(formData);
    }
  }
  // bert로 답변 추출하는 작업
  const findAnswer = async () => {
    const requestJson = {
      argument: {
        question: formData.question,
        passage: formData.passage ? formData.passage : ocrText
      }
    };
    console.log(formData.answer)
    try {
      const response = await axios.post(proxyUrl, requestJson, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': access_key
        }
      });
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);
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
      setIsBottomSheetOpen(true)
  }
  const closeBottomSheet = () => {
      setIsBottomSheetOpen(false)
  }
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        console.log(`Selected file: ${file.name}`);
        onFileChange(file);
        // onRequestClose();
        isBottomSheetOpen(false)
    }
};
  const handleBookInfoClick = () => {
    setModalIsOpen(true);
  };
  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setIsbn(book.isbn)
    setFormData((prevData) => ({
      ...prevData,
      bookImgUrl: book.img,
      title: book.title
    }))
    setModalIsOpen(false);
  };
  const handleBackClick = () => {
    navigate(-1);
  };
  const handleAIExtractClick = () => {
    setIsBottomSheetOpen(false)
    if (window.AndroidInterface && window.AndroidInterface.openCameraForOCR) {
      window.AndroidInterface.openCameraForOCR();
    }
  };
  const handleOpenGalleryClick = () => {
    setIsBottomSheetOpen(false);
    if (window.AndroidInterface && window.AndroidInterface.openGalleryForImage) {
        window.AndroidInterface.openGalleryForImage();
    }
    setIsVisible(false)
  };
  useEffect(() => {
    // if (showWebcam && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    //     .then(stream => {
    //       if (videoRef.current) {
    //         videoRef.current.srcObject = stream;
    //         videoRef.current.play();
    //       }
    //     })
    //     .catch(err => {
    //       console.error('Error accessing the camera: ', err);
    //     });
    // }
    window.handleOCRResult = (result) => {
      const cleanedResult = result.replace(/(\r\n|\n|\r)/gm, " ");
      // 앞뒤 공백 제거
      const trimmedResult = cleanedResult.trim();
      setOcrText(trimmedResult); // OCR 결과를 NoteInput 박스에 추가
      // setFormData((prevData) => ({
      //   ...prevData,
      //   passage: ocrText
      // }))
    };
  }, [ocrText]);
  useEffect(() => {
    const checkUserDocumentExists = async () => {
      try {
        const docRef = doc(db, "user", user.userId);
        const subColRef = collection(docRef, "book");
        //======state : ing인 서브도큐먼트 찾기================================
        const ingStateQuery = query(subColRef, where("state", "==", "ing")); //조건!!!!
        const ingQuerySnapshot = await getDocs(ingStateQuery); //서브컬렉션안에 조건에맞는 서브도큐먼트 찾아와
        const ingBooks = [];
        if (!ingQuerySnapshot.empty) {
          ingQuerySnapshot.forEach((doc) => {
            ingBooks.push(doc.data());
          });
          setIngBooks(ingBooks);
        } else {
          console.log("도큐먼트가 존재하지 않습니다.");
        }
        //======state : end인 서브도큐먼트 찾기================================
        const endStateQuery = query(subColRef, where("state", "==", "end")); //조건!!!!
        const endQuerySnapshot = await getDocs(endStateQuery); //서브컬렉션안에 조건에맞는 서브도큐먼트 찾아와
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
      <BackBtn onClick={handleBackClick} />
      <BookInfo onClick={handleBookInfoClick}>
        <BookImage src={selectedBook.img} alt="Book Cover"/>
        <BookTitle>{selectedBook.title}</BookTitle>
        <BookAuthors>{selectedBook.authors}</BookAuthors>
      </BookInfo>
      {isVisible && (
        <AddImg onClick={openBottomSheet} style={{cursor:"pointer"}}>
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
            color:'#5E7E71', 
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
        {/* {previewUrl && (
          <div>
            <img src={previewUrl} alt="Preview" style={{ maxHeight: '150px', width: '100%', borderRadius: '10px', marginBottom: '1rem'}} />
          </div>
        )} */}
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
    </Container>
  )
}
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