// 페이지 로딩시 작업 함수
window.onload = function() {
	document.getElementById("date").value = new Date(); // 오늘 날짜 자동입력
	document.getElementById("text").focus();
	document.getElementById("save").onclick = saveFileToXml; // 함수 연결
}

// Date.toString 함수 재정의
Date.prototype.toString = function() {
	return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
}

// 버튼클릭시: php함수 호출(데이터를 post로 넘겨 xml 파일에 저장)
function saveFileToXml() {
	// 입력값->변수로 저장
	var date  = document.getElementById("date").value;
	var item  = document.getElementById("item").value;
	var text  = document.getElementById("text").value;
	var money = document.getElementById("money").value;
	var xml_filename = getXmlFilename();

	//alert(xml_filename);

	// write.php함수 호출
	var xmlhttp = new XMLHttpRequest();
    if (!xmlhttp) {
        alert('XMLHttpRequest() error');
        exit;
    }
    xmlhttp.abort(); // kill the previous request
	xmlhttp.open("post", "write.php", true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=euc-kr");
    var url = "date=" + date + "&item=" + item + "&text=" + text + "&money=" + money 
	    + "&xml_filename=" + xml_filename + "&dummy=" + (new Date).getTime();
	xmlhttp.send(url);	
	    
	xmlhttp.onreadystatechange = function() {		
		// write.php 정상 호출될 경우
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {			
 			window.location='./index.html?dummy=' + (new Date).getTime(); // 페이지 이동
		}
	}
}

function loadXml() {
	var httpReq = new XMLHttpRequest();
	httpReq.open("get", getXmlFilename(), true);
	httpReq.send();
	httpReq.onreadystatechange = function() {
		if (httpReq.readyState == 4 && httpReq.status == 200) {
			// xml 문서 -> array로 저장
			var entries = new Array();
			var entry = httpReq.responseXML.getElementsByTagName("entry"); // xml 문서
			for (var i = 0; i < entry.length; i++) {
				entries.push( new Expense(getText(entry[i].getElementsByTagName("no")[0]), 
							 getText(entry[i].getElementsByTagName("date")[0]),
							 getText(entry[i].getElementsByTagName("item")[0]),
							 getText(entry[i].getElementsByTagName("text")[0]),
							 getText(entry[i].getElementsByTagName("money")[0]))
							);
			}
		}
	}
}

