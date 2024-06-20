import styled from 'styled-components'
import AiList from '../components/AiList';
import BookSlick from '../components/BookSlick';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs } from "firebase/firestore"; 
import { db } from '../components/firebaseConfig';


let id= "test"
let isbn= '9788963717562'
let date= '20240620'

const fetchSubcollections = async (docRef) => {
    const subcollections = [];
    const collectionsSnapshot = await getDocs(collection(db, docRef.id));
  
    for (const subcollection of collectionsSnapshot.docs) {
      const subcollectionPath = `${docRef.path}/${subcollection.id}`;
      const subcollectionRef = collection(db, subcollectionPath);
      const subcollectionSnapshot = await getDocs(subcollectionRef);
  
      for (const doc of subcollectionSnapshot.docs) {
        if (doc.exists()) {
          subcollections.push({
            id: doc.id,
            ...doc.data()
          });
  
          const nestedSubcollections = await fetchSubcollections(doc.ref);
          subcollections.push(...nestedSubcollections);
        }
      }
    }
  
    return subcollections;
  };
  
  const fetchData = async () => {
    const docRef = doc(db, 'bert', id);
  
    try {
      const docSnap = await getDoc(docRef);
      let data = [];
  
      if (docSnap.exists()) {
        data.push({ id: docSnap.id, ...docSnap.data() });
  
        const subcollections = await fetchSubcollections(docRef);
        data.push(...subcollections);
      } else {
        console.log('No such document!');
      }
  
      return data;
    } catch (error) {
      console.error('Error fetching document:', error);
      return null;
    }
  };



const Ai= ()=>{

    const [aiData, setAiData]= useState([])

    id= "test"

    // const fetchData = async () => {
    //     const docRef = doc(db, 'bert', id);
      
    //     const fetchSubcollections = async (docRef) => {
    //       const collectionsSnapshot = await getDocs(collection(docRef));
    //       const data = [];
      
    //       for (const subcollection of collectionsSnapshot.docs) {
    //         const subDocRef = doc(docRef, subcollection.id);
    //         const subDocSnap = await getDoc(subDocRef);
    //         if (subDocSnap.exists()) {
    //           data.push({
    //             id: subcollection.id,
    //             ...subDocSnap.data()
    //           });
      
    //           const subcollections = await fetchSubcollections(subDocRef);
    //           data.push(...subcollections);
    //         }
    //       }
      
    //       return data;
    //     };
      
    //     try {
    //       const docSnap = await getDoc(docRef);
    //       let data = [];
      
    //       if (docSnap.exists()) {
    //         data.push({ id: docSnap.id, ...docSnap.data() });
      
    //         const subcollections = await fetchSubcollections(docRef);
    //         data.push(...subcollections);
    //       } else {
    //         console.log('No such document!');
    //       }
      
    //       return data;
    //     } catch (error) {
    //       console.error('Error fetching document:', error);
    //       return null;
    //     }
    //   };


    // // 특정 date 문서의 모든 필드값을 가져오는 함수
    // const fetchData = async () => {
    //     try {
    //       // Firestore에서 데이터 가져오기
    //       const docRef = doc(db, 'bert', id, isbn, date);
    //       const docSnap = await getDoc(docRef);
    
    //       if (docSnap.exists()) {
    //         const data = docSnap.data();
    //         alert(`Data: ${JSON.stringify(data, null, 2)}`);
    //         console.log(data)
    //         setAiData(data)

    //       } else {
    //         console.log("No such document!");
    //       }
    //     } catch (error) {
    //       console.error("Error fetching document: ", error);
    //     }
    // };

    useEffect(() => {
        const getData = async () => {
          const data = await fetchData(id);
          setAiData(data);
          console.log('Fetched AI Data:', data); // 데이터 확인용 console.log
        };
    
        getData();
      }, [id]);

    const [searchTerm, setSearchTerm]= useState('') 

    const search= ()=>{
        alert(searchTerm + "을/를 검색합니다")
    }

    const navigate= useNavigate()

    const addQnA= ()=>{
        alert("QnA를 추가합니다")
        navigate("../WriteAi")
    }
    

    return(
        <Container>
            <Title >AI 독서 학습</Title>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onClick={search} placeholder="검색어를 입력하세요"></SearchBar>

            <div style={{textAlign:'center'}}>
                <BookSlick></BookSlick>
            </div>
            <>
                {aiData ? <AiList data={aiData}></AiList> : <p>loading</p>}
                {/* {items.slice().reverse().map(()=>{
                    return <AiList key={props.no} date={props.date} text={props.text} q={props.q} a={props.a}></AiList>
                })} */}
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
    
