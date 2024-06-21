import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import SaveBtn from '../components/SaveBtn';
import BookModal from '../components/BookModal';
import bookImage from '../assets/book.png';
import BottomSheetModal from '../components/BottomSheetModal'
import '@tensorflow/tfjs-backend-webgl'
import axios from 'axios';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import { doc, setDoc, collection, Timestamp } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const openApiURL = 'http://aiopen.etri.re.kr:8000/MRCServlet';
const access_key = '9ea2f4ff-9521-4665-aa3f-e16d9178a957';


const WriteAi = () => {

  const user = useSelector((state) => state.userA.userAccount);

   // 상태 객체로 모든 필드값을 관리
   const [formData, setFormData] = useState({
    answer: '',
    bookImgUrl: '',
    passage: '',
    question: '',
    title: '',
    // date: '',
  });

  const [isbn, setIsbn] = useState('')

  // 필드값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

   // 이미지 변경 핸들러
   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          bookImgUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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
      console.log('데이터가 성공적으로 업로드되었습니다.');
      alert('데이터가 성공적으로 업로드되었습니다.');
    } catch (error) {
      console.error('데이터 업로드 중 오류 발생:', error);
      alert('데이터 업로드가 실패하였습니다.');
      console.log(formData);
    }
  }

  // // bert
  // const [question, setQuestion] = useState('');
  // const [passage, setPassage] = useState('페이지를 업로드하면 텍스트가 추출됩니다.');
  // const [answer, setAnswer] = useState('답변이 자동으로 출력됩니다.');

  // bert로 답변 추출하는 작업
  const findAnswer = async () => {
    const requestJson = {
      argument: {
        question: formData.question,
        passage: formData.passage
      }
    };

    console.log(formData.answer)

    try {
      const response = await axios.post('/api/MRCServlet', requestJson, { // setupProxy.js에서 프록시 설정
        headers: {
          'Content-Type': 'application/json',
          'Authorization': access_key
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

  // 책 선택 modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
      title: selectedBook.title
    }));
  }, [selectedBook]);

  // 바텀시트 modal
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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

 
  const bookData = Array.from({ length: 20 }, (_, index) => ({
    isbn: "100000000000"+index,
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

  return (
    <Container>
      <BookInfo onClick={handleBookInfoClick}>
        <BookImage src={selectedBook.cover} alt="Book Cover"/>
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
          onFileChange={handleFileChange}
        />
        {previewUrl && (
          <div>
            <img src={previewUrl} alt="Preview" style={{ maxHeight: '150px', width: '100%', borderRadius: '10px', marginBottom: '1rem'}} />
          </div>
        )}

      <ExtractedText value={formData.passage} onChange={(e) =>
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
  height: 8rem;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;

const ExtractedText = styled.textarea`
  background-color: #5E7E71;
  color: white;
  border: 2px solid #6F4E37;
  height: 5rem;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 1rem;
  overflow: auto;
  font-size: 11px;
  width: 100%;
  box-sizing: border-box;
`;

const InputText = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  height: 5rem;
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