import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BackBtn from "../components/BackBtn";
import { useLocation } from "react-router-dom";
import searchIcon from "../assets/searchicon.png";


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
  color: #6f4e37;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
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

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #5e7e71;
  border-radius: 20px;
  padding: 10px 10px;
  background-color: #6f4e37;
  width: 100%;
  max-width: 240px; /* 최대 너비를 240px로 제한 */
  margin: 0 auto 30px auto;

  &:focus-within {
    background-color: #5e7e71; /* 초록색으로 변경 */
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

// 알라딘 ttb api 키: ttbbaechu100402002
//정보나루 서비스키: c3a39d682934e71b3876a8ef03f04a3504b289273cd616beef7ef385b7733334
//https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbbaechu100402002&Query=%EA%B0%90%EC%9E%90
// (네이버) clientId: q0Llra2n2oQB3OC27M5l , clientSecret: XOzSKgv1ip


const List = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("query");
  const [query, setQuery] = useState(null); //받아온 쿼리
  const [searchTerm, setSearchTerm] = useState("")



  useEffect(() => {
    setQuery(q)
   
    if (query) {
      
      const url = `./backend/naver_search.php?query=${query}`;
      fetch(url)
        .then((res) => res.text())
        .then(str => new DOMParser().parseFromString(str, 'text/xml'))
        .then(json=> {
          setBooks(json.item)
          console.log(books)
    })
        .catch((e) => {
          console.error("에러:", e.message);
          alert("데이터를 불러오는 중 오류가 발생했습니다.");
        });
    }
  }, [query]);

  


  const inputImgClick = () => {
    alert(searchTerm);
  };

  return (
    <Container>
      <Header>
        <BackButtonWrapper>
          <BackBtn />
        </BackButtonWrapper>
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

      {/* <SearchBarWrapper>
        <SearchBar placeholder={`검색: ${searchTerm}`} />
      </SearchBarWrapper> */}
      <Content>
        {Array.from({ length: 20 }, (_, index) => (
          <BookCard key={index}>
            <BookImage
              src="https://via.placeholder.com/150"
              alt={`트렌드 코리아 ${2024 - index}`}
            />
            <BookTitle>트렌드 코리아 {2024 - index}</BookTitle>
          </BookCard>
        ))}
      </Content>
    </Container>
  );
};

export default List;



export function xmlToJson(xml) {
  // Create the return object
  var obj = {};
  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  }
  // do children
  // If all text nodes inside, get concatenated text from them.
  var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
    return node.nodeType === 3;
  });
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
      return text + node.nodeValue;
    }, "");
  } else if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}
