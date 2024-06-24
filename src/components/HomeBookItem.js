import styled from "styled-components";
import book1 from "../assets/HomeBook1.png";
import memo4 from "../assets/memo4.gif"
import memoImg from "../assets/memo2.png";
import ggalpi from "../assets/tek.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bookImage from '../assets/blankBook.png'

const HomeBookItem = ({ book }) => {

  const book1= {
    state: book.state,
    isbn : book.isbn,
    title : book.title,
    img : book.img,
    writer : book.writer,
    summary : book.summary,
    totalPage : book.totalPage,
    currentPage : book.currentPage,
    startDate : book.startDate,
    endDate : book.endDate,
    state : book.state,
    totalReadTime : book.totalReadTime,
    completedDate: book.completedDate,
  }

  
  const navigate = useNavigate()
  
  const [dayPassed, setDayPassed] = useState()

  useEffect(()=>{
    console.log("읽기시작한날111 : "+book1.startDate+", 현재페이지:"+ book1.currentPage)
    calculateDaysPassed()
  })

  const memoClick = ()=>{
    navigate("/NotePage", {state: {book: book1}}) 
  }
  
  const btnClick = ()=>{
    navigate("/BookEdit", 
      {state: {book: book1},
      replace: true // 이전 페이지를 대체하며, 뒤로가기 시 무시됩니다.})
      })
  }

  const calculateDaysPassed = () => {
    const sd = new Date( book1.startDate);
    console.log(`스타드데이트: ${sd}`)
    const today = new Date();
    const timeDiff = today - sd;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    setDayPassed(daysDiff + 1); // Including the start day
  };


  return (
    <Container>
      <div className="bigContents" >
        <div className="ggalpiTotal">
          <img id="ggalpi" src={ggalpi} alt="책깔피사진"></img>
          <VerticalText>{ dayPassed? dayPassed : "?"}일째</VerticalText>
        </div>

        <img className="bookImg" src={book1.img || bookImage} alt="책사진" onClick={btnClick}></img>
        <div className="contents">
          <div className="title" onClick={btnClick}>
            <span style={{fontSize:"15px", fontWeight:"bold"}}>제목 : </span>
            <span> { book1.title || "책 제목"}</span>
          </div>
          <div className="writer" onClick={btnClick}>
            <span style={{fontSize:"15px", fontWeight:"bold"}}>저자 : </span>
            <span>{ (book1.writer || "글쓴이").replace(/\^/g, ',')}</span>
          </div>
          <input
            id="slider"
            type="range"
            min="0"
            max={ book1.totalPage || "책 페이지"}
            value={ book1.currentPage?  book1.currentPage : 0}
            step="1"
            onClick={btnClick}
          ></input>
          <div className="page" onClick={btnClick}>
            <span style={{ color: "#6F4E37", fontWeight: "bold" }}>
              {book1.currentPage? book1.currentPage : "0"}
            </span>
            <span>/</span>
            <span style={{ color: "#6F4E37" }}>{ book1.totalPage?  book1.totalPage : "페이지정보없음"}</span>
            <em style={{ color: "#6F4E37", fontWeight: "bold" }}> p</em>
          </div>
        </div>
        <div className="memoImg"onClick={memoClick} >
          <img src={memo4} alt="메모사진" onClick={memoClick}></img>
        </div>
      </div>
      {/* card*/}
    </Container>
  );
};

export default HomeBookItem;

const Container = styled.div`
  .bigContents {
    margin-left: 6%;
    border: 2px solid #6f4e37;
    border-radius: 40px;
    padding: 2% .5%;
    background-color: #fffaed;
    width: 70%;
    position: relative;
    display: flex;
    flex-direction: row;

    .ggalpiTotal {
      width: 8%;
      position: relative;
      left: 82%;
      margin-top: -4%;

     

      #ggalpi {
        width: 100%;
        position: absolute;
        height: 50%;
        left: -7%;

      }
    }

    .bookImg {
      width: 140px !important;
      height: 180px !important;
      border-radius: 5%;
      margin-right: 3%;
      object-fit: cover;
    }
    .contents {
      width: 32%;
      .title span{
        font-size: 2.7vw;
      }
      .writer {
        margin-top: 5%;
        margin-bottom: 5%;
        font-size: 2.7vw;
      }
      #slider{
        margin-top: 8%;
        width: 95%;
      }
      .page{
        margin-left: 48%;
        span, em{
          font-size: 2.7vw;
        }
      }
      
    }
    .memoImg{
        padding: 5%;
        width: 15%;
        height: 15%;
        margin-top: 40%;
        margin-left: 1%;
        img{
          width: 100%;
          height: 100%;
        }
    }
  }
`;

const VerticalText = styled.div`
  position: absolute;
  writing-mode: vertical-rl; /* Sets the text to be written vertically from right to left */
  text-orientation: upright; /* Keeps each character upright */
  top: 8px; /* Adjust as needed */
  left: 9%; /* Adjust as needed */
  font-size: 3vw;
  color: white;
`;

// .bigContents {
//   border: 1px solid darkblue;
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   .contents {
//     width: 70%;
//     margin-left: 16px;

//     #slider {
//       margin-top: 5px;
//     }
//   }
// }
// .memoImg {
//   border: 1px solid forestgreen;
//   display: flex;
//   justify-content: end;
//   img {
//     width: 100%;
//     margin-bottom: 5px;
//   }
// }
