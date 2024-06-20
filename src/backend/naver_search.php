<?php
header('Content-Type: application/json; charset=utf-8');

// 에러 보고 활성화
error_reporting(E_ALL);
ini_set('display_errors', 1);

// GET 방식으로 전달된 검색어 query
$query = isset($_GET['query']) ? $_GET['query'] : '';

if (empty($query)) {
    echo json_encode(['error' => 'Query parameter is required']);
    http_response_code(400);
    exit();
}

$encQuery = urlencode($query);
$url = "https://openapi.naver.com/v1/search/book.json?query=".$encQuery;

// 1. curl 작업 시작 - 초기화
$ch = curl_init();

// 2. curl 옵션 설정
curl_setopt($ch, CURLOPT_URL, $url);  // 2.1 접속 url 지정
curl_setopt($ch, CURLOPT_POST, false); // 2.2 POST 요청 여부 설정
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 2.3 응답 결과를 반환 받음
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 2.4 SSL 검증 비활성화 (개발 중에만 사용)

// Naver API 클라이언트 ID 및 시크릿
$client_id = "q0Llra2n2oQB3OC27M5l";
$client_secret = "XOzSKgv1ip";

$headers = array(
    "X-Naver-Client-Id: " . $client_id,
    "X-Naver-Client-Secret: " . $client_secret
);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// 3. curl 작업 실행
$response = curl_exec($ch);

// curl 에러 체크
if (curl_errno($ch)) {
    echo json_encode(['error' => 'Curl error: ' . curl_error($ch)]);
    curl_close($ch);
    exit();
}

// 응답 검증
if ($response === false) {
    echo json_encode(['error' => 'Failed to retrieve data']);
    curl_close($ch);
    exit();
}

// JSON 응답 반환
$json_response = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'Invalid JSON response']);
} else {
    echo json_encode($json_response);
}

// 4. curl 작업 종료
curl_close($ch);
?>
