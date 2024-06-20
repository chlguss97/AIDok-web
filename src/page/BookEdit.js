import styled from "styled-components";
// import BookStatus from "../components/BookStatus"
import SaveBtn from "../components/SaveBtn";
import { FaRegCalendarAlt } from "react-icons/fa";
import BackBtn from "../components/BackBtn";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import blackBook from "../assets/blankBook.png";
import DatePicker from "react-datepicker";

const BookEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookName = location.state.book.bookName;
  const authors = location.state.book.authors;
  const description = location.state.book.description;
  const [shortenedDescription, setShortenedDescription] = useState("");
  const bookImageUrl = location.state.book.bookImageUrl;
  const isbn13 = location.state.book.isbn13;
  const link = location.state.book.link;
  const [page, setPage] = useState("페이지정보없음");
  const [startYmd, setStartYmd] = useState("1988.04.12");

  const [clickedIndex, setClickedIndex] = useState(3); //기본이 "선택되지 않음"

  const inRef = useRef();

  //<span class="bookBasicInfo_spec__yzTpy">420<!-- -->쪽</span>
  useEffect(() => {
    console.log("링크를 줄까안줄까.:" + link);

    if (link !== undefined) {
      if (link.match(/catalog\/(\d+)/)) {
        const match = link.match(/catalog\/(\d+)/);
        if (match) {
          const query = match[1];
          console.log(query);
          fetch(`./backend/naver_link.php?query=${query}`)
            .then((res) => res.text())
            .then((text) => {
              const dom = new DOMParser();
              const doc = dom.parseFromString(text, "text/html"); //두번째 파라미터 : mimeType
              const es = doc.querySelectorAll(".bookBasicInfo_spec__yzTpy"); // bookBasicInfo_spec__yzTpy라는 클래스 선택자를 이용하여 요소찾기
              console.log("es는무엇인가  " + es);
              es.forEach((element) => {
                const textContent = element.textContent;
                if (textContent.includes("쪽")) {
                  console.log("쪽이 포함된 텍스트:", textContent);
                  const cleanedText = textContent.replace(/쪽/g, "");
                  setPage(cleanedText);
                }
              });
            });
        }
      }
    }
  }, [link]);

  //알라딘 빠이..... https로 인해 알라딘은 못씀..빠이..안녕..
  //   useEffect(() => {
  //     // 요약된 디스크립션 생성
  //     if (description?.length > 1) {
  //       setShortenedDescription(description.substring(0, 100) + "... ...");
  //     } else {
  //       setShortenedDescription(description);
  //     }

  //     console.log(bookName + authors + description + bookImageUrl + isbn13);
  //     const url = `./backend/aladin_search.php?query=${location.state.book.isbn13}`;

  //     fetch(url)
  //       .then((response) => response.text())
  //       .then((xmlText) => {
  //         const domParser = new DOMParser();
  //         const xmlDoc = domParser.parseFromString(xmlText, "text/xml");

  //         if (!xmlDoc) {
  //           console.error("XML 데이터 파싱 실패");
  //           return;
  //         }

  //         // 네임스페이스 URI를 변수로 정의
  //         const namespaceURI = "http://www.aladin.co.kr/ttb/apiguide.aspx";

  //         // 네임스페이스 URI를 사용하여 요소를 선택할 때는 getElementsByTagNameNS를 사용
  //         const itemPageElements = xmlDoc.getElementsByTagNameNS(
  //           namespaceURI,
  //           "itemPage"
  //         );

  //         if (itemPageElements.length > 0) {
  //           // 여기서는 첫 번째 itemPage 요소를 선택합니다.
  //           const itemPageElement = itemPageElements[0];
  //           const page = itemPageElement.textContent.trim();
  //           setPage(page);
  //           console.log("책의 총 페이지 수: " + page);
  //         } else {
  //           console.log("itemPage 요소를 찾을 수 없습니다.");
  //         }
  //       })
  //       .catch((e) => console.log("에러: " + e.message));
  //   }, []);

  const setStartDate = () => {
    return(
    <DatePicker selected={startYmd} onChange={handleStartDateChange}></DatePicker>;
    );
  };

  const handleStartDateChange = (date) => {
    setStartYmd(date); // 선택된 날짜를 state에 저장
  };

  const setEndDate = () => {
    alert("종료일 달력");
  };

  const pageEdit = () => {
    //사용자가 책page바꾸고싶을때
    if (inRef.current) {
      const newPage = parseInt(inRef.current.value, 10);
      if (isNaN(newPage) || newPage < 1 || newPage > 5000) {
        alert("페이지 수는 1에서 5000 사이의 숫자여야 합니다.");
        return;
      } else {
        setPage(newPage);
        console.log("사용자가 입력한 바뀐 페이지: " + newPage);
      }
    }
  };

  const timeEdit = () => {
    alert("시간 수정");
  };

  const handleStatusClick = (index) => {
    if (index === 0) {
      // 읽고싶은책
      setClickedIndex(index);
      alert("읽고싶은책");
    } else if (index === 1) {
      // 읽고있는책 클릭했을때
      setClickedIndex(index);
      alert("읽고있는책");
    } else if (index === 2) {
      setClickedIndex(index);
      alert("다읽은책");
    } else if (index === 3) {
      setClickedIndex(index);
      alert("해당없음");
    }
  };

  const save = () => {
    alert("저장합니다");
  };

  return (
    <div style={{ textAlign: "center", padding: "5%" }}>
      <BackBtn
        onClick={() =>
          navigate("/BookDetail", { state: { book: location.state.book } })
        }
      ></BackBtn>
      <BookInfo>
        <div className="info">
          <img
            className="bookImg"
            src={bookImageUrl ? bookImageUrl : blackBook}
            alt={bookName}
          ></img>
          <div className="titleAuthor">
            <p>제목: {bookName ? bookName : "책제목 없음"}</p>
            <p>저자: {authors ? authors : "작가이름 없음"}</p>
            <p>
              요약:{" "}
              {shortenedDescription ? shortenedDescription : "요약내용 없음"}
            </p>
          </div>
        </div>
      </BookInfo>
      <StatusContainer>
        <BookStatus
          color={clickedIndex === 0 ? "#6F4E37" : "white"}
          $backcolor={clickedIndex === 0 ? "#FAECDC" : "#C3C3C3"}
          $bordercolor={clickedIndex === 0 ? "#6F4E37" : "#7B7B7B"}
          onClick={() => handleStatusClick(0)}
        >
          읽고 싶은 책
        </BookStatus>
        <BookStatus
          color="white"
          $backcolor={clickedIndex === 1 ? "#6F4E37" : "#C3C3C3"}
          $bordercolor={clickedIndex === 1 ? "white" : "#7B7B7B"}
          onClick={() => handleStatusClick(1)}
        >
          읽고 있는 책
        </BookStatus>
        <BookStatus
          color="white"
          $backcolor={clickedIndex === 2 ? "#5E7E71" : "#C3C3C3"}
          $bordercolor={clickedIndex === 2 ? "white" : "#7B7B7B"}
          onClick={() => handleStatusClick(2)}
        >
          다 읽은 책
        </BookStatus>
        <BookStatus
          color="white"
          $backcolor={clickedIndex === 3 ? "#5F5C5C" : "#C3C3C3"}
          $bordercolor={clickedIndex === 3 ? "white" : "#7B7B7B"}
          onClick={() => handleStatusClick(3)}
        >
          선택하지 않음
        </BookStatus>
      </StatusContainer>

      {/* ======================================== 선택 옵션에 따라 보이고 안보이는 부분 ==================== */}
      <div style={{ display: clickedIndex !== 1 ? "none" : "block" }}>
        <Period>
          <HeadText>목표 기간</HeadText>
          <div className="startToEnd">
            <span>시작</span>
            <Date>2024.6.1.</Date>
            <FaRegCalendarAlt
              style={{ cursor: "pointer" }}
              onClick={setStartDate}
            />

            <span>~</span>
            <span>끝</span>
            <Date>2024.6.1.</Date>
            <FaRegCalendarAlt
              style={{ cursor: "pointer" }}
              onClick={setEndDate}
            />
          </div>
        </Period>
        <Target>
          <HeadText>페이지 : {page}쪽</HeadText>
          <div className="graph">
            <Bar>
              <Progress width="50%" />
              {/* <div className="progress" width="50%"></div> */}
            </Bar>
            <input
              ref={inRef}
              type="text"
              placeholder="쪽수"
              style={{ width: "3rem" }}
            ></input>
            <EditBtn onClick={() => pageEdit}>수정</EditBtn>
          </div>
          <div className="numbers">
            <Number $left="0%">0p</Number>
            <Number $left="50%">350p</Number>
            <Number $left="100%">{page}p</Number>
          </div>
          <div>
            <p className="note">
              <span className="nickname">배추껍질</span>님의 하루 적정 독서
              페이지는 <span className="point">100p</span>입니다.
            </p>
          </div>
        </Target>
        <Target style={{ marginBottom: "20px" }}>
          <HeadText>시간</HeadText>
          <div className="graph">
            <Bar>
              <Progress width="28.57%" />
            </Bar>
            <EditBtn onClick={timeEdit}>수정</EditBtn>
          </div>
          <div className="numbers">
            <Number $left="0%">0분</Number>
            <Number $left="28.57%">200분</Number>
            <Number $left="100%">700분</Number>
          </div>
          <div>
            <p className="note">
              <span className="nickname">배추껍질</span>님의 하루 적정 독서
              시간은 <span className="point">100분</span>입니다.
            </p>
          </div>
        </Target>
      </div>

      <SaveBtn name="저장하기" onClick={save}></SaveBtn>
    </div>
  );
};
export default BookEdit;

const BookInfo = styled.div`
  display: flex;
  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
    height: 200px;
  }
  .bookImg {
    height: 150px;
    margin: 16px;
    border: 1px solid #6f4e37;
    border-radius: 5px;
  }
  .titleAuthor {
    height: 150px;
    margin-right: auto;
    text-align: start;
    > p {
      margin: 10px 0;
      color: #6f4e37;
      font-size: 14px;
    }
  }
`;
const StatusContainer = styled.div`
  height: 100px;
  width: 360px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  > div {
    margin: 5px 10px;
  }
`;
const BookStatus = styled.div`
  display: inline-block;
  width: 120px;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border-radius: 5px;
  color: ${(props) => props.color};
  border: 2px dashed ${(props) => props.$bordercolor};
  background-color: ${(props) => props.$backcolor};
  font-size: 14px;
  font-weight: bold;
  vertical-align: center;
  cursor: pointer;
  > p {
    padding: 0;
    margin: 0;
  }
`;
const Period = styled.div`
  .startToEnd {
    display: flex;
    justify-content: space-between;
    width: 300px;
    color: #6f4e37;
    margin: 0 auto;
    > span {
      font-size: 12px;
    }
  }
`;
const Target = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .graph {
    position: relative;
    width: 100%;
    text-align: end;
  }
  .numbers {
    height: auto;
    position: relative;
    width: 60%;
    padding: 0;
    margin: 0;
    margin-bottom: 20px;
  }
  .note {
    font-size: 12px;
    color: #5f5c5c;
    margin: 20px;
    .nickname {
      color: #5e7e71;
      font-weight: bold;
    }
    .point {
      color: #5e7e71;
      font-weight: bold;
    }
  }
`;
const Number = styled.span`
  font-size: 10px;
  position: absolute;
  left: ${(props) => props.$left};
  transform: translate(-50%);
  width: 35px;
`;
const Bar = styled.div`
  /* font-size: 11px; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 20px;
  background-color: #5e7e71;
`;
const Progress = styled.div`
  width: ${(props) => props.width};
  height: 20px;
  background-color: #6f4e37;
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #5f5c5c;
`;
const HeadText = styled.p`
  color: #6f4e37;
  font-size: 14px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
`;
const EditBtn = styled.button`
  background-color: #6f4e37;
  border: none;
  border-radius: 5px;
  color: white;
  width: 50px;
  height: 1.5rem;
  font-size: 10px;
  cursor: pointer;
`;
