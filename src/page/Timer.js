import styled from "styled-components";
import bookImg from "../assets/book.png";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

const Timer = () => {
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
        </div>
        <div>
          <img className="img" src={bookImg} alt="책 이미지" />
        </div>
        <div>
          <img className="img" src={bookImg} alt="책 이미지" />
        </div>
        <div>
          <img className="img" src={bookImg} alt="책 이미지" />
        </div>
      </StyledSlider>
      <p className="time">00 : 00 : 00</p>
      <button className="timer_button1">독서 타이머 시작</button>
      <button className="timer_button2">저장하기</button>
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

  .timer_button2 {
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
    margin: 30px auto;
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