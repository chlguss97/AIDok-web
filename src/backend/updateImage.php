<?php
    header('Content-Type: application/json; charset=utf-8');

    //@PartMap으로 전달된 데잍어받기
    $id = $_POST['id'];


    //@Part로 날라온 이미지파일정보

    //'img1'식별자로 보내진 파일정보들 받귀
    $file= $_FILES['img1']; //파일은 너무커서 임시저장소에갖다놓고,나한텐 송장만준다. 
    //송장정보보자
    $srcName = $file['name'];
    $size = $file['size'];
    $type = $file['type'];
    $tmpName = $file['tmp_name'];

    // //확인해보자
    // echo "파일명: $srcName \n";
    // echo "파일사이즈: $size \n";
    // echo "파일타입: $type \n";
    // echo "임시저장소위치: $tmpName \n";

   

    //파일을 임시저장소에서 영구적으로 서버에저장하기위해 이동시키자
    $dstName= "./signupImg/IMG_".date('YmdHis').$srcName;// IMG_2024023124.이름..
    move_uploaded_file($tmpName, $dstName);

    //사용자아이디 받아서 서버에 일치하는아디이있을때 업데이트

    //이제 서버접속해서 업데이트 쿼리하자.
    $db= mysqli_connect("localhost", "hyun", "123456", "mydatabase");
    mysqli_query($db, "set names utf8");
    
    //이미지 변경 시
    $sql= "UPDATE account SET img = '$dstName' WHERE id = '$id' ";

    $result = mysqli_query($db, $sql);

    //쿼리 실행 결과에 따라 JSON응답 구성
    if($result){
        $rowNum = mysqli_affected_rows($db); //영향을 받은 행의 수

        //새로운 이미지파일 정보 가져오기 SELECT쿼리
        $select_sql = "SELECT img FROM account WHERE id = '$id' ";
        $select_result = mysqli_query($db, $select_sql);

        if($select_result){
            $row = mysqli_fetch_assoc($select_result);
            $newImgFile = $row['img'];

            $response = array();
            $response["rowNum"] = $rowNum;
            $response["newData"] = $newImgFile;

            echo json_encode($response,JSON_UNESCAPED_UNICODE);

        } else {
            $response = array();
            $response["error"] = " 이미지파일 셀렉트 가져오기 실패";

            echo json_encode("셀렉트실패".$response,JSON_UNESCAPED_UNICODE);
        }

       


    }else {
        $response = array();
        $response["error"] = "이미지파일 업데이트 불린false";

        echo json_encode("업데이트실패".$result,JSON_UNESCAPED_UNICODE);
    }
    

    mysqli_close($db);




?>