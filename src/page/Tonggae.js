import styled from "styled-components";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase"; // firebase.js에서 db를 가져옴
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
import { useEffect, useRef, useState } from "react";

const Tonggae = () => {
  const user = useSelector((state) => state.userA.userAccount);
  const [books, setBooks] = useState([]); 

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const docRef = doc(db, "user", user.userId); //도큐먼트(유저아이디)
        // alert("트라이안에서유저:" + user.userId);
        const subColRef = collection(docRef, "book"); //서브컬렉션book찾아오기
        const snapshot = await getDocs(subColRef); // 서브컬렉션의 모든 문서 가져오기
        const timeAndEndDate = snapshot.docs.map((doc)=>{
            const data = doc.data()
            return{
                totalReadTime : data.totalReadTime,
                endDate : data.endDate,
            }
        })
        setBooks(timeAndEndDate);

      } catch (e) {
        alert(e.message);
      }
    };

    if (user.userId) {
        fetchBookData(); // user.userId가 존재할 때만 데이터를 가져오도록 설정
      }

  },[user.userId]);

  return (
    <Container>
      <GraphContainer>
        <GraphTitle>연간 읽은 책 권수</GraphTitle>
        <BarGraph>
          {books.map((item, index) => (
            <Bar key={index} style={{ height: `${item.totalReadTime * 10}px` }}>
              <BarLabel>{item.endDate}</BarLabel>
            </Bar>
          ))}
        </BarGraph>
      </GraphContainer>
      <GraphContainer>
        <GraphTitle>월별 독서 시간</GraphTitle>
        <BarGraph>
          {books.map((item, index) => (
            <Bar key={index} style={{ height: `${item.totalReadTime * 20}px` }}>
              <BarLabel>{item.endDate}</BarLabel>
            </Bar>
          ))}
        </BarGraph>
      </GraphContainer>
    </Container>
  );
};

export default Tonggae;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const GraphContainer = styled.div`
  width: 300px;
`;

const GraphTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BarGraph = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  height: 300px;
`;

const Bar = styled.div`
  width: 30px;
  background-color: #5e7e71;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 5px;
`;

const BarLabel = styled.span`
  margin-top: 5px;
  color: white;
`;