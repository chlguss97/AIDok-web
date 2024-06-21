import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeart, FaRegHeart, FaCommentDots, FaEllipsisH, FaPen } from 'react-icons/fa';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';

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

const PostDate = styled.div`
  font-size: 0.8em;
  color: #999;
  margin-left: 1rem;
  margin-bottom: 10px;
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
  const [posts, setPosts] = useState([]);
  const [showDropdown, setShowDropdown] = useState({});
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userA.userAccount);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  const handleCreatePost = () => {
    navigate('/write');
  };

  const handleViewComments = (postId) => {
    navigate(`/board/${postId}/comments`);
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

  const handleLikeToggle = async (postId) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    );
    setPosts(updatedPosts);

    const post = updatedPosts.find(post => post.id === postId);
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, { likes: post.likes });
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
              <Avatar src={post.userimg} />
              <div>
                <Username>{post.id}</Username>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BookImage src={post.bookImg} />
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
          <PostImage src={post.img} alt="post" />
          <PostContent>
            <p>{post.writingContent}</p>
          </PostContent>
          <PostFooter>
            <PostFooterIcons>
              {post.liked ? (
                <FaHeart color="red" onClick={() => handleLikeToggle(post.id)} />
              ) : (
                <FaRegHeart onClick={() => handleLikeToggle(post.id)} />
              )}
              <IconText>{post.likes || 0} Likes</IconText>
              <CommentIconWrapper onClick={() => handleViewComments(post.id)}>
                <FaCommentDots style={{ marginLeft: '10px' }} />
                <IconText>{post.commentcount || 0} Comments</IconText>
              </CommentIconWrapper>
            </PostFooterIcons>
          </PostFooter>
          <PostDate>{new Date(post.date).toLocaleDateString()}</PostDate>
        </PostContainer>
      ))}
      <FloatingButton onClick={handleCreatePost}>
        <FaPen />
      </FloatingButton>
    </BoardContainer>
  );
};

export default Board;
