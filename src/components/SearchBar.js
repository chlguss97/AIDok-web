import React from 'react';
import styled from 'styled-components';
import searchicon from '../assets/searchicon.png';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #5E7E71;
  border-radius: 20px;
  padding: 10px 10px;
  background-color: #6F4E37;
  width: 80%;
  max-width: 240px; /* 최대 너비를 240px로 제한 */
  margin: 0 auto; /* 중앙 정렬 */

  &:focus-within {
    background-color: #5E7E71; /* 초록색으로 변경 */
  }
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

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const SearchBar = ({ searchTerm, setSearchTerm, onClick }) => {
  return (
    <SearchBarContainer>
      <SearchInput 
        placeholder="노트 검색" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <SearchButton onClick={onClick}>
        <Icon src={searchicon} />
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;