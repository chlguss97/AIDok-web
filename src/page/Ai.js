import styled from 'styled-components'
import { FaPlusCircle } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import AiList from '../components/AiList';
import BookSlick from '../components/BookSlick';
import SearchBar from '../components/SearchBar';

const Ai= ()=>{

    let today= new Date();
    let date = (today.getFullYear() + '/' + (today.getMonth()+1) + '/' + today.getDate()).toString()

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
            <Content>
                <p className='date'>작성일자: {date}</p>
                <AiList></AiList>
            </Content>
            <FloatingButton onClick={addQnA}>+</FloatingButton>
            {/* <FaPlusCircle onClick={addQnA} style={{
                width: 50,
                height: 50,
                backgroundColor:'white', 
                color:'#5E7E71',
                position: 'fixed',
                bottom: '100px',
                right: '15px',
                cursor: 'pointer'
                }}/> */}
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

const Content= styled.div`
    border: 2px solid #6F4E37;
    border-radius: 10px;
    background-color: #FFFAED;
    margin: 5%;

    .date{
        text-align: right;
        margin-right: 5%;
        font-size: 12px;
        color: #5F5C5C;
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