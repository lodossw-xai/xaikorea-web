# XAI Korea Web

React + TypeScript + Vite 기반 웹 애플리케이션

## 🏗️ 프로젝트 구조

이 프로젝트는 **Constitution** 원칙을 준수하여 개발되었습니다.
자세한 개발 원칙은 [Constitution 문서](./.specify/memory/constitution.md)를 참고하세요.

### 기술 스택

- ⚡ **Vite** v6.x - 빠른 빌드 도구
- ⚛️ **React** v19.x - UI 라이브러리
- 📘 **TypeScript** v5.x - 타입 안전성
- 🐻 **Zustand** - 가벼운 상태 관리
- 🧪 **Vitest** - 테스트 프레임워크
- 🎨 **CSS Modules** - 스타일링
- 📏 **ESLint** + **Prettier** - 코드 품질

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

### 테스트

```bash
# 테스트 실행
npm test

# UI 모드로 테스트
npm run test:ui

# 커버리지 확인
npm run test:coverage
```

### 린팅 및 포맷팅

```bash
# ESLint 검사
npm run lint

# ESLint 자동 수정
npm run lint:fix

# Prettier 포맷팅
npm run format
```

## 📂 디렉토리 구조

```
src/
├── assets/          # 정적 파일 (이미지, 폰트, 아이콘)
├── components/      # 공통 UI 컴포넌트 (Design System)
│   ├── common/      # Button, Input, Modal 등
│   └── layout/      # Header, Footer, Sidebar
├── features/        # 기능(도메인)별 모듈
│   ├── auth/        # 인증 기능
│   └── dashboard/   # 대시보드 기능
├── hooks/           # 공통 Custom Hooks
├── pages/           # 라우팅 페이지
├── services/        # API 클라이언트
├── store/           # 전역 상태
├── styles/          # 전역 스타일
├── types/           # 공통 타입 정의
└── utils/           # 유틸리티 함수
```

## 📋 Constitution 핵심 원칙

1. **Functional Components Only** - 모든 컴포넌트는 함수형으로 작성
2. **View & Logic Separation** - UI와 로직을 Custom Hook으로 분리
3. **Strict Typing** - `any` 타입 금지, TypeScript strict mode 사용
4. **Single Responsibility** - 하나의 컴포넌트는 하나의 기능만 담당
5. **Security First** - `dangerouslySetInnerHTML` 금지, 보안 검사 필수

## 🧪 테스트 작성 가이드

- **AAA 패턴** 준수: Arrange → Act → Assert
- **커버리지 목표**: Statements ≥ 80%, Branches ≥ 75%
- Custom Hook과 Utility 함수는 반드시 테스트 작성

예시:
```typescript
describe('Component', () => {
  it('should do something', () => {
    // Arrange
    render(<Component />);

    // Act
    fireEvent.click(screen.getByRole('button'));

    // Assert
    expect(screen.getByText('Result')).toBeInTheDocument();
  });
});
```

## 🔒 보안 정책

- `.env` 파일은 절대 커밋하지 않습니다
- 외부 라이브러리 추가 시 `npm audit` 실행 필수
- XSS 방지를 위해 사용자 입력은 항상 검증합니다

## 📝 커밋 메시지 규칙

Conventional Commits 규칙을 따릅니다:

```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
style: 코드 포맷팅
test: 테스트 추가/수정
docs: 문서 수정
chore: 빌드 설정, 패키지 업데이트
```

## 🤝 기여 가이드

1. Constitution 문서를 먼저 읽어주세요
2. 브랜치 생성: `feature/기능명` 또는 `fix/버그명`
3. 코드 작성 시 ESLint 규칙을 준수하세요
4. 테스트 코드를 함께 작성하세요
5. PR 전에 `npm run lint && npm test && npm run build` 실행

## 📄 라이선스

MIT

## 👥 팀

XAI Korea Development Team
