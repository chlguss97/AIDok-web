import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SaveBtn from './SaveBtn';
import { FaPlus } from 'react-icons/fa';
import backIcon from '../assets/backicon.png';
import BookModal from '../components/BookModal';
import book from '../assets/book.png'; // 적절한 이미지 파일 경로를 지정하세요.

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  padding-top: 8%;
  padding-bottom: 35%;
  padding-left: 8%;
  padding-right: 8%;
`;

const Title = styled.h2`
  color: #6F4E37;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFFAED;
  border: 2px solid #6F4E37;
  padding: 20px;
  border-radius: 10px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

const ImageUploadWrapperBase = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 2px solid #5E7E71;
  background-color: white;

  ${({ hasImage }) => hasImage && `
    border: none;
  `}
`;

const ImageUploadWrapper = styled(ImageUploadWrapperBase)`
  width: 130px;
  height: 150px;
  flex-direction: column;
`;

const FullWidthImageUploadWrapper = styled(ImageUploadWrapperBase)`
  width: 100%;
  height: ${({ hasImage }) => hasImage ? 'auto' : '200px'};
  cursor: pointer;
  margin-bottom: 20px;
  flex-direction: column;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const PlusIcon = styled(FaPlus)`
  font-size: 2rem;
  color: #5E7E71;
`;

const AddPhotoText = styled.span`
  margin-top: 10px;
  font-size: 1rem;
  color: #5E7E71;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const InfoText = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 15px;
  border: 1px solid #5E7E71;
  border-radius: 5px;
  font-size: 1rem;
  resize: none;
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
  margin-top: 15px;
  margin-bottom: 10px;
`;

const BookTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
  color: black;
`;

const BookAuthors = styled.div`
  font-size: 14px;
`;

const WriteBoard = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [content, setContent] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({
    title: '책 추가',
    authors: '',
    cover: book
  });
  const fileInputRef2 = useRef(null);
  const navigate = useNavigate();

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage2(URL.createObjectURL(file));
    }
  };

  const handleImageUploadClick2 = () => {
    fileInputRef2.current.click();
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the post logic here
  };

  const handleBookInfoClick = () => {
    setModalIsOpen(true);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setImage1(book.cover);  // 책 선택 시 이미지 업데이트
    setModalIsOpen(false);
  };

  return (
    <Container>
      <BackButton onClick={handleBackClick}>
        <img src={backIcon} alt="Back" />
      </BackButton>
      <Title>글 작성</Title>
      <Form onSubmit={handleSubmit}>
        <InfoContainer>
          <BookInfo onClick={handleBookInfoClick}>
            <BookImage src={selectedBook.cover} alt="Book Cover" />
            <BookTitle> {selectedBook.title}</BookTitle>
            <BookAuthors> {selectedBook.authors}</BookAuthors>
          </BookInfo>
        </InfoContainer>
        <FullWidthImageUploadWrapper hasImage={!!image2} onClick={handleImageUploadClick2}>
          {image2 ? <ImagePreview src={image2} alt="이미지 미리보기" /> : (
            <>
              <PlusIcon />
              <AddPhotoText>사진추가</AddPhotoText>
            </>
          )}
        </FullWidthImageUploadWrapper>
        <HiddenInput
          type="file"
          ref={fileInputRef2}
          accept="image/*"
          onChange={handleImageChange2}
        />
        <Textarea
          id="content"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="공유하고 싶은 내용을 작성하세요"
        />
        <SaveBtn name="저장하기" />
      </Form>
      <BookModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        books={[
          { title: '트렌드 코리아 2023', authors: '김난도, 전지현, 박혜수, 최지혜', cover: 'https://via.placeholder.com/150' },
          { title: '트렌드 코리아 2024', authors: '김난도, 전지현, 박혜수, 최지혜', cover: 'https://via.placeholder.com/150' }
        ]}
        onBookSelect={handleBookSelect}
      />
    </Container>
  );
};

export default WriteBoard;
