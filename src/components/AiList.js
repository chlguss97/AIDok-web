import styled from "styled-components"
import React, { useEffect, useState } from 'react';
import { getDoc, doc } from "firebase/firestore";
import { db } from './firebaseConfig';

const AiList= ({data})=>{
   
    return(
        <>
             <div>
                {data.map((item) => (
                    <div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.answer}</p>
                    <p>{item.bookImg}</p>
                    <p>{item.date && item.date.seconds ? new Date(item.date.seconds * 1000).toLocaleDateString() : ''}</p>
                    <p>{item.passage}</p>
                    <p>{item.question}</p>
                    </div>
                ))}
                </div>
            {/* {
                data.slice(0, 10).map((value, index, array)=>{
                    return <AiItem props={value} key={index}></AiItem>
                })
            } */}

            {/* <AiItem props={value}></AiItem> */}
        </>
    //     <Content>
    //         <p className='date'>작성일자: {data.date}</p>
    //         <ExtractedText>메시지 내용 추출된 텍스트: {data.passage}</ExtractedText>
    //             <QnA>
    //                 <p>Q: {data.question}</p>
    //                 <p>A: {data.answer}</p>
    //             </QnA>
    //     </Content>
    )
}

export default AiList

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
`