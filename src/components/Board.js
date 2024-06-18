import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeart, FaRegHeart, FaCommentDots, FaEllipsisH, FaPen } from 'react-icons/fa';

const BoardContainer = styled.div`
  padding-top: 8%;
  padding-bottom: 35%;
  padding-left: 8%;
  padding-right: 8%;
  max-width: 600px;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  border: 2px solid #6F4E37;
  margin: 20px 0;
  border-radius: 6px;
  background-color: #FFFAED;
  padding: 5px;
  overflow: hidden;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  position: relative;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid #6F4E37;
  background-color: #ccc;
  margin-right: 10px;
  margin-top: 10px;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.src});
  aspect-ratio: 1 / 1;
  object-fit: cover;
  overflow: hidden; /* Ensure the image doesn't overflow the container */
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 1.0em;
`;

const BookTitle = styled.span`
  font-size: 0.9em;
  color: #6F4E37;
`;

const PostText = styled.span`
  font-size: 0.9em;
`;

const BookImage = styled.img`
  width: 30px;
  height: 40px;
  margin-top: 8px;
  margin-right: 10px;
  object-fit: cover;
  border: 1px solid #ccc;
`;

const PostImage = styled.img`
  width: 95%;
  height: auto;
  display: block;
  margin: 0 auto;
`;

const PostContent = styled.div`
  padding: 5px;
  margin: 0 0.5rem;
  font-size: 0.9em;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.5rem;
  padding: 5px;
  font-size: 1.1rem;
  color: #555;
`;

const PostFooterIcons = styled.div`
  display: flex;
  align-items: center;
`;

const IconText = styled.span`
  margin: 0 0.3rem 0.3rem;
  user-select: none;
  cursor: default;
`;

const OptionsIcon = styled(FaEllipsisH)`
  cursor: pointer;
  font-size: 1rem;
  margin-top: 3px;
  margin-right: 0.6rem;
`;

const CommentIconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #5E7E71;
  color: white;
  font-size: 20px;
  border: none;
  cursor: pointer;
  z-index: 1000;
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
  min-width: 100px;
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #F0F0F0;
  }
`;

const Title = styled.p`
  color: #6F4E37;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20%;
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
      bookTitle: '트렌드 코리아 2023',
      bookImage: 'https://image.yes24.com/goods/113416767/XL'
    },
    {
      id: 2,
      username: '노상진',
      profileImage: 'https://xen-api.linkareer.com/attachments/107214',
      content: '난 사실 아무 생각이 없어',
      postImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ux6b26C7E5tu4xKPTtRD9k6BIWWocpRlYw&s',
      likes: 0,
      comments: 2,
      liked: false,
      bookTitle: '트렌드 코리아 2024',
      bookImage: 'https://image.yes24.com/goods/122790776/XL'
    }
  ]);

  const [showDropdown, setShowDropdown] = useState({});
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate('/write');
  };
  const handleViewComments = () => {
    navigate('/comments');
  };
  const toggleDropdown = (postId) => {
    setShowDropdown(prevShowDropdown => ({
      ...prevShowDropdown,
      [postId]: !prevShowDropdown[postId]
    }));
  };
  const handleEdit = (postId) => {
    console.log('Edit post', postId);
    // Add your edit logic here
  };
  const handleDelete = (postId) => {
    console.log('Delete post', postId);
    // Add your delete logic here
  };
  const handleLikeToggle = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
      )
    );
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest('.options-icon')) {
      setShowDropdown({});
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <BoardContainer>
      <Title>커뮤니티</Title>
      {posts.map(post => (
        <PostContainer key={post.id}>
          <PostHeader>
            <HeaderLeft>
              <Avatar src={post.profileImage} />
              <div>
                <Username>{post.username}</Username>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BookImage src={post.bookImage} />
                  <div>
                    <BookTitle>{post.bookTitle}</BookTitle> <PostText>을(를) 공유했습니다.</PostText>
                  </div>
                </div>
              </div>
            </HeaderLeft>
            <div style={{ position: 'relative' }}>
              <OptionsIcon className="options-icon" onClick={() => toggleDropdown(post.id)} />
              <DropdownMenu ref={dropdownRef} show={showDropdown[post.id]}>
                <DropdownItem onClick={() => handleEdit(post.id)}><span>수정</span></DropdownItem>
                <DropdownItem onClick={() => handleDelete(post.id)}><span>삭제</span></DropdownItem>
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
                <FaCommentDots style={{ marginLeft: '10px' }} />
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
