import styled from "styled-components";
import bookImg from "../assets/book.png";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { useRef, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(0); // 초를 저장할 상태
  const [timerOn, setTimerOn] = useState(false); // 타이머 동작 여부를 저장할 상태
  const timerRef = useRef(null); // 타이머의 참조

    // 타이머 시작 함수
    const startTimer = () => {
      setTimerOn(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    };

     // 타이머 정지 함수
  const stopTimer = () => {
    setTimerOn(false);
    clearInterval(timerRef.current);
  };


    // 타이머 초기화 함수
    const resetTimer = () => {
      clearInterval(timerRef.current);
      setTime(0);
      setTimerOn(false);
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

  return (
    <Container>
      <StyledSlider {...settings}>
        <div>
          <img className="img" src={bookImg} alt="책 이미지" />
          <p>책 제목책 제목책 제목책 제목책 제목ㅍ책 제목책 제목책 제목책 제목책 제목</p>
        </div>
        <div>
          <img className="img" src={bookImg} alt="책 이미지" />
          <p>책 제목책 제목책 제목책 제목책 제목ㅍ책 제목책 제목책 제목책 제목책 제목</p>
        </div>
        <div>
          <img className="img" src={bookImg} alt="책 이미지" />
          <p>책 제목책 제목책 제목책 제목책 제목ㅍ책 제목책 제목책 제목책 제목책 제목</p>
        </div>
        <div>
          <img className="img" src={bookImg} alt="책 이미지" />
          <p>책 제목책 제목책 제목책 제목책 제목ㅍ책 제목책 제목책 제목책 제목책 제목</p>
        </div>
      </StyledSlider>
      <p className="time">{formatTime(time)}</p>

      {!timerOn ? (
        <button className="timer_button1" onClick={startTimer}>
          독서 타이머 시작
        </button>
      ) : (
        <>
          <button className="timer_button1" onClick={stopTimer}>
            타이머 정지
          </button>
          <button className="timer_button2" onClick={resetTimer}>
            초기화
          </button>
        </>
      )}


      <button className="timer_button3">저장하기</button>
    </Container>
  );
};

export default Timer;

const Container = styled.div`
  background-color: #5e7e71;
  text-align: center;
  padding: 20px;
  position: relative; /* 상대 위치 설정 */

  .time {
    font-size: 24px;
    margin: 70px auto 10px auto;
  }

  .timer_button1 {
    display: block;
    border-radius: 20px;
    margin: 30px  auto 10px auto;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #fff;
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


  .timer_button2 {
    display: block;
    border-radius: 20px;
    margin: 10px  auto 40px auto;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #fff;
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
    margin: 80px auto 60px auto;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #fff;
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
    width: 50%;
    height: auto;
    margin: 30px auto 12px auto;
  }

  .slick-dots {
    position: absolute;
    bottom: 300; /* 이미지 아래 위치 */
    width: 100%;
    text-align: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .slick-dots li {
    display: inline-block;
    margin: -50 5px;
  }

  .slick-dots li button {
    font-size: 12px;
    color: #fff;
    border: none;
    background: transparent;
    padding: 5px;
  }

  .slick-dots li.slick-active button {
    font-weight: bold;
  }

  .slick-prev,
  .slick-next {
    display: none !important;
  }
`;