<?php
header('Content-Type:application/json; charset=utf-8');

//사용자가 전달한 데이터 받기
$id = $_POST['id'];


//서버접속
$db= mysqli_connect("localhost", "ddok", "q1w2e3r4!", "ddok");
mysqli_query($db, "set names utf8");

$sql= "SELECT id FROM account WHERE id = '$id' ";

$result = mysqli_query($db, $sql);

//결과표의 총 레코드숫자알기
$rowNum = mysqli_num_rows($result);

//로우넘이 1이면 기존회원있는거고 0이면 회원가입 가능

echo $rowNum;

mysqli_close($db);


?>