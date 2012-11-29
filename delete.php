<?php
// get 파라메터 받기 (id)
$filename = '2012-11.xml';
$delete_id = $_REQUEST["delete_id"];

// 파일열기
if (file_exists($filename)) {
	$data = file_get_contents($filename);
} else {
	echo 'error in delete';
	exit;
}

// xml dom 객체 생성
$xml = new simpleXmlElement($data);

// 해당 id의 element를 삭제
$i = 0;
foreach ($xml->entry as $entry) {
	if ($entry->id == $delete_id) {
		$dom = dom_import_simplexml($entry);
		$dom->parentNode->removeChild($dom);
	}	
	$i++;
}

// 파일 저장
$file = fopen($filename, 'w');
fwrite($file, $xml->asXML());
fclose($file);
?>