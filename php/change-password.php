<?php
    sleep(1);

    if(isset($_POST["password"]["old"]) && isset($_POST["password"]["new"])){

        $response = ["message" => "Ваш пароль успішно змінено"];
        echo json_encode($response);
    }
    else{
        header('HTTP/1.1 500 Internal Server Error');
        $response = "Виникли технічні недоліки, вибачте за тимчасові труднощі";
        echo $response;
    }

?>