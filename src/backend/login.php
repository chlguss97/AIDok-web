<?php
    header('Content-Type:application/json; charset=utf-8');

    //사용자가 전달한 데이터 받자.
    $id= $_POST['id'];
    $password= $_POST['password'];





    //서버에 접속하자
    $db= mysqli_connect("localhost", "ddok", "q1w2e3r4!", "ddok");
    mysqli_query($db, "set names utf8");

    //쿼리수행하기
    $sql= "SELECT * FROM account WHERE id= '$id' AND pw= '$password' ";

    $result = mysqli_query($db, $sql);

    //결과표($result)의 총 record숫자알아내기.
    $rowNum = mysqli_num_rows($result);

   //로우넘이 0이면 로그인에 실패. 1이면 성공 
   $response = array();
   $response["rowNum"] = $rowNum;

   
   $response["account"] = "계정없쩡";

   if($rowNum>0){
    $row= mysqli_fetch_array($result, MYSQLI_ASSOC);
    $response["account"] = $row;
   }
   
    echo json_encode($response,JSON_UNESCAPED_UNICODE);
    
    


    mysqli_close($db);


    
   


?>