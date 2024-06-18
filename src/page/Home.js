import userBasicImg from "../assets/user.png";
import styled from "styled-components";
import HomeBookItem from "../components/HomeBookItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CircleBook from "../components/CircleBook";
import CircleBook2 from "../components/CircleBook2";
import React, { useRef, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { setUserAccount } from "../redux/account";


const Home = () => {
  const navigate = useNavigate()
  const sliderRef = useRef(null);
  const centerSlideIndexRef = useRef(null);
  const user = useSelector((state) => state.userA.userAccount);
  const dispatch = useDispatch()
 
  useEffect(()=>{
    // 앱에서 사용자가 로그인하면 앱에서 웹으로 함수넘겨준거 받기
    window.sendToWeb = function(route, userId, userProfileImg){
      // console.log("유즈셀렉터.."+userAccount.userId)
      dispatch(setUserAccount(userId, userProfileImg))

      if(route!=="/"){
        navigate(route);
      }
    }
  },[dispatch, navigate])

  useEffect(()=>{
    console.log("updated user:  ", user)
  }, [user])



  // useEffect(() => {
  //   if (userInfo.img && imgRef.current) {
  //     imgRef.current.src = userInfo.img;
  //   }
  // }, [userInfo]);


  // useEffect(() => {
  //   // const query = '사랑'
  //   const url =
  //     "./backend/naver_search.php?query=" +
  //     information.query +
  //     "&display=" +
  //     100;
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((json) => setImages(json.items))
  //     .catch((e) => alert(e.message));
  // }, [information]);
  

  const handleAfterChange = (currentSlide) => {
    if (sliderRef.current) {
      const centerSlideIndex = Math.floor(
        sliderRef.current.props.slidesToShow / 2
      );
      centerSlideIndexRef.current =
        currentSlide === centerSlideIndex ? currentSlide : null;
    }
  };

  const homeBookItemSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const circleBookItemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: handleAfterChange,
  };

  const handelImageClick= ()=>{
      // window 객체에 AndroidInterface가 존재하고, 그 안에 openDrawer라는 함수가 있는지 확인.
    if (window.AndroidInterface && typeof window.AndroidInterface.openDrawer === 'function') {
      window.AndroidInterface.openDrawer();
    }
  }

  return (

    <div>
      <TitleContainer>

        <img src={user.userImg || userBasicImg} alt="user" className="user" onClick={handelImageClick} />
        <Title>홈 화면 {user.userId}</Title>
      </TitleContainer>
      <Container>
        <SearchBarWrapper><SearchBar placeholder="책 검색"></SearchBar></SearchBarWrapper>
        <BookCardStyledSlider {...homeBookItemSettings}>

          <HomeBookItem />
          <HomeBookItem />
          <HomeBookItem />
          <HomeBookItem />
        </BookCardStyledSlider>

        <div className="wantbook">
          <p id="wantbook" style={{ paddingLeft: "5%" }}>읽고 싶은 책</p>
          <CircleBookStyledSlider ref={sliderRef} {...circleBookItemSettings}>
            <CircleBook onClick={() => alert("써클북")} />
            <CircleBook />
            <CircleBook />
            <CircleBook />
          </CircleBookStyledSlider>
        </div>

        <div className="endbook">
          <p id="endbook" style={{ paddingLeft: "7%" }}>다 읽은 책</p>
          <CircleBookStyledSlider {...circleBookItemSettings}>
            <CircleBook2 />
            <CircleBook2 />
            <CircleBook2 />
            <CircleBook2 />
          </CircleBookStyledSlider>
        </div>
      </Container>
    </div>

  );
};

export default Home;

const Container = styled.div`
  padding-top: 8%;
  padding-bottom: 20%;

  .headers {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10%;

    .user {
      width: 10%;
      height: 10%;

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
  width: 130%;
  margin-left: -6%;

  .slick-slide {
    position: relative;
    width: 100%;
  }

  .slick-dots li button:before {
    margin-top: 10px;
    font-size: 12px;
    color: #e8b897;
    margin-left: -140%;
  }

  .slick-dots li.slick-active button:before {
    color: #6f4e37;
    margin-top: 10px;
    font-size: 17px;
  }
`;

const CircleBookStyledSlider = styled(Slider)`
  margin-bottom: 120px;
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.5s linear;
  }

  .slick-dots li button:before {
    margin-top: 10px;
    font-size: 12px;
    color: #e8b897;
  }

  .slick-dots li.slick-active button:before {
    color: #6f4e37;
    margin-top: 10px;
    font-size: 20px;
  }

  .slick-slide.slick-active .slick-slide-inner {
    ${({ centerSlideIndex }) =>
      centerSlideIndex === null ? "transform: scale(1);" : "transform: scale(1.9);"}
  }

  .slick-slide div {
    pointer-events: auto;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  .user {
    border: 3px solid #6F4E37;
    border-radius: 100%;
    position: absolute;
    left: 10px;
    width: 38px;
    height: 38px;
    margin-right: 10px;
  }
`;

const Title = styled.p`
  color: #6F4E37;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10%;

`;
