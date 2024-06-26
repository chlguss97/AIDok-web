import styled from "styled-components";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase"; // firebase.js에서 db를 가져옴
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import robot from "../assets/robot2.gif";
import { useNavigate } from "react-router-dom";
// import  SECRETKEY  from '@secretKey';
import { SECRETKEY } from "./SecretKey";
import aibook from "../assets/aibook.gif";

const Tonggae = () => {
  const user = useSelector((state) => state.userA.userAccount);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const docRef = doc(db, "user", user.userId); // 유저 도큐먼트 참조
        const subColRef = collection(docRef, "book"); // 서브컬렉션 book 참조

        // 특정 조건을 만족하는 쿼리 생성
        const q = query(subColRef, where("state", "in", ["ing", "end"]));

        // 쿼리에 해당하는 문서들 가져오기
        const snapshot = await getDocs(q);

        // totalReadTime이 0이 아닌 문서들만 필터링하고 데이터 변환
        const books = snapshot.docs
          .filter((doc) => doc.data().totalReadTime !== 0)
          .map((doc) => {
            const data = doc.data();
            return data;
          });

        setBooks(books);
      } catch (e) {
        alert(e.message);
      }
    };

    if (user.userId) {
      fetchBookData(); // user.userId가 존재할 때만 데이터를 가져오도록 설정
      handleClickAPICall();
    }
  }, [user.userId]);

  // 연도별 데이터 수 계산
  const yearCounts = books.reduce((acc, book) => {
    const year = book.endDate.substring(0, 4); // endDate에서 연도 부분만 추출
    if (acc[year]) {
      acc[year]++;
    } else {
      acc[year] = 1;
    }
    return acc;
  }, {});

  // 연간 읽은 책 권수 데이터 생성
  const annualBooksData = {
    labels: ["2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "연간 읽은 책 권수",
        data: [
          yearCounts["2021"] || 0,
          yearCounts["2022"] || 0,
          yearCounts["2023"] || 0,
          yearCounts["2024"] || 0,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions1 = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // y축 레이블 포맷 설정
          callback: function (value) {
            return `${value}권`;
          },
        },
      },
    },
    plugins: {
      // title: {
      //   display: true,
      //   text: "연간 읽은 책 권수",
      //   font: {
      //     weight: 'bold',
      //     size: 20
      //   },
      //   padding: {
      //     bottom: 10
      //   },
      // },
    },
  };

  // 월별 독서 시간 데이터 생성
  const monthlyReadingTimeData = {
    labels: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    datasets: [
      {
        label: "월별 독서 시간(2024년)",
        data: books.map((book) => {
          // book.totalReadTime를 시간으로 변환하여 데이터로 사용
          const timeComponents = book.totalReadTime.split(":"); // "09:21:08" 형식을 분리
          const hours = parseInt(timeComponents[0], 10); // 시간 부분
          const minutes = parseInt(timeComponents[1], 10); // 분 부분
          const seconds = parseInt(timeComponents[2], 10); // 초 부분
          const totalHours = hours + minutes / 60 + seconds / 3600; // 시간으로 변환
          return totalHours;
        }),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions2 = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // y축 레이블 포맷 설정
          callback: function (value) {
            return `${value}시간`; // 소수점 한 자리까지 표시
          },
        },
      },
    },
  };

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleClickAPICall = async () => {
    try {
      setIsLoading(true);
      const message = await CallGPT();
      setData(message);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const CallGPT = async () => {
    const content = `You are a reading analyst. Please look at my data and analyze it. 
    ${JSON.stringify(
      books,
      null,
      2
    )} In the variable "state", 'ing' means the book I am reading, 'want' means the book I want to read, and 'end' means the book I want to read
"Title" is the title of the book and "writer" is the author's name. "Total Reading Time" is the entire page of the book,
And 'Total Reading Time' is the cumulative time, minutes, and seconds I read this book. 'Start Date' is the date I started reading the book, and 'End Date' is the date I finished reading the book. 'Summary' is a summary of the book.
First, please analyze my reading pattern and taste and answer in Korean in 2 sentences.
Second, based on my reading pattern, please choose two books that will suit me or help me and recommend them in Korean.
The structure of the answer is '첫째, . . .' and the next paragraph is as clear as '둘째, . . . . . . Please answer in 400 characters or less overall;`;

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
    return message;
  };

  const CallGPT2 = async (question) => {
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

  return (
    <div>
      <Container>
        <PageTitle>{user.userId}님만의 AI 분석가</PageTitle>

        <GraphContainer1>
          <GraphTitle>연간 읽은 책 권수</GraphTitle>
          <Bar data={annualBooksData} options={chartOptions1} />
        </GraphContainer1>
        <GraphContainer2>
          <GraphTitle>월별 독서 시간</GraphTitle>
          <Bar data={monthlyReadingTimeData} options={chartOptions2} />
        </GraphContainer2>

        <AIDiv>
          <RotatingImg src={robot} alt="로봇사진" />
          <AnimatedSpan>
          <span style={{color:"gray"}}>{user.userId}님의 독서분석가 똑독이가 {user.userId}님의
          독서 패턴을 분석해보았습니다^^</span> <br></br><br/>
            {data}
          </AnimatedSpan>
          <br />
          <button onClick={() => navigate("/List")}>
            AI 추천 책 검색하러 가기
          </button>
        </AIDiv>
      </Container>

      <BottomDiv>
        <p className="title">AI 챗똑독이 활용하기</p>
        <RotatingImg src={aibook} alt="ai사진" />
        <StyledInput
          placeholder="똑독이에게 물어보세요"
          onChange={(e) => setQuestion(e.target.value)}
          height={`${Math.max(40, question.split("\n").length * 20)}px`}
        />

        <button onClick={() => CallGPT2(question)}>질문하기</button>
        <p>답변 : {response}</p>
      </BottomDiv>
    </div>
  );
};

export default Tonggae;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4c7397;
  animation: blink 1s linear infinite;

  @keyframes blink {
    0%,
    100% {
      color: #4c7397;
      opacity: 1;
    }
    50% {
      color: #32a852;
      opacity: 0.5;
    }
  }
`;



const GraphContainer1 = styled.div`
  width: 80%;
  border-radius: 10px;
  margin-bottom: 40px;
  border: 1px solid rgba(75, 192, 192, 1);
  background-color: rgba(75, 192, 192, 0.1);
  padding: 10px;
`;

const GraphContainer2 = styled.div`
 border-radius: 10px;
  width: 80%;
  margin-bottom: 40px;
  border: 1px solid rgba(75, 192, 192, 1);
  background-color: rgba(75, 192, 192, 0.1);
  padding: 10px;
`;

const GraphTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const AIDiv = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  button {
    margin-top: 20px;
    padding: 12px 24px;
    background-color: #4c7397;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3b5a7a;
    }
  }
`;

const AnimatedSpan = styled.span`
  display: block;
  margin: 20px 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  animation: slideDown 3s ease-in-out;

  @keyframes slideDown {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const RotatingImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid #999;
  margin-bottom: 20px;
  animation: rotate 4s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const BottomDiv = styled.div`
  width: 80%;
  margin: 0px auto 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .title {
    font-size: 20px;
    color: #4c7397;
    animation: blink 1s linear infinite;
  }

  @keyframes blink {
    0%,
    100% {
      color: #4c7397;
      opacity: 1;
    }
    50% {
      color: #32a852;
      opacity: 0.5;
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

const StyledInput = styled.input`
  flex: 1;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  height: ${(props) => props.height || "auto"};
`;
