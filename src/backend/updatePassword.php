<?php
    header('Content-Type: application/json; charset=utf-8');

    //사용자가 전달한데이터받기
    $id = $_POST["id"];
    $password = $_POST["password"];




    // 서버 접속
    $db = mysqli_connect("localhost", "ddok", "q1w2e3r4!", "ddok");
    mysqli_query($db, "set names utf8");

    //비밀번호 변경 시
    $sql = "UPDATE account SET pw = '$password' ";
    
    $result = mysqli_query($db, $sql);

    if($result){
        $rowNum = mysqli_affected_rows($db);//영향받은 행의 수

        // 업데이트된 새로운 패스워드가꼬와
        $select_sql = "SELECT pw FROM account WHERE id = '$id' ";
        $select_result = mysqli_query($db, $select_sql);

        if($select_result){//패스워드 잘가꼬왔다. true
            $row = mysqli_fetch_assoc($select_result);
            $newPassword = $row['pw'];

            $response = array();
            $response["rowNum"] = $rowNum;
            $response["newData"] = $newPassword;

            echo json_encode($response,JSON_UNESCAPED_UNICODE);

        }else{
        $response = array();
        $response["error"] = "패스워드 셀렉트 가져오기 실패";

        echo json_encode("셀렉트실패".$response, JSON_UNESCAPED_UNICODE);
        }


    }else {
        $response = array();
        $response["error"] = "비밀번호 업데이트 실패false";

        echo json_encode("업데이트실패".$result,  JSON_UNESCAPED_UNICODE);
    }

    mysqli_close($db);