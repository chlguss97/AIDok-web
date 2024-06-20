<?php
header('Content-Type: application/json; charset=utf-8');

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

// 서버 접속
$db = mysqli_connect("localhost", "hyun", "123456", "mydatabase");
if (mysqli_connect_errno()) {
    echo json_encode(['error' => 'Failed to connect to MySQL: ' . mysqli_connect_error()]);
    http_response_code(500); // Internal Server Error
    exit();
}

mysqli_query($db, "set names utf8");

// 비밀번호 변경 쿼리 실행
$sql = "UPDATE account SET pw = '$password' WHERE id = '$id'";
$result = mysqli_query($db, $sql);

$response = array();

if ($result) {
    $rowNum = mysqli_affected_rows($db); // 영향 받은 행의 수

    // 업데이트된 새로운 패스워드 가져오기
    $select_sql = "SELECT pw FROM account WHERE id = '$id'";
    $select_result = mysqli_query($db, $select_sql);

    if ($select_result) {
        $row = mysqli_fetch_assoc($select_result);
        $newPassword = $row['pw'];

        $response["rowNum"] = $rowNum;
        $response["newData"] = $newPassword;

        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    } else {
        $response["error"] = "Failed to retrieve new password";
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }
} else {
    $response["error"] = "Failed to update password";
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
}

mysqli_close($db);
?>