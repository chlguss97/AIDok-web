<?php
header('Content-Type:text/plain; charset=utf-8');


// GET방식으로 전달된 검색어 query
$query = $_GET['query'];

//php에서 다른 서버의 http request를 수행하는 기능이 있다. curl 라이브러리..
//client  url 나는 서버지만 클라이언트처럼 요청하겠다. 터미널의명령어..

// 영어는 걍 보내도되는데 한글은 무조건 이 작업 필요함. 
$encQuery = urlencode($query);



$url = "https://search.shopping.naver.com/book/catalog/".$encQuery;


//1.curl 작업 시작 - 초기화
$ch = curl_init();

//2. curl 옵션 설정
curl_setopt($ch, CURLOPT_URL, $url);  //2.1 접속 url 지정
curl_setopt($ch, CURLOPT_POST, false); //2.2포스트로 보낼거냐? 기본이 POST라서 GET으로 돌리기위해..
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //2.3응답결과를 되돌려받을건지 여부

//2.4 헤더 정보  - naver search api에 접속할때 필요한 인증값
$client_id = "q0Llra2n2oQB3OC27M5l";
$client_secret = "XOzSKgv1ip";

$headers = array(
    "X-Naver-Client-Id: " . $client_id,
    "X-Naver-Client-Secret: " . $client_secret
);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);

//3.curl 작업 시작
$response = curl_exec($ch);

// curl 에러 체크
// if(curl_errno($ch)) {
//     echo 'Curl error: ' . curl_error($ch);
//     die();
// }
echo $response;

//4.curl작업 닫기
curl_close($ch);



?>