<?php
	sleep(1);
	
	if(count($_POST["data"]) >= 1){
		$response["limit"] = "140,00";
		echo json_encode($response);
	} else{
		 header('HTTP/1.1 500 Internal Server Error');
		 $response = "Something wrong";
		 echo $response;
	}

	

?>