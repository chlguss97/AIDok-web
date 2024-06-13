import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import SaveBtn from './SaveBtn';

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled.h2`
  color: #6F4E37;
  font-size: 2rem;
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
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
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
  margin-bottom: 20px;
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
  margin-bottom: 15px;
  border: 1px solid #5E7E71;
  border-radius: 5px;
  font-size: 1rem;
  resize: none;
`;

const WriteBoard = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [content, setContent] = useState('');
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const navigate = useNavigate();

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage1(URL.createObjectURL(file));
    }
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage2(URL.createObjectURL(file));
    }
  };

  const handleImageUploadClick1 = () => {
    fileInputRef1.current.click();
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

  return (
    <Container>
      <BackButton onClick={handleBackClick}>
        <FaArrowLeft />
      </BackButton>
      <Title>글 작성</Title>
      <Form onSubmit={handleSubmit}>
        <InfoContainer>
          <ImageUploadWrapper hasImage={!!image1} onClick={handleImageUploadClick1}>
            {image1 ? <ImagePreview src={image1} alt="이미지 미리보기" /> : (
              <>
                <PlusIcon />
                <AddPhotoText>책 검색</AddPhotoText>
              </>
            )}
          </ImageUploadWrapper>
          <InfoText>
            <p><BoldSpan>제목</BoldSpan> : 트렌드 코리아 2023</p>
            <p><BoldSpan>저자</BoldSpan> : 김난도, 전지현, 박혜수, 최지혜</p>
          </InfoText>
        </InfoContainer>
        <HiddenInput
          type="file"
          ref={fileInputRef1}
          accept="image/*"
          onChange={handleImageChange1}
        />
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
    </Container>
  );
};

export default WriteBoard;
