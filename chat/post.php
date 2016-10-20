<?php
session_start();

    $text = $_POST['text'];
	$col = $_POST['col'];
    $fp = fopen($_SERVER['DOCUMENT_ROOT']."/server/chat/log.html", 'a+');
    fwrite($fp, "<div style='color:".$col."' class='msgln'>".$text."<br></div>");
    fclose($fp);

?>