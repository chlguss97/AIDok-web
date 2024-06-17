import { FaPlus } from "react-icons/fa"
import styled from "styled-components"
import SaveBtn from "../components/SaveBtn"
import { useState, useRef, useEffect } from "react"
import Modal from 'react-modal'
import camera from "../assets/camera.png"
import gallery from "../assets/gallery.png"

Modal.setAppElement('#root');

const modalStyle = {
    content: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 'auto',
        margin: 'auto',
        backgroundColor: '#fff',
        padding: '20px',
        border: 'none',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.2)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
};

const BottomSheetModal = ({ isOpen, onRequestClose }) => {
  const videoRef = useRef(null);

  const handleOpenCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(error => {
        console.error('Error accessing webcam: ', error);
      });
  };

  const handleOpenFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Selected file: ${file.name}`);
    }
  };

  return (
    <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        style={modalStyle}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
    >
      <h4 style={{ marginTop: 0, marginBottom: '20px' }}>사진 업로드 방법을 선택해주세요</h4>
      <div style={{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
        }}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}} onClick={handleOpenCamera}><img width={"40px"} height={"40px"} src={camera}></img>카메라</div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}} onClick={handleOpenFileInput}><img width={"40px"} height={"40px"} src={gallery}></img>갤러리</div>
      </div>

      <video ref={videoRef} width="320" height="240" autoPlay style={{ display: 'none' }}></video>
      <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
    </Modal>
  );
};

const WriteAi= ()=>{

    // 모달
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const openBottomSheet = () => {
        setIsBottomSheetOpen(true)
    }
    
    const closeBottomSheet = () => {
        setIsBottomSheetOpen(false)
    }

    // 변수
    const [question, setQuestion]= useState('')

    // 함수
    const changeQuestion= (event)=>{
        setQuestion(event.target.value)
    }

    const inputQnA= ()=>{
        alert("입력된 내용: "+question)
    }
    
    const save= ()=>{
        alert("저장합니다")
    }

    return(
        <div>
            <Title>AI Q&A</Title>
            <Container>
                <BottomSheetModal
                    isOpen={isBottomSheetOpen}
                    onRequestClose={closeBottomSheet}
                />

                <AddImg onClick={openBottomSheet} style={{cursor:"pointer"}}>
                    <FaPlus style={{
                        color:'#5E7E71',
                        width: '3rem',
                        height: '3rem',
                        position: "absolute",
                        left: '50%',
                        top: '50%',
                        transform:"translate(-50%, -50%)"
                    }}/>
                </AddImg>
                <ExtractedText>대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다. 이 헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다. 지방자치단체는 주민의 복리에 관한 사무를 처리하고 재산을 관리하며, 법령의 범위안에서 자치에 관한 규정을 제정할 수 있다. 정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지 국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야 한다.</ExtractedText>
                <InputText placeholder="질문 내용을 입력하세요" onChange={changeQuestion}></InputText>
                <InputBtn onClick={inputQnA}>입력 완료</InputBtn>
                <Answer>A: 창작의 영역입니다.
                창작의 영역입니다.
                창작의 영역입니다.
                창작의 영역입니다.
                창작의 영역입니다.
                창작의 영역입니다.
                창작의 영역입니다.
                창작의 영역입니다.
                </Answer>
                <SaveBtn name="저장하기" onClick={save}></SaveBtn>
            </Container>
        </div>
    )
}

export default WriteAi

const Title= styled.p`
    color: #6F4E37;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
`

const Container= styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 35%;
    padding-left: 8%;
    padding-right: 8%;
`

const AddImg= styled.div`
    position: relative;
    border: 2px solid #5E7E71;
    border-radius: 10px;
    height: 8rem;
    margin-bottom: 2rem;
`

const ExtractedText= styled.div`
    background-color: #5E7E71;
    color: white;
    border: 2px solid #6F4E37;
    height: 5rem;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 2rem;
    overflow: hidden;
    font-size: 11px;
`

const InputText= styled.textarea`
    width: 100%;
    box-sizing: border-box;
    height: 7rem;
    background-color: white;
    color: black;
    border: 2px solid #5E7E71;
    border-radius: 10px;
    margin-bottom: 1rem;
    font-size: 11px;
    padding: 10px;
`

const Answer= styled.p`
    font-size: 16px;
    color: #5F5C5C;
    font-weight: bold;
`

const InputBtn= styled.button`
    background-color: #6F4E37;
    border: none;
    border-radius: 2px;
    color: white;
    width: 80px;
    height: 1.5rem;
    margin-left: auto;
    font-size: 10px;
    cursor: pointer;
`