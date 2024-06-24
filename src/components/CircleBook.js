import styled from "styled-components";
import bookImg from "../assets/HomeBook1.png";
import { useNavigate } from "react-router-dom";

const CircleBook = ({ book }) => {
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
        <img className="bookImg" src={book1.img} alt="책이미지" />
      </div>
      <p
        style={{
          marginLeft: "5%",
          width: "65%",
          fontSize: "5%",
          color: "gray",
        }}
      >
        {book1.title}
      </p>
    </Container>
  );
};
export default CircleBook;

const Container = styled.div`
  .circle {
    border-radius: 50%;
    border: 2px solid #5e7e71;
    background-color: #6f4e37;
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
