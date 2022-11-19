### 데이터 저장할 곳

localStorage: 브라우저를 닫아도 데이터 유지됨

### 커서 위치 확인하기

e.target.selectionStart;

```js
document.getElementById("test").addEventListener(
  "keydown",
  function select(e) {
    var position = e.target.selectionStart;
    console.log(position);
  },
  false
);
```

### 페이지 나누기

1. 방만들기/닉네임 입력 -> root
2. 편집 에디터 -> /editor

### 유저가 입장했을때

0. 동기화 실행
1. 새로운 유저의 정보 저장
2. 새로운 유저 알림, 유저 목록에 이름, 커서용 닉네임 만들기
3. 마지막 글자에 포커스 해주고 해당 위치 읽어서 저장
4. (할까?) 퇴장했을때 알려주기?

### 텍스트 입력(키보드 다운)

1. 커서 위치 변경 저장
2. 텍스트 저장

### 커서 클릭

1. 커서 위치 변경 저장

### 동기화

0. 가상돔 있는지 확인하고 없으면 만들어주기
1. interval로 저장된 데이터 받아오기
2. 저장된 데이터로 가상 돔 안의 내용 변경하기
3. mutation observer로 가상돔 안의 내용이 변경됬을때만 화면 렌더링
