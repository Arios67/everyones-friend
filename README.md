# Everyone's friend 개요<br>
Everyone's friend는 kubernetes를 활용한 배포 및 expressJS 환경에서의 개발 경험을 위해 만들어진 개인 프로젝트입니다.
누구나 쉽게 접속해 채팅 채널을 만들고, 대화할 수 있는 공간이라는 컨셉을 가지고 있습니다.
<br><br>
## 사용 기술스택
  &nbsp;<img src="https://img.shields.io/badge/JavaScript-FFF064?style=for-the-badge&logo=JavaScript&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-0078FF?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-7AF67A?style=for-the-badge&logo=Node.js&logoColor=black">
  <img src="https://img.shields.io/badge/Express-17202C?style=for-the-badge&logo=Express&logoColor=white">
  <img src="https://img.shields.io/badge/TypefORM-FF8C0A?style=for-the-badge&logo=Typeform&logoColor=black">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"> 
  <img src="https://img.shields.io/badge/Socket.io-F9FFFF?style=for-the-badge&logo=Socket.io&logoColor=black"> <br>
  &nbsp;<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=GitHub&logoColor=white">
  <img src="https://img.shields.io/badge/GCP-4285F4?style=for-the-badge&logo=Google Cloud&logoColor=white">
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black">
  <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=Kubernetes&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
<br><br>
## 실시간 채팅 서비스
실시간 채팅 서비스의 로직은 다음과 같이 구성되었습니다.<br><br>
&nbsp;&nbsp;&nbsp;1. 유저가 로그인하여 접속하게 되면, 먼저 room:lobby에 참여하게 됩니다.<br>
&nbsp;&nbsp;&nbsp;2. restAPI를 통해 everyone's friend의 모든 채널과, 자신이 가입(즐겨찾기)한 채널 목록을 가져옵니다.<br>
&nbsp;&nbsp;&nbsp;3. 각 채널은 고유의 roomID를 가지며, 접속 시 API를 통해 DB에 저장된 채팅 로그를 불러옵니다.<br>
&nbsp;&nbsp;&nbsp;4. 채팅 로그는 유저의 닉네임, 유저가 접속해 있는 채널의 ID와 함께 저장됩니다.<br><br>
채팅 로그의 저장 및 조회를 위한 DB는 실시간 서비스인 점을 고려하여, HashMap구조로 데이터를 저장함으로써<br>SQL보다 빠른 속도를 보여주는 NoSQL을 선택하였습니다. 
<br><br>
## api-docs(swagger-ui)의 모듈식 구성
가독성 및 차후 수정의 용이성을 위해 각 api에 대한 docs파일(.yaml)을 모듈화 하였습니다.<br><br>
![s](https://user-images.githubusercontent.com/81277145/176852569-8b14f49d-9d3b-4f4c-866e-98432e558a3b.png) &nbsp;
![ss](https://user-images.githubusercontent.com/81277145/176853147-f8a34222-bdaf-4a53-b693-e839f2d203b2.png) <br>
paths 폴더 안의 yaml 파일들은 스크립트를 통해 openapi.yaml파일의 paths 경로에 합쳐져<br> build.yaml을 생성하며 이를 통해 api-docs 페이지를 구현합니다.<br>
<br> api-docs : https://arios.shop/api-docs <br><br>
## kubernetes(GKE Autopilot)를 활용한 무중단 배포
* 다음은 GCP와 k8s를 활용한 서버 배포 구조입니다.

![EF_K](https://user-images.githubusercontent.com/81277145/177138112-337b15fc-4bfe-4c1c-8ca1-eb0c14d50d44.png) <br><br>
* backend server pod를 포함하고있는 deployment의 HorizontalPodAutoscaler을 통해 서버의 오토스케일링 기능을 구현하였으며, 이를 통해 롤링 배포 할 수 있습니다. <br>
* backend service는 LoadBalancer를 통해 생성된 외부 IP 3000포트와 nodePort로 포트 포워딩하여 노출시켰으며, 
ingress를 통해 경로 생성 시 서브 도메인 기반의 라우팅과 SSL 보안 인증을 지원합니다.<br>

![get Svc](https://user-images.githubusercontent.com/81277145/177145829-87c0e7bc-041f-422a-9344-8cf6d5d92417.png) <br>

![desc ingress](https://user-images.githubusercontent.com/81277145/177145845-86eaa0e1-270a-4b6e-afbc-c9da7d97ff2e.png)

