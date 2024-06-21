import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import backIcon from '../assets/backicon.png';
import { PiArrowElbowRightUpBold } from 'react-icons/pi';
import { db, Timestamp } from '../firebase/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';

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
  top: 20px;
  left: 0px;
  background: none;
  border: none;
  cursor: pointer;
  display: block;

  img {
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.h2`
  color: #6F4E37;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;
`;

const CommentList = styled.div`
  margin-top: 10px;
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
  width: calc(100% - 16%);
  background-color: white;
  max-width: 600px;
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
`;

const SendButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const BoardComment = () => {
  const { postId: paramsPostId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const user = useSelector((state) => state.userA.userAccount);
  const navigate = useNavigate();

  useEffect(() => {
    const postId = paramsPostId || localStorage.getItem('postId');
    console.log("Post ID from useParams:", paramsPostId);
    console.log("Post ID from localStorage:", postId);

    if (postId) {
      fetchComments(postId);
    }
  }, [paramsPostId]);

  const fetchComments = async (postId) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts', postId, 'comment'));
      const commentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(commentsData);
    } catch (e) {
      console.error("Error fetching comments: ", e);
    }
  };
  
  const handleCommentSubmit = async () => {
    if (!newComment) return;
  
    const postId = paramsPostId || localStorage.getItem('postId');
    if (!postId) {
      console.error("Post ID is missing");
      return;
    }
  
    try {
      await addDoc(collection(db, 'posts', postId, 'comment'), {
        id: user.userId,
        date: Timestamp.now(),
        comment: newComment,
        userimg: user.userImg
      });
      setNewComment('');
      fetchComments(postId);
    } catch (e) {
      console.error("Error adding comment: ", e);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackClick}>
          <img src={backIcon} alt="Back" />
        </BackButton>
        <Title>Comments</Title>
      </Header>
      <CommentList>
        {comments.map(comment => (
          <CommentContainer key={comment.id}>
            <Avatar src={comment.userimg} />
            <CommentContent>
              <Username>{comment.id}</Username>
              <Date>{comment.date ? comment.date.toDate().toLocaleString() : 'Loading...'}</Date>
              <Text>{comment.comment}</Text>
            </CommentContent>
          </CommentContainer>
        ))}
      </CommentList>
      <CommentInputContainer>
        <Avatar src={user.userImg} alt="user" />
        <CommentInput 
          placeholder="댓글 추가..." 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <SendButton onClick={handleCommentSubmit}>
          <PiArrowElbowRightUpBold />
        </SendButton>
      </CommentInputContainer>
    </Container>
  );
};

export default BoardComment;
