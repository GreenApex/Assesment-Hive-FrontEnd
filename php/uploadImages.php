<?php
	error_reporting(0);
	
//error_reporting(0);

	$length = 10;
	$product = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"),0, $length);

	$j = 0;
	//$dirname = "//SANDBOX/morkartImg/".$product."/";
	$dirname = "../uploadedFiles/";
	//mkdir($dirname);

	$error = 5;
	$message = "No File";
	$sliderName = array();

	$file_name = $_FILES['file']['name'];
	$target_path = $dirname.$file_name;


	if (($_FILES["file"]["size"] < 1000000)) {
		if(move_uploaded_file($_FILES['file']['tmp_name'], $target_path)){
			array_push($sliderName,$file_name);
			$message =  'Image successfully uploaded';
			$error =  0;

		} else {
			$message = $file_name.' not uploaded';
			$error =  1;
		}
	}
	else {
		$message = $file_name.' Invalid file Size or Type';
		$error =  2;
	}
	$img64Array =  array('error' => $error,'message' => $message,'fileName' => $file_name);
	echo json_encode($img64Array);
?>