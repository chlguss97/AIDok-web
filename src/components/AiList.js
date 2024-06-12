import styled from "styled-components"

const AiList= ()=>{
    return(
        <>
            <ExtractedText>대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다. 이 헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다. 지방자치단체는 주민의 복리에 관한 사무를 처리하고 재산을 관리하며, 법령의 범위안에서 자치에 관한 규정을 제정할 수 있다. 정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지 국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야 한다.</ExtractedText>
                <QnA>
                    <p>Q: 질문</p>
                    <p>A: 답변</p>
                </QnA>
        </>
    )
}

export default AiList

const ExtractedText= styled.div`
    background-color: #6F4E37;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    max-height: 5rem;
    margin: 5%;
    overflow: scroll;
    margin-bottom: 1rem;
    font-size: 11px;
`

const QnA= styled.div`
    background-color: #5E7E71;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin: 5%;
    font-size: 14px;
    max-height: 5rem;
`