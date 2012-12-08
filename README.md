기능
----
* 이번 달 지출 내역을 정리하고자 만들었다. 
* 스마트폰으로 접속하여 지출 내역을 입력하면 이를 xml형태로 저장하고 보여준다. 
* 최상단에 해당월 지출 총액을 표시한다. 

저장
----
* write.html: 입력 폼을 보여준다. 일시, 항목, 내용, 금액 정보를 입력한다. 
  저장버튼을 클릭하면 write.js에 있는 함수가 동작한다.
* write.js: 입력 폼에서 데이터를 추출한다. 
  추출한 데이터를 저장하기 위해 write.php를 호출한다.
* write.php: 데이터를 xml형태로 저장한다. (2012-11.xml)로 저장된다. 
  매월 별도의 파일이 한 개씩 생성된다.

로딩
----
* index.html: 문서 구조를 나타낸다.
* view.js: xml파일을 로딩하고 이를 index.html의 element에 할당한다.

삭제
----
* delete.php: view.js의 delete_no()함수가 httpreauest를 이용하여 delete.php를 호출한다.

