학습 플래너 배포 가이드
1) 구글 스프레드시트 백엔드 만들기
sheets.google.com 에서 새 스프레드시트 생성 (이름: "학습플래너 데이터")
상단 메뉴 확장 프로그램 → Apps Script
기본 코드를 지우고 `apps-script-backend.gs` 내용을 붙여넣기
코드 안의 `SECRET_TOKEN` 값을 아무도 모를 문자열로 변경 (예: 랜덤한 영문+숫자 조합)
우측 상단 배포 → 새 배포
유형: 웹앱
실행 사용자: 나
액세스 권한: 전체
배포 후 나오는 웹앱 URL을 복사해두기
처음 실행 시 권한 승인 창이 뜨면 본인 구글 계정으로 승인
2) HTML 파일에 서버 정보 연결
`index.html` 파일을 열어 상단 부근의 아래 부분을 찾아서:
```js
const CONFIG = {
  API_URL: 'PASTE_YOUR_WEB_APP_URL_HERE',
  API_TOKEN: 'CHANGE_THIS_TO_YOUR_OWN_SECRET_1234',
};
```
`API_URL` → 1)에서 복사한 웹앱 URL로 교체
`API_TOKEN` → 1)의 4번에서 설정한 `SECRET_TOKEN`과 동일하게 입력
3) GitHub Pages로 배포하기
github.com 가입 (이미 있으면 생략)
새 저장소(Repository) 생성 (예: `study-planner`), Public으로 설정
`index.html`, `manifest.json`, `sw.js` 세 파일을 저장소에 업로드 (Add file → Upload files)
저장소 Settings → Pages
Source: Deploy from a branch
Branch: main / (root)
Save
1~2분 후 `https://아이디.github.io/study-planner/` 형태의 주소가 생성됨
파일을 수정해서 다시 올릴 때 (업데이트) 주의사항
코드를 고친 뒤 GitHub에 다시 올렸는데도 아이폰에서 예전 화면이 보인다면, 브라우저(서비스워커)가 저장해둔 캐시 때문일 수 있어요:
아이폰 설정 → Safari → 고급 → 웹사이트 데이터에서 `github.io` 검색 → 삭제
홈 화면에 추가해둔 아이콘이 있다면 삭제 후, 캐시 삭제 상태에서 사파리로 다시 접속해 새로 추가
또는 사파리 주소창에 접속한 상태에서 새로고침을 2번 연속 눌러보기
4) 아이폰에서 설치하기
부모님 폰과 아이 폰 둘 다 3)에서 만든 같은 주소로 접속:
사파리로 주소 열기
공유 버튼 → 홈 화면에 추가
홈 화면 아이콘으로 실행하면 앱처럼 전체 화면으로 열림
같은 구글 시트를 함께 보는 구조라, 한쪽에서 저장하면 상단 표시가 "동기화됨"으로 바뀌고 다른 쪽 화면은 20초마다(또는 앱을 다시 열 때) 자동으로 최신 내용을 가져옵니다.
참고
웹앱 URL은 사실상 누구나 접속 가능한 주소라 `API_TOKEN`이 최소한의 보호 장치입니다. 진짜 계정 로그인은 아니므로, 링크와 토큰을 가족 외 다른 사람과 공유하지 마세요.
스프레드시트의 `AppData` 시트 A1 셀에는 전체 데이터가 JSON 한 덩어리로 저장됩니다. 이 셀은 직접 수정하지 마세요.
완전한 실시간 동기화는 아니고, 20초 주기 자동 새로고침 + 화면을 다시 열 때 새로고침하는 방식입니다.
