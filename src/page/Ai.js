import styled from 'styled-components'
import AiList from '../components/AiList';
import BookSlick from '../components/BookSlick';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDocs } from "firebase/firestore"; 
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import robot from '../assets/robot.gif'

const Ai = () => {
    const [aiData, setAiData] = useState({}); // 객체 데이터
    const [filteredAiData, setFilteredAiData] = useState(null); // 배열 데이터

    const [searchTerm, setSearchTerm] = useState(''); // 검색어

    const user = useSelector((state) => state.userA.userAccount);


    useEffect(() => {
        const fetchData = async () => {
            try {

                const bertDocRef = doc(db, 'bert', user.userId); // 'bert' 컬렉션의 id 문서 참조

                const booksCollectionRef = collection(bertDocRef, 'books'); // 'books' 서브컬렉션 참조
                const querySnapshot = await getDocs(booksCollectionRef); // 참조의 모든 문서 가져오기
                const data = {};

                // 각 문서의 books 서브컬렉션을 반복
                querySnapshot.forEach(doc => {
                    data[doc.id] = doc.data();
                });

                setAiData(data);
                setFilteredAiData(Object.values(data)); // 초기값 설정

                console.log('Fetched AI Data:', data); // 데이터 확인용 console.log
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);
    
    // 검색바
    const search = () => {
        // alert(searchTerm + "을/를 검색합니다")
        const filtered = Object.values(aiData).filter(item =>
            item.passage.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAiData(filtered);
    }

    // QnA 추가로 이동
    const navigate = useNavigate();
    const addQnA = () => {
        alert("QnA를 추가합니다");
        navigate("../WriteAi");
    }

    return (
        <Container>
            <Title>AI 독서 학습</Title>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onClick={search} placeholder="검색어를 입력하세요" />

            <div style={{ textAlign: 'center' }}>
                <BookSlick setFilteredAiData={setFilteredAiData}/>
            </div>

                {filteredAiData ? 
                <AiList data={filteredAiData}></AiList> : 
                <div><img src={robot} alt='loading' style={{width:'200px'}}/>
                <p style={{color:'#5E7E71'}}>AI가 질문을 기다리는 중입니다.</p></div> }

            <FloatingButton onClick={addQnA}>+</FloatingButton>
        </Container>
    )
}

export default Ai;

const Container= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 8%;
    padding-bottom: 35%;
    padding-left: 8%;
    padding-right: 8%;
`
const FloatingButton = styled.button`
    position: fixed;
    bottom: 10%;
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
`
const Title= styled.p`
    color: #6F4E37;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
    
    margin-bottom: 20%;`
