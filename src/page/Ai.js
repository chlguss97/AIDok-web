import styled from 'styled-components'
import { FaPlusCircle } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import AiList from '../components/AiList';
import BookSlick from '../components/BookSlick';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '../components/Toolbar';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";

// firebase 설정값
const firebaseConfig = {
    apiKey: "AIzaSyBGAzQiUPzTMbbgCmg0OWaqxD3r-bC26nA",
    authDomain: "ddokdok-33eef.firebaseapp.com",
    projectId: "ddokdok-33eef",
    storageBucket: "ddokdok-33eef.appspot.com",
    messagingSenderId: "15289053114",
    appId: "1:15289053114:web:93087956a86eb6ad6d7783",
    measurementId: "G-2N7RKZHZR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);




const items= [
    {no:1, date: "2024/5/1", text: "text1 ", q: "질문1", a: "질문1"},
    {no:2, date: "2024/5/8", text: "text2 ", q: "질문2", a: "질문2"},
    {no:3, date: "2024/5/30", text: "text3 ", q: "질문3", a: "질문3"}
]

const Ai= ()=>{

    const [searchTerm, setSearchTerm]= useState('') 

    const search= ()=>{
        alert(searchTerm + "을/를 검색합니다")
    }

    const navigate= useNavigate()

    const addQnA= ()=>{
        alert("QnA를 추가합니다")
        navigate("../WriteAi")
    }



    // Firestore에서 데이터 불러오기 함수
const fetchBertData = async () => {
    try {
      // bert 컬렉션의 모든 문서를 가져옵니다.
      const bertCollection = collection(db, 'bert');
      const bertSnapshot = await getDocs(bertCollection);
      
      bertSnapshot.forEach(async (doc) => {
        const bertData = doc.data();
        console.log(`Data for bert ID ${doc.id}:`, bertData);
        
        // id 컬렉션의 모든 문서를 가져옵니다.
        const idCollection = collection(db, `bert/${doc.id}/id`);
        const idSnapshot = await getDocs(idCollection);
        
        idSnapshot.forEach(async (idDoc) => {
          const idData = idDoc.data();
          console.log(`Data for id ${idDoc.id}:`, idData);
          
          // ISBN 컬렉션의 모든 문서를 가져옵니다.
          const isbnCollection = collection(db, `bert/${doc.id}/id/${idDoc.id}/ISBN`);
          const isbnSnapshot = await getDocs(isbnCollection);
          
          isbnSnapshot.forEach(async (isbnDoc) => {
            const isbnData = isbnDoc.data();
            console.log(`Data for ISBN ${isbnDoc.id}:`, isbnData);
            
            // date 컬렉션의 모든 문서를 가져옵니다.
            const dateCollection = collection(db, `bert/${doc.id}/id/${idDoc.id}/ISBN/${isbnDoc.id}/date`);
            const dateSnapshot = await getDocs(dateCollection);
            
            dateSnapshot.forEach((dateDoc) => {
              const dateData = dateDoc.data();
              console.log(`Data for date ${dateDoc.id}:`, dateData);
            });
          });
        });
      });
    } catch (error) {
      console.error("Error fetching Firestore data: ", error);
    }
};




    useEffect(()=>{
        fetchBertData()
    },[])
    

    return(
        <Container>
            <Title >AI 독서 학습</Title>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onClick={search} placeholder="검색어를 입력하세요"></SearchBar>

            <div style={{textAlign:'center'}}>
                <BookSlick></BookSlick>
            </div>
            <>
                {items.slice().reverse().map((props)=>{
                    return <AiList key={props.no} date={props.date} text={props.text} q={props.q} a={props.a}></AiList>
                })}
            </>
            <FloatingButton onClick={addQnA}>+</FloatingButton>
        </Container>
    )
}

export default Ai

const Container= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 8%;
    padding-bottom: 35%;
    padding-left: 8%;
    padding-right: 8%;
`

const Search= styled.input`
    text-align: center;
    border: none;
    background-color: #6F4E37;
    border-radius: 15px;
    height: 3rem;
    color: white;
    width: 100%;

    &::placeholder{
        color: white;
        font-size: 1.2rem;
    }
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
    
