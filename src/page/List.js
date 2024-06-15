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
  padding-top: 8%;
  padding-left: 8%;
  padding-right: 8%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* Allows positioning of the back button */
  margin-bottom: 20px;
  
`;

const BackButtonWrapper = styled.div`
  position: absolute;
  left: 10px;
`;

const Title = styled.p`
  color: #6F4E37;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 1px 0 white, -1px 0 white, 0 1px white, 0 -1px white;
  margin: 0; /* Removes default margin */
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 10%;
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

const List = () => {
  return (
    <Container>
      <Header>
        <BackButtonWrapper>
          <BackBtn />
        </BackButtonWrapper>
        <Title>책 검색</Title>
      </Header>
      <SearchBarWrapper>
        <SearchBar placeholder={'책 검색'} />
      </SearchBarWrapper>
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
