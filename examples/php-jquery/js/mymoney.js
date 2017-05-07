// ==================================================
// Class Definition: Expens
// ==================================================

function Expense(id, date, item, text, money) {
    this.id = id;
    this.date = date;
    this.item = item;
    this.text = text;
    this.money = new Number(money);
    this.written_order = new Number(this.date.getDate()) * 1000 + new Number(this.id);
    // *1000은 날짜에 비중을 더 주기 위함
}

Expense.prototype.toHtml = function() {
    
    var text = "<p id='" + this.id + "'>";  
    
    if (this.item != "") // 항목이 있을 경우
        text += "(" + this.item + ") ";
        
    text += this.text + " " + this.money.formatMoney() 
    + " <input id='delete' type='button' value='삭제' onclick='deleteNode(" + this.id + ")'; />" 
    + "</p>";

    return text;
}

Expense.prototype.getDate = function() {
    return this.date.getDate();
}

// ==================================================
// Class Definition: Date
// ==================================================

// Date.toString 함수 재정의
Date.prototype.toString = function() {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
}

// ==================================================
// Class Definition: Number
// ==================================================

// Number를 금액 형식으로 출력
Number.prototype.formatMoney = function(c, d, t){
    var n = this;
    var c = isNaN(c = Math.abs(c)) ? 2 : c;
    var t = ",";
    var s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
    var j = (j = i.length) > 3 ? j % 3 : 0;
    return s 
        + (j ? i.substr(0, j) + t : "") 
        + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t);
 };

// ==================================================
// Class Definition: Array
// ==================================================

// 배열에서 특정 인덱스(혹은 구간) 삭제
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

// array에 저장된 정보를 html 문서로 변환
Array.prototype.toHtml = function(is_only_recent) {
    if (this.length == 0) return;
    
    var recent_date = this[0].getDate(); // 최신 날짜
    
    if (is_only_recent == true) // 최근 날짜만 출력할 경우 현제 데이테 삭제(갱신시 활용)
        $("#contents").empty();
        
    for (var i = 0; i < this.length; i++) {
        // 최신날짜 출력할 경우: 최신날짜가 아니면 break
        if ((is_only_recent == true) && (this[i].getDate() != recent_date))
            break;
        // 최신 날짜 출력이 아닐 경우: 최신날짜이면 continue
        if ((is_only_recent == false) && (this[i].getDate() == recent_date))
            continue;
        if ((i == 0) || (i > 0 && this[i].getDate() != this[i - 1].getDate())){ 
            // 날짜가 변경될 경우: 날짜 출력				
            $("#contents").append("<h4>" + this[i].date + "</h4>");
        }
        $("#contents").append(this[i].toHtml()); // (항목) 내용, 금액 출력
    }
    
    if (is_only_recent == false)
        $("#morebtn").remove();    
}

// 총액 출력
Array.prototype.totalAmount = function() {
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        sum += this[i].money;
    }
    $("#total_amount").text("총지출: " + sum.formatMoney() + "원");
}
