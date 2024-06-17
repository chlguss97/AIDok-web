import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import { PiArrowElbowRightUpBold } from 'react-icons/pi';

const Container = styled.div`
  padding-top: 8%;
  padding-left: 8%;
  padding-right: 8%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-bottom: 10px;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Title = styled.h2`
  color: #6F4E37;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;
  
`;

const CommentList = styled.div`
  //margin-top: 10px;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #5E7E71;
  background-color: #6F4E37;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.src});
  margin-right: 10px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 70px);
`;

const Username = styled.span`
  font-weight: bold;
`;

const Date = styled.span`
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 5px;
`;

const Text = styled.p`
  margin: 0;
  word-wrap: break-word;
`;

const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 10px;
  width: calc(100% - 40px);
  background-color: white;
  max-width: 560px;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 5px;
`;

const CommentInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
  box-sizing: border-box;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 8px;
    margin-right: 5px;
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const BoardComment = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      username: '이재용',
      profileImage: 'https://cdn.dailycc.net/news/photo/202312/765910_670599_189.png',
      date: '2024년 6월 10일 20시 37분',
      text: '집에 가라고...',
    },
    {
      id: 2,
      username: '오우',
      profileImage: 'https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/To1/image/ejOA9PFhzaJ0As9W77yqWnKSh0k.jpg',
      date: '2024년 6월 16일 10시 20분',
      text: '나와',
    },
    
  ]);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  

  return (
    <Container>
      
      <Header>
        <BackButton onClick={handleBackClick}>
          <FaArrowLeft />
        </BackButton>
        <Title>comments</Title>
      </Header>
      <CommentList>
        {comments.map(comment => (
          <CommentContainer key={comment.id}>
            <Avatar src={comment.profileImage} />
            <CommentContent>
              <Username>{comment.username}</Username>
              <Date>{comment.date}</Date>
              <Text>{comment.text}</Text>
            </CommentContent>
          </CommentContainer>
        ))}
      </CommentList>
      <CommentInputContainer>
        <Avatar src="https://images.ddengle.com/files/attach/images/11334861/189/465/015/4b9097d5699b7fa4b153b1dd8d97814c.jpeg" />
        <CommentInput placeholder="댓글 추가..." />
        <SendButton>
          <PiArrowElbowRightUpBold />
        </SendButton>
      </CommentInputContainer>
    </Container>
  );
};

export default BoardComment;
