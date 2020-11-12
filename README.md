# FoodPass
푸드트럭 사장과 손님을 이어주는 웹앱

결과
---------
- 영상: https://www.youtube.com/watch?v=Db3b-uB-GDU
  - 위의 유튜브 영상에 더 자세한 설명이 있습니다.
- 웹앱 주소: https://foodpass-3fafc.web.app/tabs/home
- gif

<img src="/result/동작영상.gif" title="px(픽셀) 크기 설정" alt="앱 이미지"></img><br/>



개요
-------------
- 3인 팀 프로젝트
- 사용자
    - 손님: 푸드트럭 이용자
    - 사장: 푸드트럭 운영자
    
- 개발동기
  - 푸드트럭 앞에서 서있는 시간을 줄이기 위해 프로젝트를 기획했습니다.

- 목표
  - 손님이 설정한 위치를 기준으로 푸드트럭 정보를 확인하고, 주문할 수 있습니다.
 
- 주요기능
  - 손님은 특정 위치를 중심으로 주변의 푸드트럭 정보를 확인할 수 있습니다.
  - 이때 현재 위치를 기준으로도 검색이 가능합니다.
  - 푸드트럭의 정보를 확인할 수 있습니다.
    * 필수 정보 : 이름, 설명, 사진
    * 영업 중 정보: 위치, 대기 인원수, 예상 대기 시간
- 손님은 검색된 푸드트럭에서 자신이 원하는 메뉴와 옵션을 선택하여 주문을 할 수 있습니다.
- 사장은 주문 정보를 보고 메뉴를 준비한 뒤, 호출버튼을 통해 손님을 호출합니다.
- 손님은 호출 알림을 푸시알림을 통해 전달받고, 주문을 수령한 뒤 주문 수령 버튼을 통해 주문 과정을 마칩니다. 


개발 환경
--------------
- 앱: angular Framework (ionic)  -  HTML, css, typescript
- 서버: Node.js, express, AWS-Ubuntu 
- DB: PostgreSQL, PostgreGIS
- API: kakao map api

