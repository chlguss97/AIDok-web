import styled from "styled-components";
// import BookStatus from "../components/BookStatus"
import SaveBtn from "../components/SaveBtn";
import { FaRegCalendarAlt } from "react-icons/fa";
import BackBtn from "../components/BackBtn";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import blackBook from "../assets/blankBook.png";

const BookEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [shortenedDescription, setShortenedDescription] = useState("");
  // const [bookName, setBookName] = useState()
  // const [bookImageUrl, setBookImageUrl] = useState()
  // const [authors, setAuthors] = useState()

  // const bookName = location.state.book.bookName
  // const authors = location.state.book.authors
  // const description = location.state.book.description
  // const bookImageUrl = location.state.book.bookImageUrl
  // const isbn13 = location.state.book.isbn13

  // useEffect(()=>{

  //     // setBookName(location.state.book.bookName)
  //     // setBookImageUrl(location.state.book.bookImageUrl)
  //     // setAuthors(location.state.book.authors)

  //       // 요약된 디스크립션 생성
  //       if (description.length > 100) {
  //         setShortenedDescription(description.substring(0, 100) + "...");
  //     } else {
  //         setShortenedDescription(description);
  //     }

  //     alert(bookName+"\n"+bookImageUrl+"\n"+authors+"\n"+description)
  // },[description])

  useEffect(() => {
    // BookDetail에서넘어온 book객체의 변수 :
    //bookName,title,bookImageUrl,image,authors,isbn13, description

    const isbnTest = "9788996991342";
    const url = `./backend/aladin_search.php?query=${location.state.book.isbn13}`;

    fetch(url)
      .then((response) => response.text())
      .then(text => {
        console.log("텍스트로받은거: " + text);
       
      
        try{
            const data = JSON.parse(text); //수동으로 제이슨파싱
            console.log("파싱된데이타 : "+data)
        }catch(error){
            console.log("에러 : ", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching or parsing data:", error);
      });
  }, []);

  const setStartDate = () => {
    alert("시작일 달력");
  };

  const setEndDate = () => {
    alert("종료일 달력");
  };

  const pageEdit = () => {
    alert("페이지 수정");
  };

  const timeEdit = () => {
    alert("시간 수정");
  };

  const [clickedIndex, setClickedIndex] = useState(3);

  const handleStatusClick = (index) => {
    if (index === clickedIndex) {
      // 이미 클릭된 상태인 경우 다시 초기화
      setClickedIndex(-1);
    } else {
      // 클릭된 상태의 인덱스 설정
      setClickedIndex(index);
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
        {/* <div className="info">
                    <img className="bookImg" src={bookImageUrl? bookImageUrl : blackBook} alt={bookName}></img>
                    <div className="titleAuthor">
                        <p>제목: {bookName? bookName : "책제목"}</p>
                        <p>저자: {authors? authors : "작가이름"}</p>
                        <p>요약: {shortenedDescription? shortenedDescription : "요오오옹약"}</p>
                    </div>
                </div> */}
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
        <HeadText>페이지</HeadText>
        <div className="graph">
          <Bar>
            <Progress width="50%" />
            {/* <div className="progress" width="50%"></div> */}
          </Bar>
          <EditBtn onClick={pageEdit}>수정</EditBtn>
        </div>
        <div className="numbers">
          <Number $left="0%">0p</Number>
          <Number $left="50%">350p</Number>
          <Number $left="100%">700p</Number>
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
            <span className="nickname">배추껍질</span>님의 하루 적정 독서 시간은{" "}
            <span className="point">100분</span>입니다.
          </p>
        </div>
      </Target>
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
