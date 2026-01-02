# E2E 테스트 시나리오 문서

## 개요

이 디렉토리는 XAI Korea 웹사이트(http://localhost:3000)에 대한 포괄적인 E2E 테스트 시나리오 문서를 포함합니다. 모든 시나리오는 Playwright를 사용한 테스트 자동화를 위해 설계되었습니다.

## 시나리오 파일 목록

### 01. 네비게이션 및 테마 전환
**파일**: `01-navigation-theme.md`
**커버리지**:
- 다크모드/라이트모드 전환
- 한국어/영어 언어 전환
- 섹션 네비게이션 (홈, 서비스, 자문단, 팀 소개, 문의하기)
- 모바일 반응형 네비게이션

**주요 시나리오**:
- NAV-001: 다크모드/라이트모드 전환 테스트
- NAV-002: 언어 전환 테스트
- NAV-003: 섹션 네비게이션 테스트
- NAV-004: 모바일 반응형 네비게이션 테스트

### 02. FAQ 아코디언
**파일**: `02-faq-accordion.md`
**커버리지**:
- FAQ 아코디언 열기/닫기
- 언어 전환 시 FAQ 컨텐츠 변경
- 아코디언 애니메이션

**주요 시나리오**:
- FAQ-001: FAQ 아코디언 열기/닫기 테스트
- FAQ-002: FAQ 언어 전환 테스트
- FAQ-003: FAQ 애니메이션 테스트

### 03. 문의하기 폼
**파일**: `03-contact-form.md`
**커버리지**:
- 폼 입력 및 제출
- 필수 항목 유효성 검사
- 이메일 형식 검증
- 언어 전환 시 폼 라벨 변경

**주요 시나리오**:
- CONTACT-001: 문의하기 폼 정상 제출 테스트
- CONTACT-002: 필수 항목 미입력 시 유효성 검사
- CONTACT-003: 이메일 형식 유효성 검사
- CONTACT-004: 언어 전환 시 폼 라벨 변경

### 04. 컨텐츠 표시 및 인터랙션
**파일**: `04-content-interaction.md`
**커버리지**:
- Hero 섹션 표시
- 서비스 섹션 카드 표시 및 호버
- 파트너사 로고 스크롤
- 자문단 캐러셀
- 팀 소개 섹션
- 스크롤 애니메이션

**주요 시나리오**:
- CONTENT-001: Hero 섹션 표시 테스트
- CONTENT-002: 서비스 섹션 표시 테스트
- CONTENT-003: 파트너사 로고 표시 테스트
- CONTENT-004: 자문단 캐러셀 테스트
- CONTENT-005: 팀 소개 섹션 표시 테스트
- CONTENT-006: 스크롤 애니메이션 테스트

### 05. 반응형 디자인
**파일**: `05-responsive-design.md`
**커버리지**:
- 데스크톱 레이아웃 (1920x1080)
- 태블릿 레이아웃 (768x1024)
- 모바일 레이아웃 (375x812)
- 가로/세로 모드 전환
- 다양한 브레이크포인트
- 터치 인터랙션

**주요 시나리오**:
- RESPONSIVE-001: 데스크톱 레이아웃 테스트
- RESPONSIVE-002: 태블릿 레이아웃 테스트
- RESPONSIVE-003: 모바일 레이아웃 테스트
- RESPONSIVE-004: 가로/세로 모드 전환 테스트
- RESPONSIVE-005: 다양한 브레이크포인트 테스트
- RESPONSIVE-006: 터치 인터랙션 테스트

## 테스트 우선순위

### Critical (최우선)
핵심 비즈니스 기능과 사용자 여정:
- 언어 전환 (NAV-002)
- 섹션 네비게이션 (NAV-003)
- 문의하기 폼 제출 (CONTACT-001)
- Hero 섹션 표시 (CONTENT-001)
- 데스크톱/모바일 레이아웃 (RESPONSIVE-001, RESPONSIVE-003)

### High (높음)
중요한 기능과 인터랙션:
- 다크모드 전환 (NAV-001)
- 모바일 네비게이션 (NAV-004)
- FAQ 아코디언 (FAQ-001)
- 폼 유효성 검사 (CONTACT-002, CONTACT-003)
- 서비스 섹션 (CONTENT-002)
- 자문단 캐러셀 (CONTENT-004)
- 터치 인터랙션 (RESPONSIVE-006)

### Medium (중간)
부가 기능:
- FAQ 언어 전환 (FAQ-002)
- 폼 라벨 언어 전환 (CONTACT-004)
- 파트너사 로고 (CONTENT-003)
- 팀 소개 섹션 (CONTENT-005)
- 반응형 모드 전환 (RESPONSIVE-004, RESPONSIVE-005)

### Low (낮음)
UX 향상 요소:
- FAQ 애니메이션 (FAQ-003)
- 스크롤 애니메이션 (CONTENT-006)

## 테스트 실행 가이드

### 전체 테스트 실행
```bash
# Playwright 테스트 실행
npx playwright test

# 특정 브라우저에서 실행
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### 개별 시나리오 테스트
```bash
# 네비게이션 테스트만 실행
npx playwright test navigation

# 문의하기 폼 테스트만 실행
npx playwright test contact
```

### 디버그 모드
```bash
# UI 모드로 테스트 실행
npx playwright test --ui

# 헤디드 모드로 실행 (브라우저 표시)
npx playwright test --headed
```

## 브라우저 및 디바이스 커버리지

### 브라우저
- Chromium (Chrome, Edge)
- Firefox
- WebKit (Safari)

### 디바이스
- Desktop: 1920x1080, 1440x900, 1024x768
- Tablet: 768x1024 (iPad)
- Mobile: 375x812 (iPhone X), 414x896 (iPhone 11 Pro Max), 360x640 (Galaxy S5)

## 테스트 데이터 관리

### 언어별 텍스트
각 시나리오 파일에 언어별 예상 텍스트가 포함되어 있습니다.

### 테스트 사용자 데이터
문의하기 폼 테스트를 위한 샘플 데이터:
- 이름: 홍길동
- 이메일: test@example.com
- 회사명: 테스트 회사
- 문의 내용: 테스트 문의 내용입니다.

## 엣지 케이스 및 에러 시나리오

각 시나리오 파일에는 다음과 같은 엣지 케이스가 포함되어 있습니다:
- 빠른 연속 클릭 처리
- 네트워크 에러 시뮬레이션
- 이미지 로딩 실패
- 긴 텍스트 입력
- 특수 문자 입력
- 매우 작거나 큰 화면 크기

## 유지보수 가이드

### 셀렉터 전략
- **선호**: `getByRole()`, `getByLabel()`, `getByText()` (접근성 기반)
- **가능**: `data-testid` 속성 사용
- **지양**: CSS 클래스, XPath (변경에 취약)

### 불안정성 방지
- 명시적 대기 사용: `waitForSelector()`, `waitForLoadState()`
- 애니메이션 완료 대기
- 네트워크 요청 완료 확인

### 문서 업데이트
새로운 기능 추가 시:
1. 해당하는 시나리오 파일에 새 시나리오 추가
2. 우선순위 지정
3. README.md 업데이트

## 참고 자료

- [Playwright 공식 문서](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Accessibility Testing](https://playwright.dev/docs/accessibility-testing)

## 문의

테스트 시나리오에 대한 질문이나 제안사항이 있으면 팀에 문의해주세요.
