<?php
// 파일 열기 (없으면 새로 생성)
$filename = $_REQUEST["xml_filename"];

if (file_exists($filename)) {
	$data = file_get_contents($filename);	
	// echo 'asdf';
} else {
	$data = "<?xml version=\"1.0\" encoding=\"euc-kr\"?><expense></expense>";
}

$xml = new simpleXmlElement($data);

// 마지막 entry id 구하기
$end_id = -1;
foreach ($xml->entry as $entry) {
	if ((int)($entry->id) > $end_id)
		$end_id = $entry->id;
}

// 새로운 entry id 구하기
$new_id = $end_id + 1;

// xml에 데이터 추가하기
$new_entry = $xml->addChild("entry");
$new_entry->addChild("id", $new_id);
$new_entry->addChild("date", $_REQUEST["date"]);
$new_entry->addChild("item", $_REQUEST["item"]);
$new_entry->addChild("text", $_REQUEST["text"]);
$new_entry->addChild("money", $_REQUEST["money"]);

// 파일 저장
$file = fopen($filename, 'w');
fwrite($file, $xml->asXML());
fclose($file);
?>