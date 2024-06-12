import styled from "styled-components"

const Recommended= (props)=>{
    return(
        <div>
            <BookCover
                src={props.src}
                alt="recommend1"
                width={'100px'} 
                >
            </BookCover>
        </div>
    )
}

export default Recommended

const BookCover= styled.img`
    width: 70px;
    height: 100px;
    border: 1px solid #5E7E71;
    border-radius: 5px;
`
