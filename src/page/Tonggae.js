import styled from "styled-components";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase"; // firebase.js에서 db를 가져옴
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import robot from "../assets/robot2.gif";

const Tonggae = () => {
  const user = useSelector((state) => state.userA.userAccount);
  const [books, setBooks] = useState([]);

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
        const timeAndEndDates = snapshot.docs
          .filter((doc) => doc.data().totalReadTime !== 0)
          .map((doc) => {
            const data = doc.data();
            return {
              totalReadTime: data.totalReadTime,
              endDate: data.endDate,
            };
          });

        setBooks(timeAndEndDates);
      } catch (e) {
        alert(e.message);
      }
    };

    if (user.userId) {
      fetchBookData(); // user.userId가 존재할 때만 데이터를 가져오도록 설정
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

  return (
    <Container>
      <PageTitle>AI DOC의 통계</PageTitle>
      <GraphContainer1>
        <GraphTitle>연간 읽은 책 권수</GraphTitle>
        <Bar data={annualBooksData} options={chartOptions1} />
      </GraphContainer1>
      <GraphContainer2>
        <GraphTitle>월별 독서 시간</GraphTitle>
        <Bar data={monthlyReadingTimeData} options={chartOptions2} />
      </GraphContainer2>
      <div className="AIdiv">
        <img src={robot} alt="로봇사진"></img>
        <textarea>ai가 말해주는 나의 독서 습관과 추천</textarea>
      </div>
    </Container>
  );
};

export default Tonggae;

const Container = styled.div`
  display: flex;
  flex-direction: column; /* 차트들을 세로로 배열 */
  align-items: center;
  padding: 20px;

  .AIdiv{
    margin-bottom: 100px;

    textarea{
      width: 60%;
      height: 20%;
    }

    img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    border: 3px solid gray;
  }

  }

 
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4c7397;
`;

const GraphContainer1 = styled.div`
  width: 80%; /* 차트 크기를 적절히 설정 */
  margin-bottom: 40px; /* 차트 간 간격 */
  border: 1px solid rgba(75, 192, 192, 1); /* 테두리 설정 */
  background-color: rgba(75, 192, 192, 0.1); /* 배경색 설정 */
  padding: 10px;
`;

const GraphContainer2 = styled.div`
  width: 93%; /* 차트 크기를 적절히 설정 */
  margin-bottom: 20px; /* 차트 간 간격 */
  border: 1px solid rgba(153, 102, 255, 1); /* 테두리 설정 */
  background-color: rgba(153, 102, 255, 0.1); /* 배경색 설정 */
  padding: 10px;
`;

const GraphTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center; /* 제목을 가운데 정렬 */
`;
