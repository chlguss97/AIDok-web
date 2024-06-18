import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import SaveBtn from '../components/SaveBtn';
import BookModal from '../components/BookModal';
import bookImage from '../assets/book.png'; // 적절한 이미지 파일 경로를 지정하세요.
import BottomSheetModal from '../components/BottomSheetModal'
import '@tensorflow/tfjs-backend-webgl'
import axios from 'axios';
import CircularJSON from 'circular-json';

// bert
// const qna = require('@tensorflow-models/qna')

// let passage="Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet."
// let question1="Who is the CEO of Google?"

// passage="구글은 온라인 광고 기술, 검색 엔진, 클라우드 컴퓨팅, 소프트웨어 및 하드웨어를 포함하는 인터넷 관련 서비스 및 제품을 전문으로 하는 미국의 다국적 기술 회사입니다. 아마존, 애플, 페이스북과 함께 빅4 기술 기업으로 꼽힌다. Google은 1998년 9월 Larry Page와 Sergey Brin이 박사 학위를 취득하던 중 설립했습니다. 캘리포니아 스탠포드 대학의 학생들. 그들은 함께 주식의 약 14%를 소유하고 있으며 최고 투표 주식을 통해 주주 의결권의 56%를 통제합니다. 그들은 1998년 9월 4일 캘리포니아에서 Google을 캘리포니아 비상장 회사로 법인화했습니다. 그 후 Google은 2002년 10월 22일 델라웨어에서 재편입되었습니다. 2004년 8월 19일에 기업공개(IPO)가 이루어졌으며 Googleplex라는 별명을 가진 캘리포니아주 마운틴뷰에 있는 본사로 이전했습니다. 2015년 8월, Google은 Alphabet Inc.라는 대기업으로 다양한 이해관계를 재편할 계획을 발표했습니다. Google은 Alphabet의 주요 자회사이며 계속해서 Alphabet의 인터넷 이익을 보호하는 우산 회사가 될 것입니다. 순다르 피차이는 알파벳의 CEO가 된 래리 페이지의 뒤를 이어 구글의 CEO로 임명되었습니다."
// question1="구글의 CEO는 누구야?"

const openApiURL = 'http://aiopen.etri.re.kr:8000/MRCServlet';
const access_key = '9ea2f4ff-9521-4665-aa3f-e16d9178a957';

let question1 = '루트비히 판 베토벤(독일어: Ludwig van Beethoven, 문화어: 루드위히 판 베토벤, 1770년 12월 17일 ~ 1827년 3월 26일)은 독일의 서양 고전 음악 작곡가이다. 독일의 본에서 태어났으며, 성인이 된 이후 거의 오스트리아 빈에서 살았다. 감기와 폐렴으로 인한 합병증으로 투병하다가 57세로 생을 마친 그는 고전주의와 낭만주의의 전환기에 활동한 주요 음악가이며, 작곡가로 널리 존경받고 있다. 음악의 성인(聖人) 또는 악성(樂聖)이라는 별칭으로 부르기도 한다. 가장 잘 알려진 작품 가운데에는 〈교향곡 5번〉, 〈교향곡 6번〉, 〈교향곡 9번〉, 〈비창 소나타〉, 〈월광 소나타〉 등이 있다.';
let passage = '베토벤이 누구야?';


// 질문에 대한 답변을 찾는 함수
const findAnswer = (question1, passage) => {

  // etri에서 예제로 보여주는 코드
  const requestJson = {
    'argument': {
      'question': question1,
      'passage': passage
    }
  };

  const jsonString = CircularJSON.stringify(requestJson);
  
  // let options = {
  //   url: openApiURL,
  //   body: JSON.stringify(requestJson),
  //   headers: {'Content-Type':'application/json','Authorization':access_key}
  //   };
axios.post(openApiURL, JSON.parse(jsonString), {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': access_key
  }
})
.then(response => {
  console.log('Response Status:', response.status);
  console.log('Response Data:', response.data);
})
.catch(error => {
  console.error('Error:', error);
});
}

  // axios.post(openApiURL, requestJson, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': access_key
  //   }
  // })
  // .then(response => {
  //   console.log(response)
  //   // console.log('Response Status:', response.status);
  //   // console.log('Response Data:', response.data);

  //   // 예시에서는 response.data를 적절히 처리하여 원하는 답변을 추출하거나 처리할 수 있습니다.
  //   const answer = response.data.answer; // 예시에서는 실제 반환되는 데이터 구조에 맞게 조정 필요

  //   console.log('Best Answer:', answer);
  // })
  // .catch(error => {
  //   console.error('Error:', error);
  // });
  
  
  // const requestJson = {
  //     'argument': {
  //         'question': question1,
  //         'passage': passage
  //     }
  // };
  
  
  // const options = {
  //     url: openApiURL,
  //     body: JSON.stringify(requestJson),
  //     headers: {'Content-Type':'application/json','Authorization':access_key}
  //     };
  // axios.post(options, function (error, response, body) {
  //   if (error) {
  //     console.error('Error:', error);
  //     return;
  //   }
  //     console.log('responseCode = ' + response.statusCode);
  //     console.log('responseBody = ' + body);

  //     const responseBody = JSON.parse(body); // JSON 형식으로 파싱
  //     const answer = responseBody.answer; // 예시에서는 실제 반환되는 데이터 구조에 맞게 조정 필요

  //     console.log('Best Answer:', answer);
  // });



const WriteAi = () => {

  // bert 상태 관리
  const [question, setQuestion] = useState('');
  // const [passage, setPassage] = useState('');
  const [bestAnswer, setBestAnswer] = useState(null);
  const [model, setModel] = useState(null);

  // 모델 로드 함수
  // const loadModel = async () => {
  //   const loadedModel = await qna.load();
  //   setModel(loadedModel);
  // };

  // 컴포넌트가 마운트될 때 모델 로드
  // useEffect(() => {
  //   loadModel();
  // }, []);

// const axios = require('axios');



    // chatGPT가 만든 코드
  //   const apiKey = '9ea2f4ff-9521-4665-aa3f-e16d9178a957';
  //   const url = 'http://aiopen.etri.re.kr:8000/MRCServlet';

  //   try {
  //     const response = await axios.post(
  //       url,
  //       {
  //         access_key: apiKey,
  //         argument: {
  //           question,
  //           passage,
  //         },
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (response.data && response.data.return_object) {
  //       const answers = response.data.return_object.WiseQAAnswer;
  //       if (answers && answers.length > 0) {
  //         const bestAnswer = answers.reduce((max, answer) => (answer.probability > max.probability ? answer : max), answers[0]);
  //         setBestAnswer(bestAnswer);
  //         console.log('Best Answer:', bestAnswer.answer);
  //       } else {
  //         console.log('No answers found');
  //       }
  //     } else {
  //       console.log('No response from ETRI API');
  //     }
  //   } catch (error) {
  //     console.error('Error accessing ETRI API:', error);
  //   }
  // };



  // // qna 기준 베스트 답변 찾기 - 한글 불가
  //   if (model) {
  //     const answers = await model.findAnswers(question1, passage);
  //     if (answers && answers.length > 0) {
  //       const bestAnswer = answers.reduce((max, answer) => (answer.score > max.score ? answer : max), answers[0]);
  //       setBestAnswer(bestAnswer);
  //       console.log('Best Answer:', bestAnswer.text);
  //     } else {
  //       console.log('No answers found');
  //     }
  //   } else {
  //     console.log('Model not loaded yet');
  //   }
  // };




  // const [image, setImage] = useState();
  // const [question, setQuestion] = useState('');
  // const [file, setFile] = useState();

  // 책 선택 모달 상태관리
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({
    title: '책 추가',
    authors: '',
    cover: bookImage
  });

  // 바텀시트 모달 상태 관리
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const openBottomSheet = () => {
      setIsBottomSheetOpen(true)
  }
  const closeBottomSheet = () => {
      setIsBottomSheetOpen(false)
  }
  const handleFileChange = (file) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
 
  const bookData = Array.from({ length: 20 }, (_, index) => ({
    title: `트렌드 코리아 ${2024 - index}`,
    authors: `저자 ${index + 1}`,
    cover: "https://via.placeholder.com/150"
  }));

  // const changeFile = (event) => {
  //   const files = event.target.files;
  //   setFile(files[0]);
  // };

  // const changeQuestion = (event) => {
  //   setQuestion(event.target.value);
  // };

  const inputQnA = async (quest, passage) => {

    // alert("입력된 내용: " + question);
  };

  const save = () => {
    alert("저장합니다");
  };

  // const submitFile = (event) => {
  //   event.preventDefault();
  //   alert(file.name + "\n" + file.type + "\n" + file.size);
  // };

  const handleBookInfoClick = () => {
    setModalIsOpen(true);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setModalIsOpen(false);
  };

  // useEffect(() => {
  //   // 초기 데이터 로드 등 비동기 작업이 필요할 때 useEffect를 사용
  // }, []);

  return (
    <Container>
      <BookInfo onClick={handleBookInfoClick}>
        <BookImage src={selectedBook.cover} alt="Book Cover" />
        <BookTitle>{selectedBook.title}</BookTitle>
        <BookAuthors>{selectedBook.authors}</BookAuthors>
      </BookInfo>
            
      {!previewUrl && (
        <AddImg onClick={openBottomSheet} style={{cursor:"pointer"}}>
          <FaPlus style={{
            color: '#5E7E71',
            width: '3rem',
            height: '3rem',
            position: "absolute",
            left: '50%',
            top: '50%',
            transform: "translate(-50%, -50%)"
          }} />
        </AddImg>
        )}
        <BottomSheetModal
          isOpen={isBottomSheetOpen}
          onRequestClose={closeBottomSheet}
          onFileChange={handleFileChange}
        />
        {previewUrl && (
          <div>
            <img src={previewUrl} alt="Preview" style={{ maxHeight: '150px', width: '100%', borderRadius: '10px', marginBottom: '1rem'}} />
          </div>
        )}
      {/* <BottomSheetModal
        isOpen={isBottomSheetOpen}
        onRequestClose={closeBottomSheet}
        onFileChange={handleFileChange}
      />
      {previewUrl && (
        <div>
          <h2>File Preview:</h2>
          <img src={previewUrl} alt="Preview" style={{ width: '100%' }} />
        </div>
      )} */}
      <ExtractedText value="Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet.">
        {/* 대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다. 
        이 헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다. 
        지방자치단체는 주민의 복리에 관한 사무를 처리하고 재산을 관리하며, 법령의 범위안에서 자치에 관한 규정을 제정할 수 있다. 
        정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지 국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야 한다. */}
      </ExtractedText>
      <InputText placeholder="질문 내용을 입력하세요" onChange={(e) => setQuestion(e.target.value)}></InputText>
      <InputBtn onClick={findAnswer}>입력 완료</InputBtn>
      <Answer>
        A: 창작의 영역입니다.
        창작의 영역입니다.
        창작의 영역입니다.
        창작의 영역입니다.
        창작의 영역입니다.
        창작의 영역입니다.
        창작의 영역입니다.
        창작의 영역입니다.
      </Answer>
      <SaveBtn name="저장하기" onClick={save}></SaveBtn>
      <BookModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        books={bookData}
        onBookSelect={handleBookSelect}
      />
    </Container>
  );
};

export default WriteAi;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8%;
  padding-bottom: 35%;
  padding-left: 8%;
  padding-right: 8%;
  background-color: white;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  color: #5F5C5C;
  cursor: pointer;
`;

const BookImage = styled.img`
  width: 70px;
  height: auto;
  margin-bottom: 10px;
`;

const BookTitle = styled.div`
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #5F5C5C;
`;

const BookAuthors = styled.div`
  font-size: 10px;
  color: #5F5C5C;
`;

const AddImg = styled.div`
  position: relative;
  border: 2px solid #5E7E71;
  border-radius: 10px;
  height: 8rem;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;

const ExtractedText = styled.textarea`
  background-color: #5E7E71;
  color: white;
  border: 2px solid #6F4E37;
  height: 5rem;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 1rem;
  overflow: auto;
  font-size: 11px;
  width: 100%;
  box-sizing: border-box;
`;

const InputText = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  height: 5rem;
  background-color: white;
  color: black;
  border: 2px solid #5E7E71;
  border-radius: 10px;
  margin-bottom: 1rem;
  font-size: 11px;
  padding: 10px;
`;

const Answer = styled.p`
  font-size: 15px;
  color: #5F5C5C;
  font-weight: bold;
  width: 100%;
  height: 5rem;
  overflow: auto;
`;

const InputBtn = styled.button`
  background-color: #5E7E71;
  border: none;
  border-radius: 2px;
  color: white;
  width: 100px;
  height: 2rem;
  margin-left: auto;
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 20px;
`;