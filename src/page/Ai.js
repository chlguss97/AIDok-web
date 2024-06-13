import styled from 'styled-components'
import { FaPlusCircle } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import AiList from '../components/AiList';
import BookSlick from '../components/BookSlick';
import SearchBar from '../components/SearchBar';

const items= [
    {no:1, date: "2024/5/1", text: "text1 ", q: "질문1", a: "질문1"},
    {no:2, date: "2024/5/8", text: "text2 ", q: "질문2", a: "질문2"},
    {no:3, date: "2024/5/30", text: "text3 ", q: "질문3", a: "질문3"}
]

const Ai= ()=>{

    const search= ()=>{
        alert("검색합니다")
    }

    const addQnA= ()=>{
        alert("QnA를 추가합니다")
    }

    return(
        <Container>

            <SearchBar></SearchBar>
            <BookSlick></BookSlick>


            {/* <form style={{position:'relative', textAlign:'center', width:"80%", margin:"2rem auto 2rem auto"}}>
                <Search type="search" placeholder='AI 검색'></Search><LuSearch style={{position:'absolute', top:10, right:10, color:'white', fontSize:'1.5rem'}}/>
            </form> */}
            
            <div style={{textAlign:'center'}}>
                
                {/* <img alt='seleted book' style={{display:'inline-block'}}></img> */}
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5%;
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
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #5E7E71;
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  z-index: 1000;
`