// ==================================================
// Global varialbles
// ==================================================

var entries = new Array(); // xml문서 내용을 파싱하여 담는 배열
var httpReq = new XMLHttpRequest(); 

// ==================================================
// Functions
// ==================================================

// 페이지 로딩시 작업들
$(document).ready(function() {
    $("#title").click( function() {
        $('#view_page').css("display", "block"); // view 보이기
        $('#write_page').css("display", "none"); // write 숨기기
    });
    
    $("#writebtn").click( function() {
        $('#view_page').css("display", "none"); // view 숨기기
        $('#write_page').css("display", "block"); // write 보이기
    });

    $("#more").click( function() { // more button click handler
        entries.toHtml(false);
    });

    $("#othermonthbtn").click( function() {
        $("#othermonth").empty();
        $("#othermonth").append("<button class='btn btn_month'>2012-1</button>");
        $("#othermonth").append("<button class='btn btn_month'>2011-12</button>");
        $("#othermonth").append("<button class='btn btn_month'>2011-11</button>");
    });

    $("#middle").add("<p id='loadmsg'>loading...</p>"); // 로딩중 메제지
    
    printExpenseData( getXmlFilename("2013-1") ); // xml 문서 호출
});

// xml 문서 호출
function printExpenseData(month) {
    if (!httpReq) {
        alert('XMLHttpRequest() error'); 
        return;
    }
    httpReq.abort(); // kill the previous request
    var url = month + "?dummy=" + new Date().getTime(); // to override cach
    httpReq.open("get", url, true);
    httpReq.send();
    httpReq.onreadystatechange = loadXml;
}

// xml 요청 응답함수: xml->객체 저장, 정렬, html 출력
function loadXml() {
    if (httpReq.readyState == 4 && httpReq.status == 200) {
        // xml 문서 -> array로 저장
        var entry = httpReq.responseXML.getElementsByTagName("entry"); // xml 문서
        for (var i = 0; i < entry.length; i++) {
            var date_string = getText(entry[i].getElementsByTagName("date")[0]).split('-');
            var year = date_string[0];
            var month = date_string[1];
            var date = date_string[2];
            entries.push( new Expense(
                getText(entry[i].getElementsByTagName("id")[0]),
                new Date(year, month - 1, date),
                getText(entry[i].getElementsByTagName("item")[0]),
                getText(entry[i].getElementsByTagName("text")[0]),
                getText(entry[i].getElementsByTagName("money")[0]))
            );
        }
     
        $("#loadmsg").remove(); // 로딩중 메세지 제거
        
        entries.sort(function(a, b){return b.written_order - a.written_order;}); // 최근 시간순으로 array 정렬
        entries.totalAmount(); // 총액 출력
        entries.toHtml(true); // 배열 내용을 html로 출력 (true: 최근 일자만 출력)
        if (entries.length == 0) // 배열 내용이 없을 경우 더보기 버튼 감추기
            $("#morebtn").css("display", "none");
    } // endh of if
}


// element 로 부터 nodeValue 얻어내는 함수 (없으면 "" 반환)
function getText(elem) {
    var text = "";
    if (elem) {
        if (elem.childNodes) {
            var child = elem.childNodes[0];
            if (child && child.nodeValue) text = child.nodeValue;
        }
    }
    return text;
}

// 노드 삭제하기
function deleteNode(delete_id) {
    var response = confirm("Delete?");
    
    if (response) {
        httpReq = new XMLHttpRequest();
        if (!httpReq) {
            alert('XMLHttpRequest() error');
            exit;
        }
        httpReq.abort(); // kill the previous request
        httpReq.open("post", "delete.php", true);
        httpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=euc-kr");
        var url = "delete_id=" + delete_id + "&filename=" + getXmlFilename() +"&dummy=" + (new Date).getTime();
        httpReq.send(url);  
            
        httpReq.onreadystatechange = function() {       
            // write.php 정상 호출될 경우
            if (httpReq.readyState == 4 && httpReq.status == 200) {
                // 배열에서 삭제
                var delete_date;
                for (var i = 0; i < entries.length; i++) {
                    if (entries[i].id == delete_id) {
                        delete_date = entries[i].date.getDate(); // 삭제된 항목의 날짜 구하기
                        entries.remove(i); 
                    }
                }
                $("#" + delete_id).remove(); // 화면 표시에서 삭제
                entries.totalAmount(); // 변경된 총 지출액 출력
                if (entries.length == 0) // 배열 내용이 없을 경우 더보기 버튼 감추기
                    $("#morebtn").css("display", "none");
                }           
        }
    } 
}

// "2012-12.xml" 형태의 파일명 얻는 함수
// month 입력값이 있을 경우: month.xml 리턴
// month 입력값이 없을 경우: 이번달.xml 리턴
function getXmlFilename(month) {	
	var today = new Date();
    var folder_path = './data/';
    if (month) {
        var xmlFilename = folder_path + month + ".xml";    
    } else {
    	var xmlFilename = folder_path + today.getFullYear() + "-" + (today.getMonth() + 1) + ".xml";
    }
	return xmlFilename;
}
