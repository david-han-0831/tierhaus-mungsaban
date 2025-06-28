# 티어하우스 공동구매 신청 페이지

후추추님과 티어하우스의 수제간식 공동구매 신청을 위한 웹페이지입니다.

## 주요 기능

- 📱 모바일 반응형 디자인
- 🛒 상품 수량 조절 및 실시간 가격 계산
- 📋 주문자 정보 입력 폼
- 💰 6만원 이상 무료배송 자동 적용
- 📊 Google Sheets 연동으로 주문 데이터 자동 저장

## Google Apps Script 설정 방법

1. **Google Sheets 생성**
   - 새 Google Sheets 문서 생성
   - 스프레드시트 ID 복사 (URL에서 확인 가능)

2. **Google Apps Script 설정**
   - [script.google.com](https://script.google.com) 접속
   - 새 프로젝트 생성
   - \`scripts/google-apps-script.js\` 파일의 코드 복사
   - \`YOUR_SPREADSHEET_ID_HERE\`를 실제 스프레드시트 ID로 교체

3. **웹 앱 배포**
   - Apps Script에서 "배포" → "새 배포" 선택
   - 유형: "웹 앱" 선택
   - 실행 권한: "나" 선택
   - 액세스 권한: "모든 사용자" 선택
   - 배포 후 웹 앱 URL 복사

4. **프론트엔드 연결**
   - \`app/page.tsx\`의 \`YOUR_GOOGLE_APPS_SCRIPT_URL\` 부분을 실제 웹 앱 URL로 교체
   - 주석 처리된 fetch 코드의 주석 해제

## 브랜드 컬러

- 메인 컬러: \`#8f001e\` (티어하우스 브랜드 컬러)
- 서브 컬러: 흰색

## 배송 정책

- 기본 배송비: 4,000원
- 6만원 이상 주문 시 무료배송
- 10만원 이상 주문 시 서비스 간식 제공

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Google Apps Script (백엔드)
- Google Sheets (데이터베이스)
