import React from 'react';
import styled from 'styled-components';
import BackBtn from '../components/BackBtn';
import SearchBar from '../components/SearchBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 100vh;
  font-family: Arial, sans-serif;
  overflow: hidden; /* Prevents body scroll */
  padding-top:8%;
  
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10%;
  position: relative; /* Allows positioning of the back button */
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-items: center;
  padding-bottom: 35%;
  padding-left: 5%;
  padding-right: 5%;
  overflow-y: auto;
  height: calc(100vh - 120px); /* Adjust height based on header size */
  box-sizing: border-box; /* Include padding in height calculation */
  
`;

const BookCard = styled.div`
  width: 100%;
  max-width: 150px;
  border: 1px solid #8B4513;
  border-radius: 10px;
  padding: 7px;
  background-color: #FFFAED;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BookImage = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 10px;
`;

const BookTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #5F5C5C;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const List = () => {
  return (
    <Container>
      <BackBtn></BackBtn>
      <Header>
        <SearchBar placeholder={'책 검색'}></SearchBar>
      </Header>
      <Content>
        {Array.from({ length: 20 }, (_, index) => (
          <BookCard key={index}>
            <BookImage src="https://via.placeholder.com/150" alt={`트렌드 코리아 ${2024 - index}`} />
            <BookTitle>트렌드 코리아 {2024 - index}</BookTitle>
          </BookCard>
        ))}
      </Content>
    </Container>
  );
};

export default List;