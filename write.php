<?php
// 파일 열기 (없으면 새로 생성)
$filename = $_REQUEST["xml_filename"];

if (file_exists($filename)) {
	$data = file_get_contents($filename);
	echo $data;
} else {
	$data = "<?xml version=\"1.0\" encoding=\"euc-kr\"?><expense></expense>";
	echo $data;
}

$xml = new simpleXmlElement($data);

// xml에 데이터 추가하기
$new_entry = $xml->addChild("entry");
$new_entry->addChild("date", $_REQUEST["date"]);
$new_entry->addChild("item", $_REQUEST["item"]);
$new_entry->addChild("text", $_REQUEST["text"]);
$new_entry->addChild("money", $_REQUEST["money"]);

// 파일 저장
$file = fopen($filename, 'w');
fwrite($file, $xml->asXML());
fclose($file);
?>