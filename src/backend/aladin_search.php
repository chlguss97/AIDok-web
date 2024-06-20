<?php
    header('Content-Type:application/json; charset=utf-8');

    // GET방식으로 전달된 검색어 query->isbn
    $query = $_GET['query'];

    //php에서 다른 서버의 http request를 수행하는 기능이 있다. curl 라이브러리..
    //client  url 나는 서버지만 클라이언트처럼 요청하겠다. 터미널의명령어..

    // 영어는 걍 보내도되는데 한글은 무조건 이 작업 필요함. 
    // $encQuery = urlencode($query); 숫자밖에 없으니 이 작업 필요없음isbn..
    //Output요청파라미터없으면 기본 response가본이 XML
    $url= "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?TTBKey=ttbbaechu100402002&ItemId=".$query."&ItemIdType=ISBN13&Output=JS";

    //1.curl 작업 시작 - 초기화
    $ch = curl_init();

    //2. curl 옵션 설정
    curl_setopt($ch, CURLOPT_URL, $url);  //2.1 접속 url 지정
    curl_setopt($ch, CURLOPT_POST, false); //2.2포스트로 보낼거냐? 기본이 POST라서 GET으로 돌리기위해..
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); //2.3응답결과를 되돌려받을건지 여부

    //2.4 헤더 정보  - naver search api에 접속할때 필요한 인증값
    // $client_id="q917Gj1GIYRkF2no579C";
    // $client_secret="er_v9QBEWJ";

    // $headers= array();
    // $headers[] = "X-Naver-Client-Id: ".$client_id;
    // $headers[] = "X-Naver-Client-Secret: ".$client_secret;
    // curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    // curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);

    //3.curl 작업 시작
    $response = curl_exec($ch);
    echo json_encode($response);


    //4.curl작업 닫기
    curl_close($ch);



?>