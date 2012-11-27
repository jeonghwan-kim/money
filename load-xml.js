function Expense(no, date, item, text, money) {
	this.no = no;
	this.date = date;
	this.item = item;
	this.text = text;
	this.money = new Number(money);
}

Expense.prototype.toString = function() {
    var text = "<p>(" + this.item + ") " + this.text + " " + this.money + "</p>";
    return text;
}

window.onload = function() {
    loadXml();
}

// xml 문서 호출
function loadXml() {
	httpReq = new XMLHttpRequest();
    if (!httpReq) {
        alert('XMLHttpRequest() error');
        exit;
    }
    httpReq.abort(); // kill the previous request
    var url = getXmlFilename() + "?dummy=" + new Date().getTime(); // to override cach
    httpReq.open("get", url, true);
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

            // 최근 시간순으로 array 정렬
            entries.reverse();
            
            // 총액 출력
            var sum = 0;
            for (var i = 0; i < entries.length; i++) 
                sum += entries[i].money;
            document.getElementById("total_amount").innerHTML = "총지출: " + sum + "원";

            // 최근 1일치 정보만 출력
            { }

            // array에 저장된 정보를 html 문서로 변환
            var contents_elem = document.getElementById("contents"); // html element
            contents_elem.innerHTML = ""; // 내용 초기화
            for (var i = 0; i < entries.length; i++) {
                if ((i == 0) || (i > 0 && entries[i].date != entries[i - 1].date)){ 
                    // 날짜가 변경될 경우: 날짜 출력				
                    contents_elem.innerHTML += "<h4>" + entries[i].date + "</h4>";
                }
                contents_elem.innerHTML += entries[i]; // (항목) 내용, 금액 출력
            }
        } // end of if
    } // end of function()
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