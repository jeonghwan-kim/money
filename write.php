<?php
// ���� ���� (������ ���� ����)
$filename = $_REQUEST["xml_filename"];

if (file_exists($filename)) {
	$data = file_get_contents($filename);
	echo $data;
} else {
	$data = "<?xml version=\"1.0\" encoding=\"euc-kr\"?><expense></expense>";
	echo $data;
}

$xml = new simpleXmlElement($data);

// xml�� ������ �߰��ϱ�
$new_entry = $xml->addChild("entry");
$new_entry->addChild("date", $_REQUEST["date"]);
$new_entry->addChild("item", $_REQUEST["item"]);
$new_entry->addChild("text", $_REQUEST["text"]);
$new_entry->addChild("money", $_REQUEST["money"]);

// ���� ����
$file = fopen($filename, 'w');
fwrite($file, $xml->asXML());
fclose($file);
?>