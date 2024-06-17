import styled from "styled-components";
import book1 from "../assets/HomeBook1.png";
import memoImg from "../assets/memo2.png";
import ggalpi from "../assets/tek.png";
import { useState } from "react";

const HomeBookItem = ({ onClick }) => {
  const totalPage = 300; //책의 전체페이지
  const currentPage = 103; //사용자가 현재 읽은 페이지

  return (
    <Container>
      <div className="bigContents" onClick={onClick}>
        <div className="ggalpiTotal">
          <img id="ggalpi" src={ggalpi} alt="책깔피사진"></img>
          <VerticalText>5일째</VerticalText>
        </div>

        <img className="bookImg" src={book1} alt="책사진"></img>
        <div className="contents">
          <div className="title">
            <span>제목 : </span>
            <span> 리액트 뿌시기 제 1권</span>
          </div>
          <div className="writer">
            <span>저자 : </span>
            <span>김종철</span>
          </div>
          <input
            id="slider"
            type="range"
            min="0"
            max={totalPage}
            value={currentPage}
            step="1"
          ></input>
          <div className="page">
            <span style={{ color: "#6F4E37", fontWeight: "bold" }}>
              {currentPage}
            </span>
            <span>/</span>
            <span style={{ color: "#6F4E37" }}>{totalPage}</span>
            <em style={{ color: "#6F4E37", fontWeight: "bold" }}>p</em>
          </div>
        </div>
        <div className="memoImg">
          <img src={memoImg} alt="메모사진"></img>
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
    padding: 2% 2%;
    background-color: #fffaed;
    width: 70%;
    position: relative;
    display: flex;
    flex-direction: row;

    .ggalpiTotal {
      width: 8%;
      position: relative;
      left: 85%;
      margin-top: -4%;

      #ggalpi {
        width: 100%;
        position: absolute;
        height: 50%;
        left: 1%;
      }
    }

    .bookImg {
      width: 40%;
      margin-right: 5%;
    }
    .contents {
      width: 60%;
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
        margin-left: 55%;
        span, em{
          font-size: 2.7vw;
        }
      }
      
    }
    .memoImg{
        width: 15%;
        height: 15%;
        margin-top: 25%;
        img{
          width: 85%;
          height: 80%;
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
