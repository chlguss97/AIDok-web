import userBasicImg from "../assets/user.png";
import styled from "styled-components";
import HomeBookItem from "../components/HomeBookItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CircleBook from "../components/CircleBook";
import CircleBook2 from "../components/CircleBook2";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAccount } from "../redux/account";
import searchIcon from "../assets/searchicon.png";
// 알라딘 ttb api 키: ttbbaechu100402002
//정보나루 서비스키: c3a39d682934e71b3876a8ef03f04a3504b289273cd616beef7ef385b7733334

const Home = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const centerSlideIndexRef = useRef(null);
  const user = useSelector((state) => state.userA.userAccount);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // 앱에서 사용자가 로그인하면 앱에서 웹으로 함수넘겨준거 받기
    window.sendToWeb = function (route, userId, userProfileImg) {
      // console.log("유즈셀렉터.."+userAccount.userId)
      dispatch(setUserAccount(userId, userProfileImg));

      if (route !== "/") {
        navigate(route);
      }
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    console.log("updated user:  ", user);
  }, [user]);

  // useEffect(() => {
  //   if (userInfo.img && imgRef.current) {
  //     imgRef.current.src = userInfo.img;
  //   }
  // }, [userInfo]);

  

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

  const handelImageClick = () => {
    // window 객체에 AndroidInterface가 존재하고, 그 안에 openDrawer라는 함수가 있는지 확인.
    if (
      window.AndroidInterface &&
      typeof window.AndroidInterface.openDrawer === "function"
    ) {
      window.AndroidInterface.openDrawer();
    }
  };

  const inputImgClick = () => {
    if(searchTerm.trim() !== "") {
      navigate('/List', {state:{query:searchTerm}})
   
    }
    alert(searchTerm);

  };


  return (
    <div>
      <TitleContainer>
        <img
          src={user.userImg || userBasicImg}
          alt="user"
          className="user"
          onClick={handelImageClick}
        />
        <Title>홈 화면 {user.userId}</Title>
      </TitleContainer>
      <Container>
        <SearchBarContainer>
          <SearchInputWrapper>
            <SearchInput
              placeholder="책 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton onClick={inputImgClick}>
              <Icon src={searchIcon} alt="Search Icon" />
            </SearchButton>
          </SearchInputWrapper>
        </SearchBarContainer>

        <BookCardStyledSlider {...homeBookItemSettings}>

          <HomeBookItem />
          <HomeBookItem />
          <HomeBookItem />
          <HomeBookItem />
        </BookCardStyledSlider>

        <div className="wantbook">
          <p id="wantbook" style={{ paddingLeft: "5%" }}>
            읽고 싶은 책
          </p>
          <CircleBookStyledSlider ref={sliderRef} {...circleBookItemSettings}>
            <CircleBook onClick={() => alert("써클북")} />
            <CircleBook />
            <CircleBook />
            <CircleBook />
          </CircleBookStyledSlider>
        </div>

        <div className="endbook">
          <p id="endbook" style={{ paddingLeft: "7%" }}>
            다 읽은 책
          </p>
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
      centerSlideIndex === null
        ? "transform: scale(1);"
        : "transform: scale(1.9);"}
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
    border: 3px solid #6f4e37;
    border-radius: 100%;
    position: absolute;
    left: 10px;
    width: 38px;
    height: 38px;
    margin-right: 10px;
  }
`;

const Title = styled.p`
  color: #6f4e37;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
`;


const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10%;


  border: 1px solid #5e7e71;
  border-radius: 20px;
  padding: 10px 10px;
  background-color: #6f4e37;
  width: 100%;
  max-width: 240px; /* 최대 너비를 240px로 제한 */
  margin: 0 auto 70px auto;

  &:focus-within {
    background-color: #5e7e71; /* 초록색으로 변경 */
  }
`;
const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  border: none;
  font-size: 16px;
  outline: none;
  width: 100%;
  padding-left: 30px; /* 이미지 공간 확보 */
  background: none;
  color: white;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 86%;
  top: 50%;
  transform: translateY(-50%);
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;

`;


const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #5e7e71;
  border-radius: 20px;
  padding: 10px 10px;
  background-color: #6f4e37;
  width: 100%;
  max-width: 240px; /* 최대 너비를 240px로 제한 */
  margin: 0 auto 70px auto;

  &:focus-within {
    background-color: #5e7e71; /* 초록색으로 변경 */
  }
`;