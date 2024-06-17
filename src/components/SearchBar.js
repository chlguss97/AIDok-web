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
  width: 100%;
  max-width: 240px; /* 최대 너비를 240px로 제한 */
  margin: 0 auto; /* 중앙 정렬 */

  &:focus-within {
    background-color: #5E7E71; /* 초록색으로 변경 */
  }
`;
const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  border: none;
  font-size: 16px;
  outline: none;
  width: 100%;
  padding-left: 30px; /* 이미지 공간 확보 */
  background: none;
  color: white;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 86%;
  top: 50%;
  transform: translateY(-50%);
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;
`;


const SearchBar = ({ searchTerm, setSearchTerm, onClick,placeholder }) => {
  return (
    <SearchBarContainer>
    <SearchInputWrapper>
      <SearchInput 
        placeholder={placeholder} 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <SearchButton onClick={onClick}>
        <Icon src={searchicon} alt='Search Icon' />
      </SearchButton>
    </SearchInputWrapper>
  </SearchBarContainer>
  
  )
};

export default SearchBar;