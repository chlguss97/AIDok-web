import styled from "styled-components";
// import BookStatus from "../components/BookStatus"
import SaveBtn from "../components/SaveBtn";
import { FaRegCalendarAlt } from "react-icons/fa";
import BackBtn from "../components/BackBtn";

const BookEdit = () => {
  const save = () => {
    alert("저장합니다");
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <BackBtn></BackBtn>
      <BookInfo>
        <div className="info">
          <img
            className="bookImg"
            src="https://image.aladin.co.kr/product/23972/99/cover/8963717569_1.jpg"
            alt="book cover"
          ></img>
          <div className="titleAuthor">
            <p>제목: 당신을 기다리고 있어</p>
            <p>저자: 김보영</p>
            <p>출판사: 새파란상상 (파란미디어)</p>
          </div>
        </div>
      </BookInfo>
      <StatusContainer>
        <BookStatus color="#6F4E37" $bgcolor="#FAECDC" $bordercolor="#6F4E37">
          읽고 싶은 책
        </BookStatus>
        <BookStatus color="white" $bgcolor="#6F4E37" $bordercolor="white">
          읽고 있는 책
        </BookStatus>
        <BookStatus color="white" $bgcolor="#5E7E71" $bordercolor="white">
          다 읽은 책
        </BookStatus>
        <BookStatus color="white" $bgcolor="#5F5C5C" $bordercolor="white">
          선택하지 않음
        </BookStatus>
      </StatusContainer>
      <Period>
        <HeadText>목표 기간</HeadText>
        <div className="startToEnd">
          <span>시작</span>
          <Date>2024.6.1.</Date>
          <FaRegCalendarAlt style={{ cursor: "pointer" }} />
          <span>~</span>
          <span>끝</span>
          <Date>2024.6.1.</Date>
          <FaRegCalendarAlt style={{ cursor: "pointer" }} />
        </div>
      </Period>
      <Target>
        <HeadText>페이지</HeadText>
        <div className="graph">
          <Bar>
            <Progress width="50%" />
          </Bar>
        </div>
        <div className="numbers">
          <Number $left="0%">0p</Number>
          <Number $left="50%">350p</Number>
          <Number $left="100%">700p</Number>
        </div>
        <EditBtn>수정</EditBtn>
        <div>
          <p className="note">
            <span className="nickname">배추껍질</span>님의 하루 적정 독서 페이지는{" "}
            <span className="point">100p</span>입니다.
          </p>
        </div>
      </Target>
      <Target style={{ marginBottom: "20px" }}>
        <HeadText>시간</HeadText>
        <div className="graph">
          <Bar>
            <Progress width="28.57%" />
          </Bar>
        </div>
        <div className="numbers">
          <Number $left="0%">0분</Number>
          <Number $left="28.57%">200분</Number>
          <Number $left="100%">700분</Number>
        </div>
        <EditBtn>수정</EditBtn>
        <div>
          <p className="note">
            <span className="nickname">배추껍질</span>님의 하루 적정 독서 시간은{" "}
            <span className="point">100분</span>입니다.
          </p>
        </div>
      </Target>
      <SaveBtn name="저장하기" onClick={save}></SaveBtn>
    </Container>
  );
};

export default BookEdit;

const BookInfo = styled.div`
  display: flex;
  justify-content: center;

  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
    height: 200px;
  }

  .bookImg {
    height: 150px;
    margin: 16px;
    border: 1px solid #6f4e37;
    border-radius: 5px;
  }

  .titleAuthor {
    height: 150px;
    margin-right: auto;
    text-align: start;

    > p {
      margin: 10px 0;
      color: #5F5C5C;
      font-size: 14px;
      font-weight: bold;
    }
  }
`;

const StatusContainer = styled.div`
  height: 100px;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const BookStatus = styled.div`
  display: inline-block;
  width: 100%;
  height: 2rem;
  padding: 2px;
  line-height: 2rem;
  text-align: center;
  border-radius: 5px;
  border: 2px dashed ${(props) => props.$bordercolor};
  color: ${(props) => props.color};
  background-color: ${(props) => props.$bgcolor};
  font-size: 14px;
  font-weight: bold;
  vertical-align: center;
  cursor: pointer;

  > p {
    padding: 0;
    margin: 0;
  }
`;

const Period = styled.div`
  .startToEnd {
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #6f4e37;
    margin: 0 auto;

    > span {
      font-size: 12px;
    }
  }
`;

const Target = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .graph {
    position: relative;
    width: 95%;
    text-align: end;
  }

  .numbers {
    height: auto;
    position: relative;
    width: 90%;
    padding: 0;
    margin: 0;
    margin-bottom: 5px;
  }

  .note {
    font-size: 12px;
    color: #5f5c5c;
    margin: 20px;

    .nickname {
      color: #5e7e71;
      font-weight: bold;
    }

    .point {
      color: #5e7e71;
      font-weight: bold;
    }
  }
`;

const Number = styled.span`
  font-size: 10px;
  position: absolute;
  left: ${(props) => props.$left};
  transform: translate(-50%);
  width: 35px;
`;

const Bar = styled.div`
  position: relative;
  width: 100%;
  height: 22.7px;
  background-color: #5e7e71;
`;

const Progress = styled.div`
  width: ${(props) => props.width};
  height: 20px;
  background-color: #6f4e37;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #5f5c5c;
`;

const HeadText = styled.p`
  color: #6f4e37;
  font-size: 14px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
`;

const EditBtn = styled.button`
  background-color: #6f4e37;
  border: none;
  border-radius: 2px;
  color: white;
  width: 50px;
  height: 1.5rem;
  font-size: 10px;
  cursor: pointer;
  z-index: 1;
  margin-top: 5%;
`;

const Container = styled.div`
  padding-top: 8%;
  padding-bottom: 35%;
  padding-left: 8%;
  padding-right: 8%;
`;

