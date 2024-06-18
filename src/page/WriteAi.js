import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import SaveBtn from '../components/SaveBtn';
import BookModal from '../components/BookModal';
import bookImage from '../assets/book.png'; // 적절한 이미지 파일 경로를 지정하세요.
import BottomSheetModal from '../components/BottomSheetModal'

const WriteAi = () => {
  const [image, setImage] = useState();
  const [question, setQuestion] = useState('');
  const [file, setFile] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({
    title: '책 추가',
    authors: '',
    cover: bookImage
  });

  // 모달 상태 관리
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const openBottomSheet = () => {
      setIsBottomSheetOpen(true)
  }
  const closeBottomSheet = () => {
      setIsBottomSheetOpen(false)
  }
 
  const bookData = Array.from({ length: 20 }, (_, index) => ({
    title: `트렌드 코리아 ${2024 - index}`,
    authors: `저자 ${index + 1}`,
    cover: "https://via.placeholder.com/150"
  }));

  const changeFile = (event) => {
    const files = event.target.files;
    setFile(files[0]);
  };

  const changeQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const inputQnA = () => {
    alert("입력된 내용: " + question);
  };

  const save = () => {
    alert("저장합니다");
  };

  const addImg = () => {
    alert("이미지를 추가합니다");
  };

  const submitFile = (event) => {
    event.preventDefault();
    alert(file.name + "\n" + file.type + "\n" + file.size);
  };

  const handleBookInfoClick = () => {
    setModalIsOpen(true);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setModalIsOpen(false);
  };

  useEffect(() => {
    // 초기 데이터 로드 등 비동기 작업이 필요할 때 useEffect를 사용
  }, []);

  return (
    <Container>
      <BookInfo onClick={handleBookInfoClick}>
        <BookImage src={selectedBook.cover} alt="Book Cover" />
        <BookTitle>{selectedBook.title}</BookTitle>
        <BookAuthors>{selectedBook.authors}</BookAuthors>
      </BookInfo>
      <BottomSheetModal
        isOpen={isBottomSheetOpen}
        onRequestClose={closeBottomSheet}
      />
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
      <ExtractedText>
        대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다. 
        이 헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다. 
        지방자치단체는 주민의 복리에 관한 사무를 처리하고 재산을 관리하며, 법령의 범위안에서 자치에 관한 규정을 제정할 수 있다. 
        정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지 국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야 한다.
      </ExtractedText>
      <InputText placeholder="질문 내용을 입력하세요" onChange={changeQuestion}></InputText>
      <InputBtn onClick={inputQnA}>입력 완료</InputBtn>
      <Answer>
        A: 창작의 영역입니다.
        창작의 영역입니다.
        창작의 영역입니다.
        창작의 영역입니다.
        창작의 영역입니다.
        창작의 영역입니다.
        창작의 영역입니다.
        창작의 영역입니다.
      </Answer>
      <SaveBtn name="저장하기" onClick={save}></SaveBtn>
      <BookModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        books={bookData}
        onBookSelect={handleBookSelect}
      />
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

const AddImg = styled.div`
  position: relative;
  border: 2px solid #5E7E71;
  border-radius: 10px;
  height: 8rem;
  margin-bottom: 2rem;
  width: 100%;
`;

const ExtractedText = styled.div`
  background-color: #5E7E71;
  color: white;
  border: 2px solid #6F4E37;
  height: 5rem;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 2rem;
  overflow: hidden;
  font-size: 11px;
  width: 100%;
`;

const InputText = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  height: 7rem;
  background-color: white;
  color: black;
  border: 2px solid #5E7E71;
  border-radius: 10px;
  margin-bottom: 1rem;
  font-size: 11px;
  padding: 10px;
`;

const Answer = styled.p`
  font-size: 16px;
  color: #5F5C5C;
  font-weight: bold;
  width: 100%;
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