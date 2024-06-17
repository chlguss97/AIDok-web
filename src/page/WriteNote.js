import React from 'react';
import styled from 'styled-components';
import book from '../assets/book.png';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import SaveBtn from '../components/SaveBtn';
import BackBtn from '../components/BackBtn';



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
  position: relative; /* 자식 요소의 절대 위치를 설정하기 위해 필요 */
`;


const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Content = styled.div`
  width: 85%;
  max-width: 400px;
  border: 2px solid #6F4E37;
  border-radius: 10px;
  padding: 20px;
  background-color: #FFFAED;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  height: calc(100vh - 350px); /* Header와 여백을 고려하여 높이 조정 */
  margin-bottom: 20px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  color: #5F5C5C;
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

const ActionButton = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
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
  width: 92%;
  height: 60%;
  margin-top: 20px;
  border: 1px solid #6F4E37;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  background: none;
  &:focus { outline:2px solid #5E7E71; }
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





const WriteNote = () => {
  return (
    <Container>
      <BackBtn></BackBtn>
      <Header>
        <BookInfo>
          <BookImage src={book} alt="Book Cover" />
          <BookTitle>트렌드 코리아 2023</BookTitle>
          <BookAuthors>김난도, 전지현, 박혜수, 최지혜</BookAuthors>
        </BookInfo>
      </Header>
      <Content>
        <ActionButton>
          <Icon src={icon1} alt="Underline Icon" />
          사진 & 하이라이트
        </ActionButton>
        <ActionButton>
          <Icon src={icon2} alt="Underline Icon" />
          AI로 텍스트 추출
        </ActionButton>
        <NoteInput placeholder="노트에 저장할 내용을 작성하세요" />
      </Content>
      <SaveBtn name={"저장하기"} />
    </Container>
  );
};

export default WriteNote;