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
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';
import camera from "../assets/camera.png"
import gallery from "../assets/gallery.png"

const openApiURL = 'http://aiopen.etri.re.kr:8000/MRCServlet';
const access_key = '9ea2f4ff-9521-4665-aa3f-e16d9178a957';
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 카메라 OCR
  const [ocrText, setOcrText] = useState('');
  const [imageData, setImageData] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [isAIExtract, setIsAIExtract] = useState(false);
  
  const user = useSelector((state) => state.userA.userAccount);
  const navigate = useNavigate();

   // 객체로 모든 필드값을 관리
   const [formData, setFormData] = useState({
    answer: '',
    bookImgUrl: '',
    passage: '',
    question: '',
    title: '',
    // date: '',
  });

  const [isbn, setIsbn] = useState('')

  // // 필드값 변경 핸들러
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  // };

  //  // 이미지 변경 핸들러
  //  const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         bookImgUrl: reader.result
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // 저장하기 버튼
  const save = async () => {
    const timestamp = Timestamp.fromDate(new Date());

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
      const response = await axios.post(proxyUrl, requestJson, { // setupProxy.js에서 프록시 설정
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
      if (error.response) {
        // 서버 응답이 있고 오류 상태 코드가 있는 경우
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
      } else if (error.request) {
        // 요청이 전송되었지만 응답이 없는 경우
        console.error('Request Data:', error.request);
      } else {
        // 요청 설정 중에 발생한 오류
        console.error('Error Message:', error.message);
      }
      console.error('Error Config:', error.config);
    }
  };


  const openBottomSheet = () => {
      setIsBottomSheetOpen(true)
  }
  const closeBottomSheet = () => {
      setIsBottomSheetOpen(false)
  }
  const handleFileChange = (file) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
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
    setModalIsOpen(false);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handlePictureClick = () => {
    setIsAIExtract(false);
    setShowWebcam(true);
  };

  const handleOpenFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const handleAIExtractClick = () => {
    setIsBottomSheetOpen(false)
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
      
      const cleanedResult = result.replace(/(\r\n|\n|\r)/gm, " ");
      // 앞뒤 공백 제거
      const trimmedResult = cleanedResult.trim();
      
      setOcrText(trimmedResult); // OCR 결과를 NoteInput 박스에 추가
      // setFormData((prevData) => ({
      //   ...prevData,
      //   passage: ocrText
      // }))
    };
  }, [showWebcam,ocrText]);

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
            
      {!previewUrl && (
        <AddImg onClick={openBottomSheet} style={{cursor:"pointer"}}>
          <FaPlus style={{
            color: '#5E7E71',
            width: '3rem',
            height: '3rem',
            position: "absolute",
            left: '50%',
            top: '50%',
            transform: "translate(-50%, -50%)"
          }} />
        </AddImg>
      )}
        <BottomSheetModal
          isOpen={isBottomSheetOpen}
          onRequestClose={closeBottomSheet}
          handleAIExtractClick={handleAIExtractClick}
          handleOpenFileInput={handleOpenFileInput}
          onFileChange={onFileChange}>
        </BottomSheetModal>
        
        {previewUrl && (
          <div>
            <img src={previewUrl} alt="Preview" style={{ maxHeight: '150px', width: '100%', borderRadius: '10px', marginBottom: '1rem'}} />
          </div>
        )}

      <ExtractedText placeholder='사진을 추가하면 텍스트가 추출됩니다' defaultValue={ocrText} onChange={(e) =>
        setFormData((prevData) => ({
          ...prevData,
          passage: e.target.value
        }))
      }></ExtractedText>
      <InputText placeholder="질문 내용을 입력하세요" value={formData.question} onChange={(e) => 
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
  height: 100vh;
  font-family: Arial, sans-serif;
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
  height: 15vh;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;

const ExtractedText = styled.textarea`
  background-color: #5E7E71;
  color: white;
  border: 2px solid #6F4E37;
  height: 15vh;
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
  height: 15vh;
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