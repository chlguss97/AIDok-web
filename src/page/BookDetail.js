import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BackBtn from "../components/BackBtn";
import Toolbar from "../components/Toolbar";
import { useLocation, useNavigate } from "react-router-dom";
import backicon from "../assets/backicon.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 100%;
  font-family: Arial, sans-serif;
  overflow: hidden;
  padding-top: 8%;
  padding-bottom: 20%;
  padding-left: 10%;
  padding-right: 10%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  /* position: relative; */

  .backImg {
    width: 20px;
    height: 20px;
    margin-left: 20px;
    cursor: pointer;
  }
`;

const BackButton = styled.button`
  /* position: absolute; */
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
  color: #6f4e37;
  margin-left: 30px;
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
  color: #5f5c5c;
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
  background-color: #6f4e37;
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
  color: #5f5c5c;
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
  background-color: #fffaed;
  border: 1px solid #8b4513;
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
  color: #5f5c5c;
  font-weight: bold;
`;

const BackButtonWrapper = styled.div`
  position: absolute;
  left: 10%;
`;

const BookDetail = () => {
  //정보나루 서비스키: c3a39d682934e71b3876a8ef03f04a3504b289273cd616beef7ef385b7733334
  const jbNaruServiceKey =
    "c3a39d682934e71b3876a8ef03f04a3504b289273cd616beef7ef385b7733334";
  const location = useLocation();
  const [bookItem, setBookItem] = useState({}); //useLoacation으로 받아온 book객체
  const navigate = useNavigate();
  const [coLoanBooks, setCoLoanBooks] = useState([]);
  const [maniaRecBooks, setManiaRecBooks] = useState([]);
  const [readerRecBooks, setReaderRecBooks] = useState([]);
  const [coImgUrls, setCoImgUrls] = useState([]);
  const [maniaImgUrls, setManiaImgUrls] = useState([]);
  const [readerImgUrls, setReaderImgUrls] = useState([]);

  useEffect(() => {
    if (location.state.book) {
      setBookItem(location.state.book);
      const url = `https://data4library.kr/api/usageAnalysisList?authKey=${jbNaruServiceKey}&isbn13=${location.state.book.isbn}`;
      fetch(url)
        .then((res) => res.text()) //정보나루api는 xml줘용
        .then((xmlText) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, "text/xml");
          if (!xmlDoc) {
            console.error("Failed to parse XML data");
            return;
          }
          //===================함께 대출된 도서
          const coLoanBooks = xmlDoc.getElementsByTagName("coLoanBooks")[0];
          if (!coLoanBooks) {
            console.error("coLoanBooks element not found in XML");
            return;
          }
          const coBooks = coLoanBooks.getElementsByTagName("book");
          const coBooksData = [];
          const imgPromises = [];
          for (let book of coBooks) {
            const bookNameElement = book.getElementsByTagName("bookname")[0];
            const isbnElement = book.getElementsByTagName("isbn13")[0];
            if (bookNameElement && isbnElement) {
              const bookName = bookNameElement.textContent
                .trim()
                .replace("<![CDATA[", "")
                .replace("]]>", "");
              const isbn13 = isbnElement.textContent
                .trim()
                .replace("<![CDATA[", "")
                .replace("]]>", "");
              coBooksData.push({ bookName, isbn13 });

              //bookName에서 이미지안줘서..정보나루 도서상세조회로 isbn보내서  api다시받기..
              const imgPromises2 = [];
              const imgPromise = fetch(
                `http://data4library.kr/api/srchDtlList?authKey=${jbNaruServiceKey}&isbn13=${isbn13}`
              )
                .then((res) => res.text())
                .then((xmlText) => {
                  const parser = new DOMParser();
                  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
                  if (!xmlDoc) {
                    console.error("Failed to parse XML data");
                    return null;
                  }
                  const bookElement = xmlDoc.getElementsByTagName("book")[0];
                  const imgUrlElement =bookElement.getElementsByTagName("bookImageURL")[0];
                  if (imgUrlElement) {
                    const urlText = imgUrlElement.textContent
                      .trim()
                      .replace("<![CDATA[", "")
                      .replace("]]>", "");
                    return urlText
                  }
                  return null;
                });
                imgPromises2.push(imgPromise)
            }
          }
          Promise.all(imgPromises).then((urls)=>{
            setManiaImgUrls(urls.filter((url)=> url !==null))
          })

          setCoLoanBooks(coBooksData)

          //===========================마니아를위한 추천도서
          const maniaRecBooks = xmlDoc.getElementsByTagName("maniaRecBooks")[0];
          if (!maniaRecBooks) {
            console.error("maniaRecBooks element 엑스엠엘에서찾을수없어요");
            return;
          }
          const maBooks = maniaRecBooks.getElementsByTagName("book");
          const maBooksData = [];
          for (let book of maBooks) {
            const bookNameElement = book.getElementsByTagName("bookname")[0];
            const isbnElement = book.getElementsByTagName("isbn13")[0];
            if (bookNameElement && isbnElement) {
              const bookName = bookNameElement.textContent
                .trim()
                .replace("<![CDATA[", "")
                .replace("]]>", "");
              const isbn13 = isbnElement.textContent
                .trim()
                .replace("<![CDATA[", "")
                .replace("]]>", "");
              maBooksData.push({ bookName, isbn13 });


              //bookName에서 이미지안줘서..정보나루 도서상세조회로 isbn보내서  api다시받기..
              const imgPromise = fetch(
                `http://data4library.kr/api/srchDtlList?authKey=${jbNaruServiceKey}&isbn13=${isbn13}`
              )
                .then((res) => res.text())
                .then((xmlText) => {
                  const parser = new DOMParser();
                  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
                  if (!xmlDoc) {
                    console.error("Failed to parse XML data");
                    return null;
                  }
                  const bookElement = xmlDoc.getElementsByTagName("book")[0];
                  const imgUrlElement =bookElement.getElementsByTagName("bookImageURL")[0];
                  if (imgUrlElement) {
                    const urlText = imgUrlElement.textContent
                      .trim()
                      .replace("<![CDATA[", "")
                      .replace("]]>", "");
                    return urlText
                  }
                  return null;
                });
                imgPromises.push(imgPromise)
            }
          }
          Promise.all(imgPromises).then((urls)=>{
            setCoImgUrls(urls.filter((url)=> url !==null))
          })

      



          setManiaRecBooks(maBooksData);

          //==========================다독자를 위한 추천도서
          const readerRecBooks =
            xmlDoc.getElementsByTagName("readerRecBooks")[0];
          if (!readerRecBooks) {
            console.error("readerRecBooks element 엑스엠엘에서찾을수없어요");
            return;
          }
          const reBooks = readerRecBooks.getElementsByTagName("book");
          const reBooksData = [];
          for (let book of reBooks) {
            const bookNameElement = book.getElementsByTagName("bookname")[0];
            const isbnElement = book.getElementsByTagName("isbn13")[0];
            if (bookNameElement && isbnElement) {
              const bookName = bookNameElement.textContent
                .trim()
                .replace("<![CDATA[", "")
                .replace("]]>", "");
              const isbn13 = isbnElement.textContent
                .trim()
                .replace("<![CDATA[", "")
                .replace("]]>", "");
              reBooksData.push({ bookName, isbn13 });
              //bookName에서 이미지안줘서..정보나루 도서상세조회로 isbn보내서  api다시받기..
            }
          }
          console.log("reBooks Data:", reBooksData);
          setReaderRecBooks(reBooksData);
        })
        .catch((e) => alert(`에러: ${e.message}`));
    }
  }, [location.state.book, coLoanBooks, maniaRecBooks, readerRecBooks, coImgUrls]);

  const clickBackButton = () => {
    navigate("/List");
  };

  return (
    <Container>
      <Header>
        {/* <BackButtonWrapper><BackBtn ></BackBtn></BackButtonWrapper> */}
        <img
          src={backicon}
          alt="백아이콘"
          className="backImg"
          onClick={clickBackButton}
        ></img>
        <Title>{bookItem.title}</Title>
      </Header>
      <ContentWrapper>
        <Content>
          <BookInfo>
            <BookImage src={bookItem.image} alt="트렌드 코리아 2023" />
            <BookDetails>
              <BookTitle>{bookItem.title}</BookTitle>
              <BookAuthors>{bookItem.author}</BookAuthors>
              <Button>읽고 싶은 책</Button>
            </BookDetails>
          </BookInfo>
          <BookDescription>책 요약 : {bookItem.description}</BookDescription>
          <Button>상세 추가/편집</Button>


          <SectionTitle>함께 대출된 도서</SectionTitle>
          <BookGrid>
            {coLoanBooks.map((book, index) => (
              <GridBookCard key={index}>
                <GridBookImage
                  src={coImgUrls[index]}
                  alt="Book 1"
                />
                <GridBookTitle>{book.bookName}</GridBookTitle>
              </GridBookCard>
            ))}
          </BookGrid>



          <SectionTitle>마니아를 위한 추천 도서</SectionTitle>
          <BookGrid>
            {maniaRecBooks.map((book, index) => (
              <GridBookCard key={index}>
                <GridBookImage
                  src={maniaImgUrls[index]}
                  alt="Book 1"
                />
                <GridBookTitle>{book.bookName}</GridBookTitle>
              </GridBookCard>
            ))}
          </BookGrid>


          <SectionTitle>다독자를 위한 추천 도서</SectionTitle>
          <BookGrid>
            {readerRecBooks.map((book, index) => (
              <GridBookCard key={index}>
                <GridBookImage
                  src="https://via.placeholder.com/150"
                  alt="Book 1"
                />
                <GridBookTitle>{book.bookName}</GridBookTitle>
              </GridBookCard>
            ))}
          </BookGrid>
        </Content>
      </ContentWrapper>
    </Container>
  );
};

export default BookDetail;

// XML 데이터를 JSON으로 변환하는 함수
export function xmlToJson2(xmlStr) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlStr, "application/xml");

  // CDATA 섹션을 처리하여 텍스트로 변경하는 함수
  function parseCData(node) {
    if (node && node.nodeType === Node.CDATA_SECTION_NODE) {
      return node.textContent.trim();
    }
    return (node && node.textContent) || "";
  }

  // XML 노드를 JSON 객체로 변환하는 재귀적 함수
  function nodeToJson(node) {
    const obj = {};

    // 자식 노드들을 순회하면서 처리
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      if (child.nodeType === Node.ELEMENT_NODE) {
        const nodeName = child.nodeName;
        const textContent = parseCData(child.firstChild);
        obj[nodeName] = textContent || nodeToJson(child); // 재귀 호출
      }
    }

    return obj;
  }

  // 최상위 루트 노드에서 시작하여 JSON 객체로 변환
  const root = xmlDoc.documentElement;
  return nodeToJson(root);
}

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
  var textNodes = [].slice.call(xml.childNodes).filter(function (node) {
    return node.nodeType === 3;
  });
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
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
