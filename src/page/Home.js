import userBasicImg from "../assets/user.png";
import pageBackground from "../assets/page.gif";
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
import { db } from "../firebase/firebase"; // firebase.js에서 db를 가져옴
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  where,
  query,
} from "firebase/firestore";
// 알라딘 ttb api 키: ttbbaechu100402002
//정보나루 서비스키: c3a39d682934e71b3876a8ef03f04a3504b289273cd616beef7ef385b7733334
//우리팀 서버경로 : https://13.125.105.124/

const Home = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const centerSlideIndexRef = useRef(null);
  const user = useSelector((state) => state.userA.userAccount);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [wantBooks, setWantBooks] = useState([{},{},{}]);
  const [ingBooks, setIngBooks] = useState([{}]);
  const [endBooks, setEndBooks] = useState([{},{},{}]);
  
  //실행순서 : 
  //1.가져온거eee
  //2.가져온거eee, 디스패치한거  //처음엔 디스패치가안됐다. 비동기라
  //3.트라이안에서유저:eee //이때는 디스패치됬다.
  //4.가져온거:eee
  //5.가져온거:eee, 디스패치한거:eee //두번쨰는 디스패치가 잘됬다.
  

  window.sendToWeb = function (route, userId, userProfileImg) {
    // alert(`가져온거:${userId}`);
    // console.log("유즈셀렉터.."+userAccount.userId)
    dispatch(setUserAccount(userId, userProfileImg));
    if (route !== "/") {
      navigate(route);
    }
    // alert(`가져온거:${userId}, 디스패치한거:${user.userId}`);
  };

  useEffect(() => {
    

    // 사용자 책의 상태값 보여주기
    const checkUserDocumentExists = async () => {
      try {
        const docRef = doc(db, "user", user.userId); //도큐먼트(유저아이디)
        // alert("트라이안에서유저:" + user.userId);
        const subColRef = collection(docRef, "book"); //서브컬렉션book찾아오기
        console.log(`docRef:` + docRef + ` ,  subColRef = ${subColRef}`);

        //======state : want인 서브도큐먼트 찾기==================================
        const wantStateQuery = query(subColRef, where("state", "==", "want")); //조건!!!!
        const wantQuerySnapshot = await getDocs(wantStateQuery); //서브컬렉션안에 조건에맞는 서브도큐먼트 찾아와
        if (!wantQuerySnapshot.empty) {
          const wBooks = [];
          wantQuerySnapshot.forEach((doc) => {
            wBooks.push(doc.data());
          });
          setWantBooks(wBooks);
          console.log(`want북들~~~~: ${wantBooks}`); //setWantBooks기 비동기라 안나옴
        } else {
          console.log("도큐먼트가 존재하지 않습니다.");
        }

        //======state : ing인 서브도큐먼트 찾기================================
        const ingStateQuery = query(subColRef, where("state", "==", "ing")); //조건!!!!
        const ingQuerySnapshot = await getDocs(ingStateQuery); //서브컬렉션안에 조건에맞는 서브도큐먼트 찾아와
        if (!ingQuerySnapshot.empty) {
          const iBooks = [];
          ingQuerySnapshot.forEach((doc) => {
            iBooks.push(doc.data());
          });
          setIngBooks(iBooks);
          console.log(`ing북들~~~~: ${ingBooks}`);
        } else {
          console.log("도큐먼트가 존재하지 않습니다.");
        }

        //======state : end인 서브도큐먼트 찾기================================
        const endStateQuery = query(subColRef, where("state", "==", "end")); //조건!!!!
        const endQuerySnapshot = await getDocs(endStateQuery); //서브컬렉션안에 조건에맞는 서브도큐먼트 찾아와
        if (!endQuerySnapshot.empty) {
          const eBooks = [];
          endQuerySnapshot.forEach((doc) => {
            eBooks.push(doc.data());
          });
          setEndBooks(eBooks);
          console.log(`end북들~~~~: ${endBooks}`);
        } else {
          console.log("도큐먼트가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error("도큐먼트 존재 확인 중 오류 발생:", error);
      }
    };

    checkUserDocumentExists();
  }, [user.userId]);

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

  const wantBooksSettings = {
    dots: true,
    infinite: wantBooks.length > 3, // 슬라이드 개수가 3개 이상일 때만 무한 스크롤 활성화
    speed: 500,
    slidesToShow: Math.min(wantBooks.length, 3), // 슬라이드 개수가 3개 이상일 때만 3개 보여주기
    slidesToScroll: 1,
    afterChange: handleAfterChange,
  };

  const endBooksSettings = {
    dots: true,
    infinite: endBooks.length > 3, // 슬라이드 개수가 3개 이상일 때만 무한 스크롤 활성화
    speed: 500,
    slidesToShow: Math.min(endBooks.length, 3), // 슬라이드 개수가 3개 이상일 때만 3개 보여주기
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
    if (searchTerm.trim() !== "") {
      navigate("/List", { state: { query: searchTerm } });
    }
    // alert(searchTerm);
  };

  return (
    <div style={{marginLeft:"10px"}}>
      {/* <TitleContainer>
        
        <Title>홈 화면</Title>
      </TitleContainer> */}
      <Container>
        <SearchBarContainer>
        <img
          src={user.userImg || userBasicImg}
          alt="user"
          className="userImg"
          onClick={handelImageClick}
        />
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

        {/* 읽고 있는 책 */}
        <BookCardStyledSlider {...homeBookItemSettings}>
          {ingBooks.map((book, index, array) => {
            return <HomeBookItem key={index} book={book}></HomeBookItem>;
          })}
        </BookCardStyledSlider>

        <div className="wantbook">
          <p id="wantbook" style={{ paddingLeft: "5%" }}>
            읽고 싶은 책
          </p>
          <CircleBookStyledSlider ref={sliderRef} {...wantBooksSettings}>
            {wantBooks.map((book, index, array) => {
              return <CircleBook key={index} book={book}></CircleBook>;
            })}
          </CircleBookStyledSlider>
        </div>

        <div className="endbook">
          <p id="endbook" style={{ paddingLeft: "7%" }}>
            다 읽은 책
          </p>
          <CircleBookStyledSlider {...endBooksSettings}>
            {endBooks.map((book, index, array) => {
              return <CircleBook2 key={index} book={book}></CircleBook2>;
            })}
          </CircleBookStyledSlider>
        </div>
      </Container>
    </div>
  );
};

export default Home;

const Container = styled.div`
  /* 패딩래프트 유리가추가 */
  padding-top: 8%;
  padding-bottom: 20%;
  /* background-image: url(${pageBackground});
  background-size: cover; 이미지를 컨테이너에 맞게 cover로 설정 */

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
  margin-bottom: 50px;
  margin-left: 95px;

  &:focus-within {
    background-color: #5e7e71; /* 초록색으로 변경 */
  }
  .userImg {
    border: 3px solid #6f4e37;
    border-radius: 100%;
    position: absolute;
    left: 10px;
    width: 45px;
    height: 45px;
    margin-right: 20px;
    margin-left: 30px;
  }
`;
