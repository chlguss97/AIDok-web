<?php
header('Content-Type:application/json; charset=utf-8');

// 에러 리포팅 설정
error_reporting(E_ALL);
ini_set('display_errors', '1');

// 사용자가 전달한 데이터 받기
$id = $_POST['id'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($id) || empty($password)) {
    echo json_encode(['error' => 'ID and password are required']);
    http_response_code(400); // Bad Request
    exit();
}

// 데이터베이스 연결 정보
$db_host = "localhost";
$db_user = "hyun";
$db_password = "123456";
$db_name = "mydatabase";

// 데이터베이스 연결
$db = mysqli_connect($db_host, $db_user, $db_password, $db_name);
if (mysqli_connect_errno()) {
    echo json_encode(['error' => 'Failed to connect to MySQL: ' . mysqli_connect_error()]);
    http_response_code(500); // Internal Server Error
    exit();
}

mysqli_query($db, "set names utf8");

// SQL 쿼리 작성 및 실행
$sql = "SELECT * FROM account WHERE id = '$id' AND pw = '$password'";
$result = mysqli_query($db, $sql);

if (!$result) {
    echo json_encode(['error' => 'Query failed: ' . mysqli_error($db)]);
    http_response_code(500); // Internal Server Error
    mysqli_close($db);
    exit();
}

// 결과표의 총 레코드 숫자 알아내기
$rowNum = mysqli_num_rows($result);

// 응답 생성
$response = array();
$response["rowNum"] = $rowNum;

if ($rowNum > 0) {
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $response["account"] = $row;
} else {
    $response["account"] = array(
        "id" => "",
        "password" => "",
        "img" => ""
    );
}

// JSON 형식으로 반환
echo json_encode($response, JSON_UNESCAPED_UNICODE);

// 데이터베이스 연결 종료
mysqli_close($db);
?>