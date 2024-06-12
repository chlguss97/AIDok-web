import styled from 'styled-components'
import { FaPlusCircle } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import AiList from '../components/AiList';

const Ai= ()=>{
    return(
        <div style={{width:'100%', height:'100%'}}>
            <form style={{position:'relative', textAlign:'center', width:"80%", margin:"2rem auto 2rem auto"}}>
                <Search type="search" placeholder='AI 검색'></Search><LuSearch style={{position:'absolute', top:10, right:10, color:'white', fontSize:'1.5rem'}}/>
            </form>
            <div style={{textAlign:'center'}}>
                <img alt='seleted book' style={{display:'inline-block'}}></img>
            </div>
            <Container>
                <p className='date'>작성일자: 2024/05/01</p>
                <AiList></AiList>
            </Container>
            <FaPlusCircle style={{
                width: 50,
                height: 50,
                backgroundColor:'white', 
                color:'#5E7E71',
                position: 'fixed',
                bottom: '100px',
                right: '15px'
                }}/>
        </div>
    )
}

export default Ai

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

const Container= styled.div`
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