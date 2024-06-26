import styled from "styled-components";
import bookImg from "../assets/HomeBook1.png";
import { useNavigate } from "react-router-dom";
import plusImage from '../assets/add.png'

const CircleBook2 = ({ book }) => {
  const navigate = useNavigate();

  const book1= {
    state: book.state,
    isbn : book.isbn,
    title : book.title,
    img : book.img,
    writer : book.writer,
    summary : book.summary,
    totalPage : book.totalpage,
    currentPage : book.currentPage,
    startDate : book.startDate,
    endDate : book.endDate,
    state : book.state,
    totalReadTime : book.totalReadTime,
    completedDate: book.completedDate,
  }


  const btnClick = () => {
    navigate("/BookDetail", {
      state: { book: book1 },
      replace: true, // 이전 페이지를 대체하며, 뒤로가기 시 무시됩니다.})
    });
  };

  return (
    <Container onClick={btnClick}>
      <div className="circle">
        <img className="bookImg" src={book1.img || plusImage} alt="책이미지" />
        <br></br>
      </div>
      <p
         style={{
          marginLeft: "8%",
          width: "70%",
          fontSize: "5%",
          color: "gray",
          textAlign: "center"
        
        }}
      >
        {book1.title ? (book1.title) : 
        (<>
        {"\u00A0".repeat(4)}책을
        <br/>
         추가해주세요
        </>
        )}
      </p>
    </Container>
  );
};
export default CircleBook2;

const Container = styled.div`
  .circle {
    border-radius: 50%;
    border: 2px solid #6f4e37;
    background-color: #FFFAED;
    width: 85px; /* 원의 너비와 높이 */
    height: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* 원형 밖으로 넘치는 이미지를 숨김 */
    margin: 10px;

    .bookImg {
      width: 62%;
      object-fit: cover; /* 이미지가 원형 내부를 채우도록 설정 */
    }
  }
`;
