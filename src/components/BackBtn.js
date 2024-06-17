import backicon from '../assets/backicon.png'
import styled from 'styled-components'

const BackBtn= ()=>{

        
        



    return(
        <BackContainer>

            <BackIcon src={backicon}></BackIcon>
        </BackContainer>

    )
}

const BackIcon= styled.img`
width: 20px;
height: 20px;
display: flex;
`

const BackContainer = styled.div`
width: 100%;
display: flex;
justify-content: start;





`

export default BackBtn