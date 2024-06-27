import styled from "styled-components"

// Firebase에서 Timestamp를 JavaScript의 Date 객체로 변환
const convertTimestampToDate = (timestamp) => {
    return timestamp.toDate();
};

// 날짜를 원하는 형식으로 변환
const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    return formattedDate;
};

const AiItem= ({item})=>{

    const jsDate = convertTimestampToDate(item.date); // Timestamp를 JavaScript Date 객체로 변환
    const formattedDate = formatDate(jsDate); // 날짜 포맷팅

    return(
        <Content>
            <div>
                <p className='date'>작성일자: {formattedDate}</p>
                <p className='title'>{item.title}</p>
            </div>
            <ExtractedText>{item.passage}</ExtractedText>
                <QnA>
                    <p>Q: {item.question}</p>
                    <p>A: {item.answer}</p>
                </QnA>
        </Content>
    )
}

export default AiItem

const Content= styled.div`
    width: 93%;
    border: 2px solid #6F4E37;
    border-radius: 10px;
    background-color: #FFFAED;
    margin: 5% auto;

    .title{
        text-align: left;
        margin-left: 5%;
        font-size: 15px;
        font-weight: bold;
        color: #5F5C5C;
    }

    .date{
        text-align: right;
        margin-right: 5%;
        font-size: 12px;
        color: #5F5C5C;
    }
`

const ExtractedText= styled.div`
    background-color: #6F4E37;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    max-height: 5rem;
    margin: 5%;
    overflow: auto;
    margin-bottom: 1rem;
    font-size: 11px;
`

const QnA= styled.div`
    background-color: white;
    /* background-color: #5E7E71; */
    /* color: white; */
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
    margin: 5%;
    font-size: 14px;
    max-height: 5rem;
    overflow: auto;

    p{
        margin-top: 0;
    }
`