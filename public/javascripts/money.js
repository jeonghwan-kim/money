
/**
 * 초기 로딩시 작업
 */
$(document).ready(function () {
	$("#save-expense").click(function () {
		save_expanse();
	});
	$("#signup-btn").click(function () {
		signup();
	});
});

/**
 * 신규 계정 생성
 *
 * @param	{[type]} uid			[description]
 * @param	{[type]} password [description]
 * @return {[type]}					[description]
 */
function signup() {
	var newEmail = $("#new-email").val();
	var newPassword = $("#new-password").val();

	if (!newEmail || !newPassword) {
		alert('id or password is empty');
		return;
	}

	$.ajax({
		type: "POST",
		url: '/user',
		data: {
			email: newEmail,
			password: newPassword
		},
		success: function(uid) {
			setCookie('uid', uid);
			$(location).attr('href', '/?uid=' + uid + '&yearMonth=2014-03');
		}
	})
}

/**
 * 지출항목 저장
 *
 * @return {[type]} [description]
 */
function save_expanse() {
	var date = $("#date").val();
	var text = $("#text").val();
	var amount = $("#amount").val();

	$.post('/',
		{
			uid: 11921,
			date: date,
			text: text,
			amount: amount
		},
		function (data, status) {
			if (data.insertId) // 저장이 완료되면 페이지 이동.
				$(location).attr('href', '/?uid=11921&yearMonth=2014-03');
			else
				alert("save error");
		});
}

/**
 * 지출항목 삭제
 *
 * @param	{[type]} id [description]
 * @return {[type]}		[description]
 */
function delete_expense(uid, expenseId) {
	if (confirm('삭제할까요?', true)) {
		$.ajax({
			url: "/",
			type: 'DELETE',
			data: {
				uid: uid,
				expenseId : expenseId
			},
			success: function(data) {
				console.log(uid, expenseId);
				console.log(data)
				if (data.deletedRows === 1)
					$(location).attr('href', '/?uid=11921&yearMonth=2014-03');
				else
					alert("delete error");
			}
		});
	}
	else {
		return false;
	}
}


////////////////////////////////////////////////////////////////////////////////
//
// 쿠기 설정 함수
//
////////////////////////////////////////////////////////////////////////////////


// 쿠키 생성
function setCookie(cName, cValue, cDay){
	var expire = new Date();
	expire.setDate(expire.getDate() + cDay);
	cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
	if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
	document.cookie = cookies;
}

// 쿠키 가져오기
function getCookie(cName) {
	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';
	if(start != -1){
			 start += cName.length;
			 var end = cookieData.indexOf(';', start);
			 if(end == -1)end = cookieData.length;
			 cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
}

