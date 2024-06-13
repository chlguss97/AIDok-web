<?php

header('Content-Type:application/json; charset=utf-8');

//@PartMap으로 전달된 POST방식의 데이터를 받귀
$id = $_POST['id'];
$password = $_POST['password'];

// 기본 이미지 경로 설정
$dstName = null;

// @Part로 날라온 이미지파일정보
if (isset($_FILES['img1'])) {
    $file = $_FILES['img1']; // 식별자
    $srcName = $file['name']; // 원본파일이름 -절대경로인가
    $tmpName = $file['tmp_name']; // 임시저장소 위치

    // 이미지파일 : tmp 에서 영구저장소로 이동
    $dstName = "./signupImg/IMG_" . date('YmdHis') . $srcName;
    move_uploaded_file($tmpName, $dstName);
}




//게시글 작성 시간
$now = date('Y-m-d   H:i:s');

//제목이나 메세지 문자열 중에 '특수문자'가 포함되어있을 수 있으니, 앞에/슬래시기호붙이기
$password = addslashes($password);

//MySQL DB에 저장하기[테이블 : SignUp]
$db = mysqli_connect("localhost", "ddok", "q1w2e3r4!", "ddok");//마지막은 db 파일명이다
mysqli_query($db, "set names utf8"); //한글있어도 깨지지마렁..
//삽입 no id password age imgFile	
$sql = "INSERT INTO account(id, pw, img) VALUES('$id','$password','$dstName')";
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