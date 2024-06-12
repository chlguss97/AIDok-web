import styled from "styled-components"

const SaveBtn= ({onClick, name})=>{
    return(
        <>
            <Btn onClick={()=>onClick()}>{name}</Btn>
        </>
    )
}

export default SaveBtn

const Btn= styled.button`
    background-color: #6F4E37;
    border: none;
    border-radius: 10px;
    color: white;
    width: 200px;
    height: 2.5rem;
    margin: 0 auto;
    font-size: 18px;
    font-weight: bold;
    
`