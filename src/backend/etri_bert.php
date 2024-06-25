<?php
    header('Content-Type: application/json; charset=utf-8'); // 응답 형식을 json으로 설정
    header('Access-Control-Allow-Origin: *'); // 모든 도메인에서 요청 허용
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // 허용되는 메서드 지정
    header('Access-Control-Allow-Headers: Content-Type'); // 요청 헤더 지정

    // API 키 설정
    $api_key = '9ea2f4ff-9521-4665-aa3f-e16d9178a957';

    // 요청 URL
    $url = 'http://aiopen.etri.re.kr:8000/MRCServlet';

    $data = file_get_contents('php://input');

    // Check if $data is not empty
    if (empty($data)) {
        echo json_encode(['error' => 'No data received']);
        exit();
    }

    // 1. cURL 작업 시작 - 초기화
    $ch = curl_init();

    // 2. cURL 옵션 설정
    curl_setopt($ch, CURLOPT_URL, $url);    // 접속 URL 설정
    curl_setopt($ch, CURLOPT_POST, false);  // GET 요청으로 설정
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 응답 결과를 문자열로 반환하도록 설정
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: '.$api_key
    ));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    // 3. cURL 작업 시작
    $response = curl_exec($ch);
    echo $response;

    // 4. cURL 세션 닫기
    curl_close($ch);
?>