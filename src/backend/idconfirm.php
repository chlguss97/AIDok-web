<?php
header('Content-Type:application/json; charset=utf-8');

// 에러 리포팅 설정
error_reporting(E_ALL);
ini_set('display_errors', '1');

// 데이터베이스 연결 정보
$db_host = "localhost";
$db_user = "hyun";
$db_password = "123456";
$db_name = "mydatabase";

// 사용자가 전달한 데이터 받기
$id = $_POST['id'] ?? '';

if (empty($id)) {
    echo json_encode(['error' => 'ID is required']);
    http_response_code(400); // Bad Request
    exit();
}

// 데이터베이스 연결
$db = mysqli_connect($db_host, $db_user, $db_password, $db_name);
// $db = mysqli_connect("localhost", "ddok", "q1w2e3r4!", "ddok");
if (mysqli_connect_errno()) {
    echo json_encode(['error' => 'Failed to connect to MySQL: ' . mysqli_connect_error()]);
    http_response_code(500); // Internal Server Error
    exit();
}

mysqli_query($db, "set names utf8");

// SQL 쿼리 작성 및 실행
$sql = "SELECT id FROM account WHERE id = '$id'";
$result = mysqli_query($db, $sql);

if (!$result) {
    echo json_encode(['error' => 'Query failed: ' . mysqli_error($db)]);
    http_response_code(500); // Internal Server Error
    mysqli_close($db);
    exit();
}

// 결과표의 총 레코드 숫자 알기
$rowNum = mysqli_num_rows($result);

// 디버깅 출력을 위해 에러 로그에 기록
file_put_contents('php://stderr', print_r("rowNum: $rowNum\n", TRUE));

// JSON 형식으로 반환
echo json_encode(['rowNum' => $rowNum]);

// 데이터베이스 연결 종료
mysqli_close($db);
?>