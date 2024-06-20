import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import searchIcon from "../assets/searchicon.png";
import backicon from "../assets/backicon.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 100vh;
  font-family: Arial, sans-serif;
  overflow: hidden;
  padding-top: 8%;
  padding-left: 8%;
  padding-right: 8%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;

  .backImg {
    width: 20px;
    height: 20px;
    margin-left: 20px;
    cursor: pointer;
  }
`;

const Title = styled.p`
  color: #6f4e37;
  font-size: 1.6rem;
  font-weight: bold;
  justify-content: center;
  text-align: center;
  display: inline-block;
  flex: 1;
`;

const SearchBarContainer = styled.div`
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
  height: calc(100vh - 120px);
  box-sizing: border-box;
`;

const BookCard = styled.div`
  width: 100%;
  max-width: 150px;
  border: 1px solid #8b4513;
  border-radius: 10px;
  padding: 7px;
  background-color: #fffaed;
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
  color: #5f5c5c;
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
  padding-left: 30px;
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

<<<<<<< HEAD
=======
// 알라딘 ttb api 키: ttbbaechu100402002
//배유리 정보나루(학원 id:ddokddok pw:actbae88^^  집 id:ddokddok2 pw:actbae88^^)
//정보나루 서비스키:(배유리학원) c3a39d682934e71b3876a8ef03f04a3504b289273cd616beef7ef385b7733334
//https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbbaechu100402002&Query=%EA%B0%90%EC%9E%90
// (네이버) clientId: q0Llra2n2oQB3OC27M5l , clientSecret: XOzSKgv1ip

>>>>>>> 0db744d67f34b4cb66eba9a6b9929a226759d3b3
const List = () => {
  const location = useLocation();
  const [query, setQuery] = useState("리액트");
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setQuery(location.state.query);
      const url = `./backend/naver_search.php?query=${encodeURIComponent(location.state.query)}`;
      fetch(url)
<<<<<<< HEAD
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
          }
          return res.text();
        })
        .then((text) => {
          console.log(text);  // 데이터를 확인하기 위해 추가
          const jsonData = JSON.parse(text); // JSON 문자열을 객체로 변환
          setBooks(jsonData.items);
        })
=======
        .then((res) => res.json())
        .then((jsonData) => 
          setBooks(jsonData.items),
          
        )
>>>>>>> 0db744d67f34b4cb66eba9a6b9929a226759d3b3
        .catch((e) => alert(e.message));
    }
  }, [location.state]);

  const inputImgClick = () => {
    if (searchTerm) {
      const url = `./backend/naver_search.php?query=${encodeURIComponent(searchTerm)}`;
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
          }
          return res.json();
        })
        .then((jsonData) => setBooks(jsonData.items))
        .catch((e) => alert(e.message));
    }
  };

<<<<<<< HEAD
  const bookCardClick = (book) => {
    navigate('/BookDetail', { state: { book: book } });
    console.log(`보내는 북: ${book.title}`);
  };
=======
  const bookCardClick=(book) =>{
    const book2 = {
      bookName:book.title,
      bookImageUrl:book.image,
      authors:book.author,
      isbn13:book.isbn,
      description:book.description
    }
    navigate('/BookDetail', {state: {book:book2}} )
    console.log(`보내는 북: ${book.title}`)
  }
>>>>>>> 0db744d67f34b4cb66eba9a6b9929a226759d3b3

  const backButtonClick = () => {
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <img src={backicon} alt="뒤로가기버튼" className="backImg" onClick={backButtonClick} />
        <Title>책 검색</Title>
      </Header>
      <SearchBarContainer>
        <SearchInputWrapper>
          <SearchInput
            placeholder={`검색하신 단어: ${query}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton onClick={inputImgClick}>
            <Icon src={searchIcon} alt="Search Icon" />
          </SearchButton>
        </SearchInputWrapper>
      </SearchBarContainer>

      <Content>
        {books?.map((book, index) => (
          <BookCard key={index} onClick={() => bookCardClick(book)}>
            <BookImage src={book.image} alt="책" />
            <BookTitle>{book.title}</BookTitle>
          </BookCard>
        ))}
      </Content>
    </Container>
  );
};

export default List;
