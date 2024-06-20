<?php
header('Content-Type:application/json; charset=utf-8');

// 에러 리포팅 설정
error_reporting(E_ALL);
ini_set('display_errors', '1');

// POST 방식으로 전달된 데이터 받기
$id = $_POST['id'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($id) || empty($password)) {
    echo json_encode(['error' => 'ID and password are required']);
    http_response_code(400); // Bad Request
    exit();
}

// 기본 이미지 경로 설정
$dstName = null;

// @Part로 전달된 이미지 파일 정보
if (isset($_FILES['img1'])) {
    $file = $_FILES['img1'];
    $srcName = $file['name'];
    $tmpName = $file['tmp_name'];

    // 이미지 파일을 영구 저장소로 이동
    $dstName = "./signupImg/IMG_" . date('YmdHis') . "_" . basename($srcName);
    if (!move_uploaded_file($tmpName, $dstName)) {
        echo json_encode(['error' => 'Failed to move uploaded file']);
        exit();
    }
}

// MySQL DB에 저장하기
$db = mysqli_connect("localhost", "hyun", "123456", "mydatabase");
if (mysqli_connect_errno()) {
    echo json_encode(['error' => 'Failed to connect to MySQL: ' . mysqli_connect_error()]);
    http_response_code(500); // Internal Server Error
    exit();
}

mysqli_query($db, "set names utf8");

// 비밀번호 문자열 중 특수문자 앞에 슬래시 기호 붙이기
$password = addslashes($password);

// 삽입 쿼리 실행
$sql = "INSERT INTO account(id, pw, img) VALUES('$id', '$password', '$dstName')";
$result = mysqli_query($db, $sql);

$response = array();
$response["success"] = false;

if ($result) {
    $response["success"] = true;
    $last_id = mysqli_insert_id($db);
    $sql_select = "SELECT * FROM account WHERE no = '$last_id'";
    $result_select = mysqli_query($db, $sql_select);

    if ($row = mysqli_fetch_assoc($result_select)) {
        $response["account"] = $row;
    } else {
        $response["account"] = null;
    }
} else {
    $response["error"] = mysqli_error($db);
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);

mysqli_close($db);
?>