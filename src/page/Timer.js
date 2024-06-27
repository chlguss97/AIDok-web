import styled from "styled-components";
import bookImg from "../assets/book.png";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebase"; // firebase.js에서 db를 가져옴
import robot3 from "../assets/robot3.png";
import searchicon2 from "../assets/searchicon2.png";
import { SECRETKEY } from "./SecretKey";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  where,
  updateDoc,
  query,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




const Timer = () => {
  const [times, setTimes] = useState([]); // 초를 저장할 상태
  const [timerOn, setTimerOn] = useState(false); // 타이머 동작 여부를 저장할 상태
  const [bookItems, setBookItems] = useState([]);
  const [page, setPage] = useState();
  const [currentPage, setCurrentPage] = useState("");
  const [timerRefs, setTimerRefs] = useState({});
  const user = useSelector((state) => state.userA.userAccount);
  const [stoppedTimes, setStoppedTimes] = useState([]); // 멈춘 시간을 저장할 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // 컬렉션 경로와 쿼리 설정
        const q = query(
          collection(db, "user", user.userId, "book"),
          where("state", "==", "ing")
        );
        const querySnapshot = await getDocs(q);

        // 문서 데이터 가져오기
        const docs = querySnapshot.docs.map((doc) => doc.data());
        setBookItems(docs);
      } catch (error) {
        console.error("도큐먼트에 패칭하다가 생기 오류: ", error);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    // bookItems가 변경될 때 타이머 초기화
    if (bookItems.length > 0) {
      console.log(`첫 번째 bookItem 객체의 값들:${bookItems[0].title}`);
      // 타이머 상태 초기화
      setTimerOn(Array(bookItems.length).fill(false));
      // 초 상태 초기화
      setTimes(Array(bookItems.length).fill(0));
      // setStoppedTimes(Array(bookItems.length).fill(0));
      //   // 타이머 참조 초기화
      //   const refs = {};
      //   bookItems.forEach((_, index) => {
      //     refs[index] = { ref: null };
      //   });
      //   setTimerRefs(refs);
    }
  }, [bookItems]);

  // 타이머 시작 함수
  const startTimer = (index) => {
    setTimerOn((prevTimers) => {
      const updatedTimers = [...prevTimers];
      updatedTimers[index] = true;
      return updatedTimers;
    });

    //==============================================
    const intervalId = setInterval(() => {
      setTimes((prevTimes) => {
        const updatedTimes = [...prevTimes];
        updatedTimes[index] += 1;
        return updatedTimes;
      });
    }, 1000);

    setTimerRefs((prevRefs) => ({
      ...prevRefs,
      [index]: { ref: intervalId },
    }));
  };

  // 타이머 정지 함수
  const stopTimer = (index) => {
    setTimerOn((prevTimers) => {
      const updatedTimers = [...prevTimers];
      updatedTimers[index] = false;
      return updatedTimers;
    });

    clearInterval(timerRefs[index].ref);
    setStoppedTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes[index] = times[index];
      return updatedTimes;
    });
    setTimerRefs((prevRefs) => ({
      ...prevRefs,
      [index]: { ref: null },
    }));
  };

  // 타이머 초기화 함수
  const resetTimer = (index) => {
    clearInterval(timerRefs[index].ref);
    setTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes[index] = 0;
      return updatedTimes;
    });
    setStoppedTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes[index] = 0;
      return updatedTimes;
    });
    setTimerOn((prevTimers) => {
      const updatedTimers = [...prevTimers];
      updatedTimers[index] = false;
      return updatedTimers;
    });
    setTimerRefs((prevRefs) => ({
      ...prevRefs,
      [index]: { ref: null },
    }));
  };

  // 초를 시:분:초 형식으로 변환하는 함수
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const formatTimeForFirebase = (seconds) => {
    if (seconds === undefined || seconds === null) {
      return "00:00:00";
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const clickSave = async () => {
    try {
      await Promise.all(
        bookItems.map(async (book, index) => {
          // alert(userId: ${user.userId})
          console.log(`userId: ${user.userId}`);
          const bookRef = doc(db, "user", user.userId, "book", book.isbn);
          // alert(isbn: ${book.isbn})

          // Fetch the total read time from Firebase and convert it to seconds

          const firebaseTotalTime = convertFirebaseTimeToSeconds(
            book.totalReadTime
          );
          // alert(firebase..:${firebaseTotalTime})
          // Calculate the total reading time in seconds
          const totalReadingTimeInSeconds =
            (stoppedTimes[index] || 0) + firebaseTotalTime;

          await updateDoc(bookRef, {
            currentPage: book.currentPage,
            totalReadTime: formatTimeForFirebase(totalReadingTimeInSeconds),
          });
        })
      );
      alert("저장되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("저장하는 도중 오류가 발생했습니다: ", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const convertFirebaseTimeToSeconds = (timeString) => {
    if (!timeString) {
      return 0;
    }

    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const changePage = (bookIndex) => {
    if (!/^\d+$/.test(page)) {
      //숫자 검증 정규식 사용
      alert("숫자만 입력 가능합니다.");
      return;
    }

    // 입력한 페이지가 책의 총 페이지보다 크면 경고 메시지 출력
    if (parseInt(page) > bookItems[bookIndex].totalPage) {
      alert(
        `입력한 페이지는 책의 총 페이지 수(${bookItems[bookIndex].totalPage}p)보다 클 수 없습니다.`
      );
      return;
    }

    // 타이머가 작동 중이 아닐 때만 페이지 변경을 수행
    if (!timerOn[bookIndex]) {
      setBookItems((prevBookItems) => {
        const updateBooks = [...prevBookItems];
        updateBooks[bookIndex].currentPage = page;
        return updateBooks;
      });
      setCurrentPage(page);
    } else {
      alert("타이머를 정지한 후 페이지를 변경해주세요.");
    }
  };

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);


  const CallGPT = async (question) => {
    
    const content = question;

    console.log("콜쥐피티");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SECRETKEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: content }],
        temperature: 0.7,
        max_tokens: 1_000,
      }),
    });
    const responseData = await response.json();
    // alert("response data : "+responseData)
    const message = responseData.choices[0].message.content;
    setResponse(message);
  };

  const imgClick = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <StyledSlider {...settings}>
        {bookItems.map((book, index) => {
          return (
            <div>
              <img src={book.img} className="img" alt="책 이미지"></img>
              <p>
                {book.title}
              </p>
              <p>
                <div className="timeContainer">
                  <span className="label">누적시간 :</span>
                  <span className="nujuck">{book.totalReadTime}</span>
                  <span className="nujuck1">
                    {" "}
                    + {formatTime(stoppedTimes[index] || 0)}
                  </span>
                  {/* <p className="time">{formatTime(times[index] || 0)}</p> */}
                  <p className="time">{formatTime(times[index])}</p>
                </div>
              </p>
              {!timerOn[index] ? (
                <button
                  className="timer_button1"
                  onClick={() => startTimer(index)}
                >
                  독서 타이머 시작
                </button>
              ) : (
                <>
                  <button
                    className="timer_button1"
                    onClick={() => stopTimer(index)}
                  >
                    타이머 정지
                  </button>
                  <button
                    className="timer_button2"
                    onClick={() => resetTimer(index)}
                  >
                    초기화
                  </button>
                </>
              )}



              {book.totalPage}p 중{" "}{" "}
              <span style={{ color: "#6F4E37" }}>{book.currentPage}p 읽는중</span>
              <br />
              <input
                className="input"
                placeholder="책 페이지"
                onChange={(e) => setPage(e.target.value)}
              ></input>{" "}

              <button className="pageOkBtn" onClick={() => changePage(index)}>
                변경
              </button>

            </div>
          );
        })}
      </StyledSlider>

      <BottomDiv open={open}>
        <img
          className="robotImg"
          src={robot3}
          alt="ai사진"
          onClick={imgClick}
        />
        {open ? (
          <div className="openOrClose">
            <div className="inputDiv">
              <input
                className="styledInput"
                placeholder="책봇에게 물어보세요"
                onChange={(e) => setQuestion(e.target.value)}
                height={`${Math.max(40, question.split("\n").length * 20)}px`}
              />
              <img
                className="searchImg"
                src={searchicon2}
                onClick={() => CallGPT(question)}
              />
            </div>
            <p>{response}</p>
          </div>
        ) : (
          <span></span>
        )}
      </BottomDiv>

      <button className="timer_button3" onClick={clickSave}>
        저장하기
      </button>
    </Container>
  );
};

export default Timer;

const Container = styled.div`
  background-color: #5E7E71;
  text-align: center;
  padding: 8%;
  position: relative; /* 상대 위치 설정 */

  .nujuck {
    font-size: 20px;
    color: #6F4E37;
  }
  .nujuck1 {
    font-size: large;
    color: #5E7E71;
  }

  .label {
    display: inline-block; /* 인라인 블록 요소로 설정하여 왼쪽 정렬을 가능하게 함 */
    text-align: left; /* 텍스트를 왼쪽으로 정렬 */
    width: 100px; /* 적절한 너비 설정 */
    font-size: 18px; /* 원하는 글자 크기 설정 */
    font-weight: bold; /* 글자 굵기 설정 */
    margin: 0; /* 기본 마진 제거 */
    padding: 10px 0; /* 상하 패딩을 조정하여 간격을 조절 */
    
  }

  .img {
    border-radius: 5%;
    width: 100%;
    height: 100%;
  }

  .pageOkBtn {
    background-color: #6F4E37;
    border: none;
    cursor: pointer;
    padding: 8px 24px;
    font-size: 16px;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    color: #fff;

    &:hover {
      background-color: #4e3626;
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }

    &:active {
      background-color: #3a281e;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
    }
  }

  .input {
    margin-left: 16px; /* Adjusted margin */
    width: 80px; /* Increased width */
    height: 38px;
    border-radius: 20px;
    box-sizing: border-box;
    transition: background-color 0.3s, transform 0.3s;
    padding: 5px;
    border: 1px solid #ccc;
    font-size: 14px; /* Adjusted font size */
    outline: none;
    text-align: center;
    color: #6F4E37;
    background-color: #fff;

    &:hover {
      background-color: #7eb59e;
    }

    &:focus {
      background-color: #7eb59e;
      transform: scale(1.05);
    }
  }

  .time {
    font-size: 24px;
    margin: 10px auto 10px auto;
  }

  .timer_button1 {
    display: block;
    border-radius: 20px;
    margin: 0px auto 32px auto;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #6F4E37;
    border: none;
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }

    &:active {
      background-color: #e0e0e0;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
    }
  }

  .timer_button2 {
    display: block;
    border-radius: 20px;
    margin: 10px auto 40px auto;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #6F4E37;
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }

    &:active {
      background-color: #e0e0e0;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
    }
  }

  .timer_button3 {
    display: block;
    border-radius: 20px;
    margin: 80px auto 100px auto;
    padding: 20px 60px;
    font-size: 16px;
    background-color: #6F4E37;
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }

    &:active {
      background-color: #e0e0e0;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
    }
  }
`;

const StyledSlider = styled(Slider)`
  div {
    background-color: #fdfbf4;
    border-radius: 3%;
  }
  .slick-list {
    overflow: hidden;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; /* 이미지 내부의 절대 위치 설정 */
  }

  .slick-slide img {
    width: 150px;
    height: 200px;
    margin: 30px auto 12px auto;
    border: 3px solid white;
  }

  .slick-dots li.slick-active button {
    font-weight: bold;
  }

  .slick-prev,
  .slick-next {
    display: none !important;
  }
`;


const BottomDiv = styled.div`
  position: fixed;
  bottom: 120px;
  right: 20px;
  width: ${(props) => (props.open ? '80%' : '60px')};
  max-width: ${(props) => (props.open ? '300px' : '60px')};
  height: ${(props) => (props.open ? 'auto' : '60px')};
  display: flex;
  flex-direction: ${(props) => (props.open ? 'row' : 'column')};
  justify-content: ${(props) => (props.open ? 'center' : 'center')};
  align-items: center;
  border: 1px solid #ccc;
  border-radius: ${(props) => (props.open ? '10px' : '50%')};
  padding: ${(props) => (props.open ? '12px' : '0')};
  background-color: #F6F6F6;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  .robotImg {
    width: ${(props) => (props.open ? '40px' : '100%')};
    height: ${(props) => (props.open ? '40px' : '100%')};
    margin-right: ${(props) => (props.open ? '5px' : '0')};
    cursor: pointer;
  }

  .inputDiv {
    position: relative;
    display: ${(props) => (props.open ? 'flex' : 'none')};
    align-items: center;

    .styledInput {
      padding-right: 40px; /* Ensure space for the icon */
      height: auto; /* Allow dynamic height */
      padding: 10px; /* Add padding for better spacing */
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
      box-sizing: border-box;
      flex: 1; /* Allow the input to take available space */
    }

    .searchImg {
      position: absolute;
      right: 10px;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  button {
    padding: 12px 24px;
    background-color: #4c7397;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 10px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3b5a7a;
    }
  }

  p {
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-left: 10px;
    vertical-align: middle;
  }
`;