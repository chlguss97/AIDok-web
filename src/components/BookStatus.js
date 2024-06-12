import styled from "styled-components"

const BookStatus= (props)=>{
    return(
        <div style={{textAlign:"center"}}>
            <Status>
                <p>{props.value}</p>
            </Status>
        </div>
    )
}

// export default BookStatus

const Status= styled.div`
    display: inline-block;
    width: 120px;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background-color: #FFFAED;
    border: 2px dashed #6F4E37;
    border-radius: 5px;
    /* color: ${(props)=>props.color}; */
    color: #6F4E37;
    font-size: 14px;
    font-weight: bold;
    vertical-align: center;

    >p{
        padding: 0;
        margin: 0;
    }
`