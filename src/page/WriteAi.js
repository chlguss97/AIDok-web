import React, { useState} from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import SaveBtn from '../components/SaveBtn';
import BookModal from '../components/BookModal';
import bookImage from '../assets/book.png';
import BottomSheetModal from '../components/BottomSheetModal'
import '@tensorflow/tfjs-backend-webgl'
import axios from 'axios';

const openApiURL = 'http://aiopen.etri.re.kr:8000/MRCServlet';
const access_key = '9ea2f4ff-9521-4665-aa3f-e16d9178a957';


const WriteAi = () => {

  // bert
  const [question, setQuestion] = useState('');
  const [passage, setPassage] = useState('페이지를 업로드하면 텍스트가 추출됩니다.');
  const [answer, setAnswer] = useState('답변이 자동으로 출력됩니다.');

  const findAnswer = async () => {
    const requestJson = {
      argument: {
        question: question,
        passage: passage
      }
    };

    try {
      const response = await axios.post(openApiURL, requestJson, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': access_key
        }
      });

      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);

      const answer = response.data.return_object.MRCInfo.answer;
      setAnswer(answer);

    } catch (error) {
      console.error('Error accessing ETRI API:', error);
    }
  };

  // 책 선택 modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({
    title: '책 추가',
    authors: '',
    cover: bookImage
  });


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
    title: `트렌드 코리아 ${2024 - index}`,
    authors: `저자 ${index + 1}`,
    cover: "https://via.placeholder.com/150"
  }));

  const save = () => {
    alert("저장합니다")
  }

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
        <BookImage src={selectedBook.cover} alt="Book Cover" />
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

      <ExtractedText value={passage} onChange={(e) => setPassage(e.target.value)}></ExtractedText>
      <InputText placeholder="질문 내용을 입력하세요" value={question} onChange={(e) => setQuestion(e.target.value)}></InputText>
      <InputBtn onClick={findAnswer}>입력 완료</InputBtn>
      <Answer>A: {answer}</Answer>
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