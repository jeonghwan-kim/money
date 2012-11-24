// ������ �ε��� �۾� �Լ�
window.onload = function() {
	document.getElementById("date").value = new Date(); // ���� ��¥ �ڵ��Է�
	document.getElementById("text").focus();
	document.getElementById("save").onclick = saveFileToXml; // �Լ� ����
}

// Date.toString �Լ� ������
Date.prototype.toString = function() {
	return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
}

// ��ưŬ����: php�Լ� ȣ��(�����͸� post�� �Ѱ� xml ���Ͽ� ����)
function saveFileToXml() {
	// �Է°�->������ ����
	var date  = document.getElementById("date").value;
	var item  = document.getElementById("item").value;
	var text  = document.getElementById("text").value;
	var money = document.getElementById("money").value;
	var xml_filename = getXmlFilename();
	
	//alert(xml_filename);

	// write.php�Լ� ȣ��
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("post", "write.php", true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=euc-kr");
	xmlhttp.send("date=" + date + "&item=" + item + "&text=" + text + "&money=" + money + "&xml_filename=" + xml_filename);	
	xmlhttp.onreadystatechange = function() {		
		// write.php ���� ȣ��� ���
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {			
			window.location='./'; // ������ �̵�
		}
	}
}
