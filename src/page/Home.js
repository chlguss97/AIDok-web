import userImg from "../assets/user.png";
import styled from "styled-components";
import HomeBookItem from "../components/HomeBookItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CircleBook from "../components/CircleBook";
import CircleBook2 from "../components/CircleBook2";
import React, {useRef} from "react";

const Home = () => {

  const sliderRef = useRef(null);
  const centerSlideIndexRef = useRef(null);

  
  const handleAfterChange = (currentSlide) => {
    if (sliderRef.current) {
      const centerSlideIndex = Math.floor(sliderRef.current.props.slidesToShow / 2);
      centerSlideIndexRef.current = currentSlide === centerSlideIndex ? currentSlide : null;
    }
  };


  const homeBookItemSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1, // 한번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한번에 보여줄 슬라이드 개수
    centerMode: true
  };
  const circleBookItemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 한번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한번에 보여줄 슬라이드 개수
    afterChange: handleAfterChange,
   
  };


 

  return (
    <Container>
      <div className="headers">
        <img src={userImg} alt="user"></img>
        <span>검색 입력박스 컴포넌트 추가</span>
      </div>

      <BookCardStyledSlider {...homeBookItemSettings}>
        <HomeBookItem onClick={()=>alert("홈북아이템")}/>
        <HomeBookItem />
        <HomeBookItem />
        <HomeBookItem />
      </BookCardStyledSlider>

      <div className="wantbook">
        <p id="wantbook">읽고 싶은 책</p>
        <CircleBookStyledSlider ref={sliderRef} {...circleBookItemSettings} >
          <CircleBook onClick={()=>alert("써클북")}/>
          <CircleBook/>
          <CircleBook/>
          <CircleBook/>
    
        </CircleBookStyledSlider>
      </div>

      <div className="endbook">
        <p id="endbook">다 읽은 책</p>
        <CircleBookStyledSlider {...circleBookItemSettings}>
          <CircleBook2 />
          <CircleBook2 />
          <CircleBook2 />
          <CircleBook2 />
        </CircleBookStyledSlider>
      </div>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  padding: 5%;
  .headers {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10%;

    img {
      width: 10%;
      margin-right: 6%;
    }
    span {
      border: 1px solid black;
      flex-grow: 1;
    }
  }
  #wantbook {
    margin-top: 15%;
    color: #6f4e37;
    font-weight: bold;
  }
  #endbook {
    margin-top: 15%;
    color: #5e7e71;
    font-weight: bold;
  }
`;

const BookCardStyledSlider = styled(Slider)`
  width: 100%;

  .slick-slide {
    position: relative;
   
    width: 100%;
  }

  .slick-dots li button:before {
    margin-top: 10px;
    font-size: 12px; /* 도트의 크기를 조정할 수 있습니다. */
    color: #e8b897; /* 도트의 색상을 변경할 수 있습니다. */
  }

  .slick-dots li.slick-active button:before {
    color: #6f4e37; /* 활성화된 도트의 색상을 변경할 수 있습니다. */
    margin-top: 10px;
    font-size: 17px;
  }

 
`;

const CircleBookStyledSlider = styled(Slider)`
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.5s linear; /* 부드러운 확대/축소를 위한 transition 효과 추가 */
  }

  .slick-dots li button:before {
    margin-top: 10px;
    font-size: 12px; /* 도트의 크기를 조정할 수 있습니다. */
    color: #e8b897; /* 도트의 색상을 변경할 수 있습니다. */
  }

  .slick-dots li.slick-active button:before {
    color: #6f4e37;
    margin-top: 10px;
    font-size: 20px;
  }

  .slick-slide.slick-active .slick-slide-inner {
    ${({ centerSlideIndex }) =>
      centerSlideIndex === null
        ? "transform: scale(1);"
        : "transform: scale(1.9);"
    }
  }

   // Slider 컴포넌트에 onClick 이벤트가 전달되도록 설정
  // 클릭 이벤트가 제대로 전달되지 않을 경우 onClick 이벤트를 전파해야 할 수 있습니다.
  .slick-slide div {
    pointer-events: auto;
  }
`;
