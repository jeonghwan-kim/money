function Expense(no, date, item, text, money) {
	this.no = no;
	this.date = date;
	this.item = item;
	this.text = text;
	this.money = new Number(money);
}

var entries = new Array();

window.onload = function() {
	
	// xml 문서 호출
	var httpReq = new XMLHttpRequest();
	httpReq.open("get", getXmlFilename(), true);
	httpReq.send();
	httpReq.onreadystatechange = function() {
		if (httpReq.readyState == 4 && httpReq.status == 200) {
			var entry = httpReq.responseXML.getElementsByTagName("entry"); // xml 문서
			var contents_elem = document.getElementById("contents"); // html element
			
			// xml 문서 -> array로 저장
			for (var i = 0; i < entry.length; i++) {
				entries.push( new Expense(getText(entry[i].getElementsByTagName("no")[0]), 
							 getText(entry[i].getElementsByTagName("date")[0]),
							 getText(entry[i].getElementsByTagName("item")[0]),
							 getText(entry[i].getElementsByTagName("text")[0]),
							 getText(entry[i].getElementsByTagName("money")[0]))
							);
			}
				
			// 총액 계산 및 출력
			var sum = 0;
			for (var i = 0; i < entries.length; i++) 
				sum += entries[i].money;
			document.getElementById("total_amount").innerHTML = "총지출: " + sum + "원";
			
			// 최근 1일치 정보만 출력
						
			// array에 저장된 정보를 html 문서로 변환
			for (var i = 0; i < entries.length; i++) {
				if ((i == 0) || (i > 0 && entries[i].date != entries[i-1].date)){ 
					// 날짜가 변경될 경우: 날짜 출력				
					contents_elem.innerHTML += "<h4>" + entries[i].date + "</h4>";
				}
				contents_elem.innerHTML += "<p>(" + entries[i].item + 	") " + "" + entries[i].text + " " + entries[i].money + "</p>";
			}
		}
	}
}

// element 로 부터 nodeValue 얻어내는 함수
// 없으면 "" 반환
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