import React from 'react';
import styled from 'styled-components';
import BackBtn from '../components/BackBtn';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 100vh;
  font-family: Arial, sans-serif;
  overflow: hidden;
  padding: 5%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Title = styled.div`
  flex: 1;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #5F5C5C;
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  padding: 20px 0;
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
`;

const BookInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BookImage = styled.img`
  width: 120px;
  height: auto;
  margin-right: 20px;
`;

const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: #5F5C5C;
`;

const BookTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BookAuthors = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const BookDescription = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #6F4E37;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  align-self: flex-start;
  margin-bottom: 20px;
  font-weight: bold;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0 10px 0;
  color: #5F5C5C;
`;

const BookGrid = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 20px;
`;

const GridBookCard = styled.div`
  flex: 0 0 auto;
  margin-right: 10px;
  width: 100px;
  background-color: #FFFAED;
  border: 1px solid #8B4513;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const GridBookImage = styled.img`
  width: 80px;
  height: auto;
  margin-bottom: 10px;
`;

const GridBookTitle = styled.div`
  font-size: 12px;
  color: #5F5C5C;
  font-weight: bold;
`;

const BookDetail = () => {
  return (
    <Container>
      <BackBtn></BackBtn>
      <Header>
        <Title>트렌드 코리아 2023</Title>
      </Header>
      <ContentWrapper>
        <Content>
          <BookInfo>
            <BookImage src="https://via.placeholder.com/150" alt="트렌드 코리아 2023" />
            <BookDetails>
              <BookTitle>트렌드 코리아 2023</BookTitle>
              <BookAuthors>저자: 김난도, 전지현, 최지혜, 이수진</BookAuthors>
              <Button>읽고 싶은 책</Button>
            </BookDetails>
          </BookInfo>
          <BookDescription>
            세계적인 종합, 판독과 분석, 그리고 전망. 수십 년간 이어져 온 평화와 풍요의 시대는 막을 내리고, 엄청난 위기감 속에서 사람들은 다가올 ...
          </BookDescription>
          <Button>상세 추가/편집</Button>
          <SectionTitle>함께 대출된 도서</SectionTitle>
          <BookGrid>
            <GridBookCard>
              <GridBookImage src="https://via.placeholder.com/150" alt="Book 1" />
              <GridBookTitle>트렌드 코리아 2024</GridBookTitle>
            </GridBookCard>
            <GridBookCard>
              <GridBookImage src="https://via.placeholder.com/150" alt="Book 2" />
              <GridBookTitle>ONE</GridBookTitle>
            </GridBookCard>
            <GridBookCard>
              <GridBookImage src="https://via.placeholder.com/150" alt="Book 3" />
              <GridBookTitle>Another Book</GridBookTitle>
            </GridBookCard>
          </BookGrid>
          <SectionTitle>마니아를 위한 추천 도서</SectionTitle>
          <BookGrid>
            <GridBookCard>
              <GridBookImage src="https://via.placeholder.com/150" alt="Book 1" />
              <GridBookTitle>트렌드 코리아 2024</GridBookTitle>
            </GridBookCard>
            <GridBookCard>
              <GridBookImage src="https://via.placeholder.com/150" alt="Book 2" />
              <GridBookTitle>ONE</GridBookTitle>
            </GridBookCard>
            <GridBookCard>
              <GridBookImage src="https://via.placeholder.com/150" alt="Book 3" />
              <GridBookTitle>Another Book</GridBookTitle>
            </GridBookCard>
          </BookGrid>
          <SectionTitle>다독자를 위한 추천 도서</SectionTitle>
          <BookGrid>
            <GridBookCard>
              <GridBookImage src="https://via.placeholder.com/150" alt="Book 1" />
              <GridBookTitle>트렌드 코리아 2024</GridBookTitle>
            </GridBookCard>
            <GridBookCard>
              <GridBookImage src="https://via.placeholder.com/150" alt="Book 2" />
              <GridBookTitle>ONE</GridBookTitle>
            </GridBookCard>
            <GridBookCard>
              <GridBookImage src="https://via.placeholder.com/150" alt="Book 3" />
              <GridBookTitle>Another Book</GridBookTitle>
            </GridBookCard>
          </BookGrid>
        </Content>
      </ContentWrapper>
    </Container>
  );
};

export default BookDetail;