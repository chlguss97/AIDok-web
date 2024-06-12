import styled from 'styled-components'
import bookImg from '../assets/HomeBook1.png'


const CircleBook= ({onClick})=>{
    
    return(
      
        <Container>
        <div className='circle' onClick={onClick}>
            <img className='bookImg' src={bookImg} alt='책이미지' />
        </div>
   

    </Container>

     
    )
}
export default CircleBook

const Container = styled.div`
   
    .circle {
        border-radius: 50%;
        border: 2px solid #5E7E71;
        background-color: #6F4E37;
        width: 70px; /* 원의 너비와 높이 */
        height: 65px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden; /* 원형 밖으로 넘치는 이미지를 숨김 */
        margin: 10px;

        .bookImg {
            width: 62%;
            object-fit: cover; /* 이미지가 원형 내부를 채우도록 설정 */
        }
    }

    
`;