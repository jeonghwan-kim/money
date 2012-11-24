function Expense(no, date, item, text, money) {
	this.no = no;
	this.date = date;
	this.item = item;
	this.text = text;
	this.money = new Number(money);
}

var entries = new Array();

window.onload = function() {
	
	// xml ���� ȣ��
	var httpReq = new XMLHttpRequest();
	httpReq.open("get", getXmlFilename(), true);
	httpReq.send();
	httpReq.onreadystatechange = function() {
		if (httpReq.readyState == 4 && httpReq.status == 200) {
			var entry = httpReq.responseXML.getElementsByTagName("entry"); // xml ����
			var contents_elem = document.getElementById("contents"); // html element
			
			// xml ���� -> array�� ����
			for (var i = 0; i < entry.length; i++) {
				entries.push( new Expense(getText(entry[i].getElementsByTagName("no")[0]), 
							 getText(entry[i].getElementsByTagName("date")[0]),
							 getText(entry[i].getElementsByTagName("item")[0]),
							 getText(entry[i].getElementsByTagName("text")[0]),
							 getText(entry[i].getElementsByTagName("money")[0]))
							);
			}
				
			// �Ѿ� ��� �� ���
			var sum = 0;
			for (var i = 0; i < entries.length; i++) 
				sum += entries[i].money;
			document.getElementById("total_amount").innerHTML = "������: " + sum + "��";
			
			// �ֱ� 1��ġ ������ ���
						
			// array�� ����� ������ html ������ ��ȯ
			for (var i = 0; i < entries.length; i++) {
				if ((i == 0) || (i > 0 && entries[i].date != entries[i-1].date)){ 
					// ��¥�� ����� ���: ��¥ ���				
					contents_elem.innerHTML += "<h4>" + entries[i].date + "</h4>";
				}
				contents_elem.innerHTML += "<p>(" + entries[i].item + 	") " + "" + entries[i].text + " " + entries[i].money + "</p>";
			}
		}
	}
}

// element �� ���� nodeValue ���� �Լ�
// ������ "" ��ȯ
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