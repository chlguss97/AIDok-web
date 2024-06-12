import React from 'react';
import styled from 'styled-components';
import searchicon from '../assets/searchicon.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 100vh;
  font-family: Arial, sans-serif;
  overflow: hidden; /* Prevents body scroll */
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative; /* Allows positioning of the back button */
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-left: 16px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #5E7E71;
  border-radius: 20px;
  padding: 10px 10px;
  background-color: #6F4E37;
  width: 60%;

  &:focus-within {
    background-color: #5E7E71; /* 초록색으로 변경 */}
`;

const SearchInput = styled.input`
  border: none;
  font-size: 16px;
  outline: none;
  flex: 1;
  background: none;
  color: white;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #8B4513;
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-items: center;
  padding: 20px;
  overflow-y: auto;
  height: calc(100vh - 120px); /* Adjust height based on header size */
  box-sizing: border-box; /* Include padding in height calculation */
`;

const BookCard = styled.div`
  width: 100%;
  max-width: 150px;
  border: 1px solid #8B4513;
  border-radius: 10px;
  padding: 10px;
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
      <Header>
        <BackButton>←</BackButton>
        <SearchBar>
          <SearchInput type="text" placeholder="  책 검색" />
          <SearchButton><Icon src={searchicon} /></SearchButton>
        </SearchBar>
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