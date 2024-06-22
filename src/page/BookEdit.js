import styled from "styled-components";
// import BookStatus from "../components/BookStatus"
import SaveBtn from "../components/SaveBtn";
import { FaRegCalendarAlt } from "react-icons/fa";
import BackBtn from "../components/BackBtn";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import blackBook from "../assets/blankBook.png";
// import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useSelector } from "react-redux";
// import { db, storage } from '../firebase/firebase'; // firebase.js에서 db를 가져온다고 가정
// import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from "../firebase/firebase"; // firebase.js에서 db를 가져옴
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify"; //토스트 라이브러리 yarn add react-toastify
import "react-toastify/dist/ReactToastify.css";











const BookEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookItem = location.state.book
  //받아온 book에는 title, img, writer, isbn, summary, link가 있다.
  const [shortenedDescription, setShortenedDescription] = useState("");
  const [page, setPage] = useState("페이지정보없음");
  const [clickedIndex, setClickedIndex] = useState(3); //기본이 "선택되지 않음"
  const inRef = useRef();
  const user = useSelector((state) => state.userA.userAccount);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [dateDifference, setDateDifference] = useState("");
  const [completedDate, setCompletedDate] = useState(""); //다읽은책이면 다읽은 날짜
  const [totalReadTime, setTotalReadTime] = useState(0); //읽은 누적 시간
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    console.log("로그인한유저아이디 : " + user.userId);
    console.log("링크를 줄까안줄까.:" + bookItem.link);

    if ( bookItem.link) {
      const match = bookItem.link.match(/catalog\/(\d+)/);
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
  }, [ bookItem.link]);

  useEffect(() => {
    //     // 요약된 디스크립션 생성
    if ( bookItem.summary?.length > 1) {
      setShortenedDescription( bookItem.summary.substring(0, 100) + "... ...");
    } else {
      setShortenedDescription( bookItem.summary);
    }
  }, [ bookItem.summary]);

  const pageEdit = () => {
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
    } else if (index === 1) {
      // 읽고있는책 클릭했을때
      setClickedIndex(index);
    } else if (index === 2) {
      setClickedIndex(index);
    } else if (index === 3) {
      setClickedIndex(index);
    }
  };

  const save = () => {
    let result = null;
    if (clickedIndex === 1) {
      // 시작일과 종료일을 설정하지 않은 경우
      if (!startDate || !endDate) {
        alert("시작일과 종료일을 지정하셔야 합니다.");
        return;
      }
      result = window.confirm("읽고 있는 책으로 저장하시겠습니까?");
    } else if (clickedIndex === 0) {
      result = window.confirm("읽고 싶은 책으로 저장하시겠습니까?");
    } else if (clickedIndex === 2) {
      result = window.confirm("다 읽은 책으로 저장하시겠습니까?");
    } else if (clickedIndex === 3) {
      result = window.confirm("선택하지 않음으로 저장하시겠습니까?\n그전에 저장하신 데이터가 있다면 모두 사라지게 됩니다. ");
    }

    if (result) {
      onAlertSaveClick(); // 저장 처리 함수 호출
    } else {
      // 사용자가 취소를 선택한 경우
      console.log("얼러트에서 취소눌렀음");
    }
  };

  const onAlertSaveClick = async () => {
    console.log("클릭된인덱스번호" + clickedIndex);
    //만약 clickedIndex가0이면 읽고싶은책. firebase에 user컬렉션-사용자id도큐-book서브컬렉션-isbn도큐 중 이 문서에isbn13과 일치하는게 있으면
    //덮어쓰기할거고.. 없으면 만들겠지..
    //clickedIndex가0이면 firebase에 state를 want로..
    try {
      const userDocRef = doc(db, "user", user.userId); //도큐먼트만들거나 가져오기
      const bookSubDocRef = doc(userDocRef, "book",  bookItem.isbn); //서브컬렉션은 'book', 서브도큐먼트이름이 isbn으로 만드러주세영

      if (clickedIndex === 0) {
        await setDoc(bookSubDocRef, {
          state: "want",
          title:  bookItem.title, //책제목
          writer:  bookItem.writer, //작가
          totalpage: page, //첵 토탈페이지
          img:  bookItem.img, //책이미지
          summary:  bookItem.summary, //책요약
          completedDate: completedDate, //다읽은책이면 다읽은날짜
          totalReadTime: totalReadTime, //누적 읽은 시간
          startDate: startDate, //시작날짜
          endDate: endDate, //종료날짜
          currentPage: currentPage, //현재까지읽은 누적페이지
          isbn:  bookItem.isbn,
        });
        console.log("데이터가 성공적으로 Firebase에 추가되써열~~");
        navigate('/', {replace:true})
        toast.success("읽고 싶은 책에 저장되었습니다.");
      } else if (clickedIndex === 1) {
        await setDoc(bookSubDocRef, {
          state: "ing",
          title:  bookItem.title, //책제목
          writer:  bookItem.writer, //작가
          totalpage: page, //첵 토탈페이지
          img:  bookItem.img, //책이미지
          summary:  bookItem.summary, //책요약
          completedDate: completedDate, //다읽은책이면 다읽은날짜
          totalReadTime: totalReadTime, //누적 읽은 시간
          startDate : startDate ? moment(startDate).format('YYYY-MM-DD') : "", //시작날짜
          endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : "", //종료날짜
          currentPage: currentPage, //현재까지읽은 누적페이지
          isbn:  bookItem.isbn,
        });
        console.log("데이터가 성공적으로 Firebase에 추가되써열~~");
        toast.success("읽고 있는 책에 저장되었습니다.");
      } else if (clickedIndex === 2) {
        await setDoc(bookSubDocRef, {
          state: "end",
          title: bookItem.title, //책제목
          writer: bookItem.writer, //작가
          totalpage: page, //첵 토탈페이지
          img: bookItem.img, //책이미지
          summary: bookItem.summary, //책요약
          completedDate: completedDate, //다읽은책이면 다읽은날짜
          totalReadTime: totalReadTime, //누적 읽은 시간
          startDate: startDate, //시작날짜
          endDate: endDate, //종료날짜
          currentPage: currentPage, //현재까지읽은 누적페이지
          isbn: bookItem.isbn,
        });

        toast.success("다 읽은 책에 저장되었습니다.");
      } else if (clickedIndex === 3) {
        await deleteDoc(bookSubDocRef);
        toast.success("선택하지 않음.");
      }
      navigate('/',{replace:true})
    } catch (error) {
      console.log("firebase에 데이터추가 오류발생 : " + error);
      toast.error("저장에 문제가 생겼습니다." + error.message);
    }
  };



  const clickStartCalendar = () => {
    setIsStartOpen(!isStartOpen);
  };

  const startDateChange = (selectedDate) => {
    setIsStartOpen(false);
    setStartDate(selectedDate);
  };

  const clickEndCalendar = () => {
    setIsEndOpen(!isEndOpen);
  };

  const endDateChange = (selectedDate) => {
    setIsEndOpen(false);
    setEndDate(selectedDate);
  };

  useEffect(() => {
    calculateDateDifference();
  }, [startDate, endDate]);

  // 날짜 차이 계산 함수
  const calculateDateDifference = () => {
    if (startDate && endDate) {
      const start = moment(startDate);
      const end = moment(endDate);

      // 시작 날짜가 끝 날짜와 같을 때는 일 수 차이를 1로 설정
      if (start.isSame(end, "day")) {
        setDateDifference(1);
      } else if (start.isAfter(end)) {
        alert("시작 날짜는 끝 날짜보다 이후일 수 없습니다.");
      } else {
        const diffInDays = end.diff(start, "days");
        setDateDifference(diffInDays + 1);
      }
    } else {
      setDateDifference(null);
    }
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
            src={bookItem.img ? bookItem.img : blackBook}
            alt={bookItem.title}
          ></img>
          <div className="titleAuthor">
            <p>제목: {bookItem.title ? bookItem.title : "책제목 없음"}</p>
            <p>저자: {bookItem.writer ? bookItem.writer : "작가이름 없음"}</p>
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
            {/* ~~~~시작날짜~~~~~ */}
            <span onClick={clickStartCalendar}>
              <span>시작 : </span>

              <FaRegCalendarAlt style={{ cursor: "pointer" }} />
              <span className="dateText">
                {startDate ? startDate.toLocaleDateString() : "시작일 선택"}
                {/* startDate 객체 --> Fri Jun 21 2024 00:00:00 GMT+0000 (Coordinated Universal Time) */}
                {/* .toLocaleDateString 문자열 --> 2024. 6. 21. */}
              </span>
            </span>

            {isStartOpen && (
              <Calendar
                onChange={startDateChange}
                value={startDate}
                // maxDate={new Date()}
                // formatDay={(locale, date) =>
                //   date.toLocaleString("en", { day: "numeric" })
                // }
              />
            )}

            <span style={{ marginLeft: "5px", marginRight: "5px" }}>~</span>

            {/* ~~~~끝날짜~~~~~ */}
            <span onClick={clickEndCalendar}>
              <span>종료 : </span>
              &nbsp; &nbsp;
              <FaRegCalendarAlt style={{ cursor: "pointer" }} />
              <span className="dateText">
                {endDate ? endDate.toLocaleDateString() : "종료일 선택"}
              </span>
            </span>

            {isEndOpen && (
              <Calendar
                onChange={endDateChange}
                value={endDate}
                className="calendar"
              />
            )}
          </div>
        </Period>
        <Target>
          <HeadText>
            {bookItem.title} : {page ? `${page}쪽` : ` 쪽`}
          </HeadText>
          <div className="graph">
            <Bar>
              <Progress width="0%" />
            </Bar>
            {/* <input
              ref={inRef}
              type="text"
              placeholder="쪽수"
              style={{ width: "3rem" }}
            ></input> */}
            {/* <EditBtn onClick={() => pageEdit()}>수정</EditBtn> */}
          </div>
          <div className="numbers">
            <Number $left="0%"><span style={{fontWeight:"bold", fontSize:"0.8rem",color:"gray", marginTop:"3rem"}}>0p</span></Number>
            <Number $left="100%"><span style={{fontWeight:"bold", fontSize:"0.8rem",color:"gray", marginTop:"3rem"}}>{page}p</span></Number>
          </div>
          <div>
            <p className="note">
              <span className="nickname">
                {page ? page : "?"}쪽을 {dateDifference ? dateDifference : "?"}
                일 동안 읽으셔야 하기에, 하루 권장 독서 페이지는
                <span className="point">
                  {page && dateDifference
                    ? (page / dateDifference).toFixed(1)
                    : "?"}
                  p
                </span>
                입니다.
                {/* .toFixed(1) 소수점 첫째자리 */}
              </span>
            </p>
          </div>
        </Target>
        <Target style={{ marginBottom: "20px" }}>
          <HeadText>추천 시간 : {page}분</HeadText>
          <div className="graph">
            <Bar>
              <Progress width="0%" />
            </Bar>
            {/* <EditBtn onClick={timeEdit}>수정</EditBtn> */}
          </div>
          <div className="numbers">
            <Number $left="0%"><span style={{fontWeight:"bold", fontSize:"0.8rem",color:"gray", marginTop:"3rem"}}>0분</span></Number>
         
            <Number $left="100%"><span style={{fontWeight:"bold", fontSize:"0.8rem",color:"gray", marginTop:"3rem"}}>{page}분</span></Number>
          </div>
          <div>
            <p className="note">
              <span className="nickname">{user.userId}</span>님의 하루 적정 독서
              시간은 
              <span className="point">
                {page && dateDifference
                  ? (page / dateDifference).toFixed(1)
                  : "?"}
                분
              </span>
              입니다.
            </p>
          </div>
        </Target>
      </div>
      <br></br><br></br><br></br>
      <SaveBtn type="submit" name="저장하기" onClick={save}></SaveBtn>
      <ToastContainer />
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
  margin: 60px auto;
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
  margin-top: 10px;
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
