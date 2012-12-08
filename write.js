// 페이지 로딩시 작업 함수
window.onload = function() {
	$("#date").val(new Date()); // 오늘 날짜 자동입력
	$("#text").focus();
	$("#save").click(saveFileToXml); // 함수 연결
}

// Date.toString 함수 재정의
Date.prototype.toString = function() {
	return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
}

// 버튼클릭시: php함수 호출(데이터를 post로 넘겨 xml 파일에 저장)
function saveFileToXml() {
	// 입력값->변수로 저장
	var date  = $("#date").val();
	var item  = $("#item").val();
	var text  = $("#text").val();
	var money = $("#money").val();
	var xml_filename = getXmlFilename();

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
 			window.location='./?dummy=' + (new Date).getTime(); // 페이지 이동
		}
	}
}
