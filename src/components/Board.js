import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeart, FaRegHeart, FaRegCommentDots, FaEllipsisV, FaPen } from 'react-icons/fa';

const BoardContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PostContainer = styled.div`
  border: 1px solid #ccc;
  margin: 20px 0;
  border-radius: 6px;
  padding: 5px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  position: relative;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0.5rem 10px;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.src});
  object-fit: cover;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }
`;

const Username = styled.span`
  font-weight: bold;
  margin-left: 0.5rem;
  font-size: 1.3rem;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const PostImage = styled.img`
  width: 90%;
  height: auto;
  display: block;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const PostContent = styled.div`
  padding: 10px;
  margin: 0 0.5rem;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    padding: 5px;
    font-size: 0.9em;
  }
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.5rem;
  padding: 10px;
  font-size: 1.5rem;
  color: #555;

  @media (max-width: 768px) {
    padding: 5px;
    font-size: 1.1rem;
  }
`;

const PostFooterIcons = styled.div`
  display: flex;
  align-items: center;
`;

const IconText = styled.span`
  margin: 0 0.4rem 0.5rem;
  user-select: none; 
  cursor: default;   

  @media (max-width: 768px){
    margin: 0 0.3rem 0.3rem;
  }
`;

const OptionsIcon = styled(FaEllipsisV)`
  cursor: pointer;
  font-size: 1.5rem;
  margin-top: 0.8rem;
  margin-right: 1rem;

  @media (max-width: 768px){
    font-size: 1rem;
    margin-top: 3px;
    margin-right: 0.2rem;
  }
`;

const CommentIconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FloatingButton = styled.button`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 60px;
  right: 60px;
  background-color: #5E7E71;
  color: #FFF;
  border: none;
  border-radius: 50%;
  box-shadow: 2px 2px 3px #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 40px;
    right: 20px;
    font-size: 20px;
  }

  @media (min-width: 768px) {
    width: 70px;
    height: 70px;
    right: 100px;
    font-size: 30px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: ${props => (props.show ? 'block' : 'none')};
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #f0f0f0;
  }
`;

const Board = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: '대한',
      profileImage: 'https://images.ddengle.com/files/attach/images/11334861/189/465/015/4b9097d5699b7fa4b153b1dd8d97814c.jpeg',
      content: '집에 가고 싶다..',
      postImage: 'https://jjal.today/data/file/gallery/1028612757_NCiaYZQs_77b66db361dba5c22df56f4cb7da21a078a2539f.jpeg',
      likes: 0,
      comments: 2,
      liked: false,
    }
  ]);

  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/write');
  };

  const handleViewComments = () => {
    navigate('/comments');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEdit = () => {
    navigate('/write');
  };

  const handleDelete = () => {
    // Add your delete logic here
    console.log('Delete post');
  };

  const handleLikeToggle = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
      )
    );
  };

  return (
    <BoardContainer>
      {posts.map(post => (
        <PostContainer key={post.id}>
          <PostHeader>
            <HeaderLeft>
              <Avatar style={{ backgroundImage: `url(${post.profileImage})` }} />
              <Username>{post.username}</Username>
            </HeaderLeft>
            <div style={{ position: 'relative' }}>
              <OptionsIcon onClick={toggleDropdown} />
              <DropdownMenu show={showDropdown}>
                <DropdownItem onClick={handleEdit}><span>수정</span></DropdownItem>
                <DropdownItem onClick={handleDelete}><span>삭제</span></DropdownItem>
              </DropdownMenu>
            </div>
          </PostHeader>
          <PostImage src={post.postImage} alt="post" />
          <PostContent>
            <p>{post.content}</p>
          </PostContent>
          <PostFooter>
            <PostFooterIcons>
              {post.liked ? (
                <FaHeart color="red" onClick={() => handleLikeToggle(post.id)} />
              ) : (
                <FaRegHeart onClick={() => handleLikeToggle(post.id)} />
              )}
              <IconText>{post.likes} Likes</IconText>
              <CommentIconWrapper onClick={handleViewComments}>
                <FaRegCommentDots style={{ marginLeft: '10px' }} />
                <IconText>{post.comments} Comments</IconText>
              </CommentIconWrapper>
            </PostFooterIcons>
          </PostFooter>
        </PostContainer>
      ))}
      <FloatingButton onClick={handleCreatePost}>
        <FaPen />
      </FloatingButton>
    </BoardContainer>
  );
};

export default Board;
