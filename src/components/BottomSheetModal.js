import { useRef } from 'react';
import Modal from 'react-modal'
import camera from "../assets/camera.png"
import gallery from "../assets/gallery.png"

Modal.setAppElement('#root');

const modalStyle = {
    content: {
        position: 'absolute',
        bottom: 80,
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

const BottomSheetModal = ({ isOpen, onRequestClose, onFileChange }) => {

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
            onFileChange(file);
            onRequestClose();

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

export default BottomSheetModal