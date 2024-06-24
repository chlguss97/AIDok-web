import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import searchIcon from '../assets/searchicon.png'; // 검색 아이콘 이미지를 가져옵니다.
import backIcon from '../assets/backicon.png'; // 뒤로가기 아이콘 이미지를 가져옵니다.
import SearchBar from '../components/SearchBar'; // 새로 만든 SearchBar 컴포넌트를 가져옵니다.
import BackBtn from '../components/BackBtn';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';

const Container = styled.div`
  padding-top: 8%;
  padding-bottom: 35%;
  padding-left: 8%;
  padding-right: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 12%;
  right: 6%;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #5E7E71;
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  z-index: 1000;
`;

const NoteContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  width: 93%;
  max-width: 600px;
  display: flex;
  align-items: center;
`;

const NoteImage = styled.img`
  width: 50px;
  height: 75px;
  margin-right: 10px;
  border-radius: 5px;
`;

const NoteContentContainer = styled.div`
  flex: 1;
`;

const NoteTitle = styled.h2`
  margin: 0;
  font-size: 1.2em;
`;

const NoteContent = styled.p`
  margin: 0.5em 0;
`;

const NoteDate = styled.p`
  margin: 0;
  color: gray;
  font-size: 0.8em;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 0;
  img {
    width: 20px;
    height: 20px;
  }
`;



const Note = ({item}) => (
  
  <NoteContainer>
    <NoteImage src={item.bookImgUrl} alt="Book Cover" />
    <NoteContentContainer>
      <NoteTitle>{item.title}</NoteTitle>
      <NoteContent>{item.noteText}</NoteContent>
      {/* <NoteDate>{item.date}</NoteDate> */}
    </NoteContentContainer>
  </NoteContainer>
);

const NoteList = ({ notes }) => (
  <div id="notesContainer">

    <div>
      {notes.length > 0 ? (
          notes.map((filteredNotes, index) => (
              <Note key={index} item={filteredNotes} />
          ))
      ) : (
          <p>No notes available.</p>
      )}
    </div>

  </div>

);

const NotePage = () => {

  const user = useSelector((state) => state.userA.userAccount);

  const [note, setNotes] = useState({});  // 객체(초기값 빈 객체)
  const [filteredNotes, setFilteredNotes] = useState([]); // 배열(초기값 빈 배열)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const noteDocRef = doc(db, 'note', user.userId); // 'note' 컬렉션의 id 문서 참조
            const booksCollectionRef = collection(noteDocRef, 'books'); // 'books' 서브컬렉션 참조
            const querySnapshot = await getDocs(booksCollectionRef); // 참조의 모든 문서 가져오기
            const data = {};

            // 각 문서의 books 서브컬렉션을 반복
            querySnapshot.forEach(doc => {
                data[doc.id] = doc.data();
            });

            setNotes(data);
            setFilteredNotes(Object.values(data).flat());
            console.log('Fetched AI Data:', data); // 데이터 확인용 console.log
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    fetchData();
}, [user]);

  // 검색바
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate(); // useNavigate 훅을 컴포넌트 내부에서 호출

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    const allNotes = Object.values(note).flat(); // notes 객체의 모든 값을 배열로 변환하고 평탄화
    const filtered = allNotes.filter(note =>
      (note.content && note.content.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      (note.title && note.title.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredNotes(filtered);
  };

  const handleCreatePost = () => {
    navigate('/WriteNote'); // navigate 함수를 사용하여 라우트 이동
  };

  const Title = styled.p`
    color: #6F4E37;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
  `;

  return (
    <Container>
      <TitleContainer>
        {/* <BackButton>
          <img src={backIcon} alt="Back" />
        </BackButton> */}
        <Title>노트</Title>
      </TitleContainer>
      <SearchBarWrapper>
        <SearchBar
          placeholder="노트 검색"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClick={handleSearchClick}
        />
      </SearchBarWrapper>
      <div className="note-details">
        {Object.keys(filteredNotes).length > 0 ? (
            <NoteList notes={filteredNotes} />
        ) : (
            <p>데이터를 로딩 중입니다...</p>
        )}
      </div>
      <FloatingButton onClick={handleCreatePost}>+</FloatingButton>
    </Container>
  );
};

export default NotePage;
