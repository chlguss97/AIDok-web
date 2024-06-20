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

  
  const YULYjbNaruServiceKey = //유리 정보나루 아이디:ddokddok  비번:actbae88^^. 학원ip주소
    "a6e0e7411107bcf35da8623fb02f13a7b559dd455855d5a44baae620c142d4b8";
  const DEAHANjbNaruServiceKey = " ";
  const HYUNWOLjbNaruServiceKey = " ";
  const TEAMJANGjbNaruServiceKey = " ";
  const location = useLocation();
  const [bookItem, setBookItem] = useState({}); //useLoacation으로 받아온 book객체
  const navigate = useNavigate();
  // const [coLoanBooks, setCoLoanBooks] = useState([]);
  // const [maniaRecBooks, setManiaRecBooks] = useState([]);
  // const [readerRecBooks, setReaderRecBooks] = useState([]);
  const [coDetailBooks, setCoDetailBooks] = useState([]);
  const [maniaDetailBooks, setManiaDetailBooks] = useState([]);
  const [readerDetailBooks, setReaderDetailBooks] = useState([]);
  const [shortenedDescription, setShortenedDescription] = useState(""); //책 요약 글자 수 너무많을까봐 줄이깅.. 100글자까지만 나오도록...



  useEffect(() => {
    // List에서넘어온 book객체의 변수 : 
    //bookName,title,bookImageUrl,image,authors,isbn13, description

    if (location.state.book) {
      // setBookItem(location.state.book);
      setBookItem({ ...location.state.book });

      const url = `https://data4library.kr/api/usageAnalysisList?authKey=${YULYjbNaruServiceKey}&isbn13=${location.state.book.isbn13}`;
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
          const coPromises = [];

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

              // 이미지안줘서..정보나루 도서상세조회로 isbn보내서  api다시받기..
              const coPromise = fetch(
                `http://data4library.kr/api/srchDtlList?authKey=${YULYjbNaruServiceKey}&isbn13=${isbn13}`
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
                  const bookData = {
                    bookName: bookElement
                      .getElementsByTagName("bookname")[0]
                      .textContent.trim(),
                    authors: bookElement
                      .getElementsByTagName("authors")[0]
                      .textContent.trim(),
                    description: bookElement
                      .getElementsByTagName("description")[0]
                      .textContent.trim(),
                    bookImageUrl: bookElement
                      .getElementsByTagName("bookImageURL")[0]
                      .textContent.trim(),
                    isbn13: bookElement
                      .getElementsByTagName("isbn13")[0]
                      .textContent.trim(),
                  };
                  return bookData;
                });
              coPromises.push(coPromise);
            }
          }
          Promise.all(coPromises).then((books) => {
            setCoDetailBooks(books.filter((book) => book !== null));
          });

          // setCoLoanBooks(coBooksData);

          //===========================마니아를위한 추천도서
          const maniaRecBooks = xmlDoc.getElementsByTagName("maniaRecBooks")[0];
          if (!maniaRecBooks) {
            console.error("maniaRecBooks element 엑스엠엘에서찾을수없어요");
            return;
          }
          const maBooks = maniaRecBooks.getElementsByTagName("book");
          const maniaPromises = [];
          // const maBooksData = [];
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
              // maBooksData.push({ bookName, isbn13 });

              //bookName에서 이미지안줘서..정보나루 도서상세조회로 isbn보내서  api다시받기..
              const maniaPromise = fetch(
                `http://data4library.kr/api/srchDtlList?authKey=${YULYjbNaruServiceKey}&isbn13=${isbn13}`
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
                  const bookData = {
                    bookName: bookElement
                      .getElementsByTagName("bookname")[0]
                      .textContent.trim(),
                    authors: bookElement
                      .getElementsByTagName("authors")[0]
                      .textContent.trim(),
                    description: bookElement
                      .getElementsByTagName("description")[0]
                      .textContent.trim(),
                    bookImageUrl: bookElement
                      .getElementsByTagName("bookImageURL")[0]
                      .textContent.trim(),
                    isbn13: bookElement
                      .getElementsByTagName("isbn13")[0]
                      .textContent.trim(),
                  };
                  return bookData;
                });
              maniaPromises.push(maniaPromise);
            }
          }
          Promise.all(maniaPromises).then((books) => {
            setManiaDetailBooks(books.filter((book) => book !== null));
          });

          // setManiaRecBooks(maBooksData);

          //==========================다독자를 위한 추천도서
          const readerRecBooks =
            xmlDoc.getElementsByTagName("readerRecBooks")[0];
          if (!readerRecBooks) {
            console.error("readerRecBooks element 엑스엠엘에서찾을수없어요");
            return;
          }
          const reBooks = readerRecBooks.getElementsByTagName("book");
          // const reBooksData = [];
          const readerPromises = [];
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
              // reBooksData.push({ bookName, isbn13 });

              //bookName에서 이미지안줘서..정보나루 도서상세조회로 isbn보내서  api다시받기..
              const readerPromise = fetch(
                `http://data4library.kr/api/srchDtlList?authKey=${YULYjbNaruServiceKey}&isbn13=${isbn13}`
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
                  const bookData = {
                    bookName: bookElement
                      .getElementsByTagName("bookname")[0]
                      .textContent.trim(),
                    authors: bookElement
                      .getElementsByTagName("authors")[0]
                      .textContent.trim(),
                    description: bookElement
                      .getElementsByTagName("description")[0]
                      .textContent.trim(),
                    bookImageUrl: bookElement
                      .getElementsByTagName("bookImageURL")[0]
                      .textContent.trim(),
                    isbn13: bookElement
                      .getElementsByTagName("isbn13")[0]
                      .textContent.trim(),
                  };
                  return bookData;
                });
              readerPromises.push(readerPromise);
            }
          }
          Promise.all(readerPromises).then((books) => {
            setReaderDetailBooks(books.filter((book) => book !== null));
          });

          // setReaderRecBooks(reBooksData);
        })
        .catch((e) => alert(`에러: ${e.message}`));
    }
  }, [location.state.book]);


  useEffect(()=>{
    // 요약된 디스크립션 생성
    if (bookItem?.description?.length > 1) {
      bookItem?.description.replace(/&lt;/g, "<").replace(/gt;/g, ">")
      setShortenedDescription(bookItem.description.substring(0, 180) + "... ...");
  } else {
      setShortenedDescription(bookItem.description);
  }
  },[bookItem.description])

  const clickBackButton = () => {
    navigate("/List");
  };




  //책 클릭했을때 다시 불러오기....
  //-------bookClick함수--------
  const bookClick = (book) => {
    
    setBookItem({...book});

    const url = `https://data4library.kr/api/usageAnalysisList?authKey=${YULYjbNaruServiceKey}&isbn13=${book.isbn13}`;
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
        // const coBooksData = [];
        const coPromises = [];

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
            // coBooksData.push({ bookName, isbn13 });

            // 이미지안줘서..정보나루 도서상세조회로 isbn보내서  api다시받기..
            const coPromise = fetch(
              `http://data4library.kr/api/srchDtlList?authKey=${YULYjbNaruServiceKey}&isbn13=${isbn13}`
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
                const bookData = {
                  bookName: bookElement
                    .getElementsByTagName("bookname")[0]
                    .textContent.trim(),
                  authors: bookElement
                    .getElementsByTagName("authors")[0]
                    .textContent.trim(),
                  description: bookElement
                    .getElementsByTagName("description")[0]
                    .textContent.trim(),
                  bookImageUrl: bookElement
                    .getElementsByTagName("bookImageURL")[0]
                    .textContent.trim(),
                  isbn13: bookElement
                    .getElementsByTagName("isbn13")[0]
                    .textContent.trim(),
                };
                return bookData;
              });
            coPromises.push(coPromise);
          }
        }
        Promise.all(coPromises).then((books) => {
          setCoDetailBooks(books.filter((book) => book !== null));
        });

        // setCoLoanBooks(coBooksData);

        //===========================마니아를위한 추천도서
        const maniaRecBooks = xmlDoc.getElementsByTagName("maniaRecBooks")[0];
        if (!maniaRecBooks) {
          console.error("maniaRecBooks element 엑스엠엘에서찾을수없어요");
          return;
        }
        const maBooks = maniaRecBooks.getElementsByTagName("book");
        const maniaPromises = [];
        // const maBooksData = [];
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
            // maBooksData.push({ bookName, isbn13 });

            //bookName에서 이미지안줘서..정보나루 도서상세조회로 isbn보내서  api다시받기..
            const maniaPromise = fetch(
              `http://data4library.kr/api/srchDtlList?authKey=${YULYjbNaruServiceKey}&isbn13=${isbn13}`
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
                const bookData = {
                  bookName: bookElement
                    .getElementsByTagName("bookname")[0]
                    .textContent.trim(),
                  authors: bookElement
                    .getElementsByTagName("authors")[0]
                    .textContent.trim(),
                  description: bookElement
                    .getElementsByTagName("description")[0]
                    .textContent.trim(),
                  bookImageUrl: bookElement
                    .getElementsByTagName("bookImageURL")[0]
                    .textContent.trim(),
                  isbn13: bookElement
                    .getElementsByTagName("isbn13")[0]
                    .textContent.trim(),
                };
                return bookData;
              });
            maniaPromises.push(maniaPromise);
          }
        }
        Promise.all(maniaPromises).then((books) => {
          setManiaDetailBooks(books.filter((book) => book !== null));
        });

        // setManiaRecBooks(maBooksData);

        //==========================다독자를 위한 추천도서
        const readerRecBooks =
          xmlDoc.getElementsByTagName("readerRecBooks")[0];
        if (!readerRecBooks) {
          console.error("readerRecBooks element 엑스엠엘에서찾을수없어요");
          return;
        }
        const reBooks = readerRecBooks.getElementsByTagName("book");
        // const reBooksData = [];
        const readerPromises = [];
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
            // reBooksData.push({ bookName, isbn13 });

            //bookName에서 이미지안줘서..정보나루 도서상세조회로 isbn보내서  api다시받기..
            const readerPromise = fetch(
              `http://data4library.kr/api/srchDtlList?authKey=${YULYjbNaruServiceKey}&isbn13=${isbn13}`
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
                const bookData = {
                  bookName: bookElement
                    .getElementsByTagName("bookname")[0]
                    .textContent.trim(),
                  authors: bookElement
                    .getElementsByTagName("authors")[0]
                    .textContent.trim(),
                  description: bookElement
                    .getElementsByTagName("description")[0]
                    .textContent.trim(),
                  bookImageUrl: bookElement
                    .getElementsByTagName("bookImageURL")[0]
                    .textContent.trim(),
                  isbn13: bookElement
                    .getElementsByTagName("isbn13")[0]
                    .textContent.trim(),
                };
                return bookData;
              });
            readerPromises.push(readerPromise);
          }
        }
        Promise.all(readerPromises).then((books) => {
          setReaderDetailBooks(books.filter((book) => book !== null));
        });

        // setReaderRecBooks(reBooksData);
      })
      .catch((e) => alert(`에러: ${e.message}`));


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
        <Title>
          {/* {bookItem.bookName? bookItem.bookName : bookItem.title} */}
          {bookItem.bookName}
        </Title>
      </Header>
      <ContentWrapper>
        <Content>
          <BookInfo>
            <BookImage src={bookItem.bookImageUrl}
              alt="트렌드 코리아 2023" />
            <BookDetails>
              <BookTitle>
              {/* {bookItem.bookName? bookItem.bookName : bookItem.title} */}
              {bookItem.bookName}
                </BookTitle>
              <BookAuthors>
              {/* {bookItem.authors? bookItem.authors : bookItem.author} */}
              {bookItem.authors}
                </BookAuthors>
              <Button>읽고 싶은 책</Button>
            </BookDetails>
          </BookInfo>
          <BookDescription>책 요약 : 
            {shortenedDescription}
            </BookDescription>
          <Button onClick={ ()=>   navigate('/BookEdit', {state: {book:bookItem}} )}>상태 추가/편집</Button>

          <SectionTitle>함께 대출된 도서</SectionTitle>
          <BookGrid>
            {coDetailBooks.map((book, index) => (
              <GridBookCard
                key={index}
                onClick={() =>
                  bookClick(book)
                  //클릭했을때 book.isbn13을 활용해서 유즈이팩트에서 처음 api호출하는거.. 다시 해서 화면을 다시 랜더링해야돼.
                }
              >
                <GridBookImage src={book.bookImageUrl} alt={book.bookName} />
                <GridBookTitle>{book.bookName}</GridBookTitle>
              </GridBookCard>
            ))}
          </BookGrid>

          <SectionTitle>마니아를 위한 추천 도서</SectionTitle>
          <BookGrid>
            {maniaDetailBooks.map((book, index) => (
              <GridBookCard key={index} onClick={() =>
                bookClick(book)
                //클릭했을때 book.isbn13을 활용해서 유즈이팩트에서 처음 api호출하는거.. 다시 해서 화면을 다시 랜더링해야돼.
              }>
                <GridBookImage src={book.bookImageUrl} alt={book.bookName} />
                <GridBookTitle>{book.bookName}</GridBookTitle>
              </GridBookCard>
            ))}
          </BookGrid>

          <SectionTitle>다독자를 위한 추천 도서</SectionTitle>
          <BookGrid>
            {readerDetailBooks.map((book, index) => (
              <GridBookCard key={index} onClick={() =>
                bookClick(book)
                //클릭했을때 book.isbn13을 활용해서 유즈이팩트에서 처음 api호출하는거.. 다시 해서 화면을 다시 랜더링해야돼.
              }>
                <GridBookImage src={book.bookImageUrl} alt={book.bookName} />
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
