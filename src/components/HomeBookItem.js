import styled from "styled-components";
import book1 from "../assets/HomeBook1.png";
import memoImg from "../assets/memo2.png";
import ggalpi from "../assets/ggalpi2.png";
import { useState } from "react";

const HomeBookItem = ({onClick}) => {
  const totalPage = 300; //책의 전체페이지
  const currentPage = 103; //사용자가 현재 읽은 페이지

 

  return (
    <Container >
      <div className="card" onClick={onClick}>
        <img id="ggalpi" src={ggalpi} alt="책깔피사진"></img>
        <VerticalText>5일째</VerticalText>
        <div className="bigContents">
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
              <span style={{ color: "#6F4E37", fontWeight: "bold" }}>{currentPage}</span>
              <span>/</span>
              <span style={{ color: "#6F4E37" }}>{totalPage}</span>
              <em style={{ color: "#6F4E37", fontWeight: "bold" }}>p</em>
            </div>
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
  border: 2px solid #6f4e37;
  border-radius: 40px;
  padding-top: 30px;
  padding-left: 8px;
  padding-right: 28px;
  padding-bottom: 8px;
  background-color: #fffaed;
  width: 70%;
  position: relative;
  display: flex;
  flex-direction: row;

  #ggalpi {
    width: 30px;
    height: 80px;
    position: absolute;
    top: -3px;
    left: 87%;
  }

  .bookImg {
    width: 47%;
  }
  .bigContents {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .contents {
      width: 40%;
      margin-left: 16px;
      .writer {
        margin-top: 5px;
        margin-bottom: 5px;
      }
      #slider {
        width: 99%;
        margin-top: 5px;
      
      }
    }
  }
  .memoImg {
    display: flex;
    justify-content: end;
    img {
      width: 30px;
      margin-bottom: 5px;
    }
  }
`;

const VerticalText = styled.div`
  writing-mode: vertical-rl; /* Sets the text to be written vertically from right to left */
  text-orientation: upright; /* Keeps each character upright */
  position: absolute;
  top: 8px; /* Adjust as needed */
  right: 5%; /* Adjust as needed */
  font-size: 12px;
  color: white;
`;
