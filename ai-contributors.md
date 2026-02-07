# AI Contributors - 역할 및 책임 정의

**문서 버전**: 1.0.0
**최종 업데이트**: 2026-02-03
**목적**: Claude Code(개발)와 Antigravity(검증)의 역할과 책임을 명확히 정의하여 효율적인 협업 워크플로우 구축

---

## 📋 프로젝트 개요

### 프로젝트 정보

**프로젝트명**: TaxAI - AI 세무/회계 통합 솔루션 (XAI Korea Web)
**타입**: React 랜딩 페이지
**기술 스택**: React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + Zustand
**테스트 프레임워크**: Vitest (유닛) + Playwright (E2E)
**버전**: 1.0.0

### 현재 진행 상태

**Phase**: Phase 3 진행 중
**진행률**: 약 95% 완료
**주요 완료 사항**:
- ✅ Phase 1: 프로젝트 설정 (Vite, Tailwind, ESLint, Vitest)
- ✅ Phase 2: 랜딩 페이지 UI (Hero, Services, Advisors, Team, FAQ, Contact, Footer)
- ✅ Phase 3-1: 다크 모드 (Tailwind CSS v4 커스텀 variant)
- ✅ Phase 3-2: 다국어 지원 (한국어/영어, Zustand, JSON 기반)

**진행 중인 작업**:
- 🔄 다국어 지원 완성 (모든 섹션 적용, SEO 메타 태그)

**대기 중인 작업**:
- ⏳ Phase 4: UI 컴포넌트 리팩토링
- ⏳ Phase 5: 기능 개발 (Contact Form 백엔드 연동, SEO 최적화)
- ⏳ Phase 6: 테스팅 (유닛 테스트 80% 커버리지, E2E 테스트)
- ⏳ Phase 7: 배포 (CI/CD, 프로덕션)

---

## 🤖 Claude Code의 역할 (개발)

### 담당 영역

#### 1. Phase 3 완성 (최우선)

**FEAT-003: 다국어 지원 완성**

- [ ] 모든 섹션 다국어 적용
  - Services 섹션
  - Process 섹션
  - Advisors 섹션
  - Team 섹션
  - FAQ 섹션
  - Contact 섹션
  - Footer 섹션
- [ ] `html lang` 속성 동적 변경
- [ ] SEO 메타 태그 다국어 적용 (title, description, og:locale)

**기술 스펙**:
```typescript
// src/data/*.json 구조 활용
// src/hooks/useLocalizedData.ts 활용
// Zustand languageStore로 상태 관리
```

#### 2. Phase 4: UI 컴포넌트 리팩토링

**UI-005: Header 컴포넌트 분리**
- 현재 LandingPage.tsx 내부에 있는 Header 코드를 `src/components/layout/Header/` 폴더로 분리
- Props 인터페이스 정의
- 재사용 가능한 구조로 리팩토링

**UI-006: Footer 컴포넌트 분리**
- 현재 LandingPage.tsx 내부에 있는 Footer 코드를 `src/components/layout/Footer/` 폴더로 분리
- Props 인터페이스 정의
- 재사용 가능한 구조로 리팩토링

#### 3. Phase 5: 기능 개발

**FEAT-004: Contact Form 백엔드 연동**
- Netlify Functions를 사용한 서버리스 API 구현
- 폼 유효성 검사 (클라이언트 + 서버)
- 이메일 전송 기능 (예: Nodemailer, SendGrid)
- 에러 핸들링 및 사용자 피드백 (성공/실패 메시지)

**FEAT-005: SEO 최적화**
- 메타 태그 완성 (Open Graph, Twitter Card)
- Sitemap.xml 생성
- robots.txt 설정
- Structured Data (JSON-LD)

#### 4. 유닛 테스트 작성

**TEST-001: 컴포넌트 단위 테스트**
- 모든 컴포넌트에 대한 테스트 작성 (Vitest + Testing Library)
- AAA 패턴 준수 (Arrange → Act → Assert)
- 커버리지 목표: Statements ≥ 80%, Branches ≥ 75%

**TEST-002: Custom Hook 테스트**
- `useDarkMode.ts` 테스트
- `useLocalStorage.ts` 테스트
- `useLocalizedData.ts` 테스트

**테스트 예시**:
```typescript
// src/hooks/useDarkMode.test.ts
describe('useDarkMode', () => {
  it('should toggle dark mode', () => {
    const { result } = renderHook(() => useDarkMode());

    act(() => {
      result.current.toggleDarkMode();
    });

    expect(result.current.isDarkMode).toBe(true);
  });
});
```

### 개발 원칙 준수

Claude Code는 `.specify/memory/constitution.md`에 정의된 **5가지 핵심 원칙**을 엄격히 준수해야 합니다.

#### I. Functional Components Only & Hooks First
- ✅ 모든 컴포넌트는 함수형으로 작성
- ❌ Class 컴포넌트 금지

#### II. View & Logic Separation (관심사 분리)
- ✅ 복잡한 로직은 Custom Hook으로 분리 (10줄 이상)
- ✅ 컴포넌트는 "무엇을 그릴지"에만 집중

**예시**:
```typescript
// ❌ Bad: 로직과 뷰가 혼재
function UserProfile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(setUser);
  }, []);
  return <div>{user?.name}</div>;
}

// ✅ Good: Custom Hook으로 분리
function UserProfile() {
  const { user, isLoading } = useUserProfile();
  return <div>{user?.name}</div>;
}
```

#### III. Props Read-Only & Strict Typing (NON-NEGOTIABLE)
- ✅ Props는 절대 변경(Mutation) 금지
- ❌ `any` 타입 전면 금지
- ✅ TypeScript strict mode 필수
- ✅ 모든 Props, State, Function Parameter는 Interface/Type으로 정의

#### IV. Single Responsibility Principle (단일 책임 원칙)
- ✅ 하나의 컴포넌트 = 하나의 기능
- 🔍 자가 진단:
  - 컴포넌트 이름에 `And`, `Or`가 들어가는가? → 분리 필요
  - 파일이 200줄을 초과하는가? → 세분화 검토
  - 3개 이상의 useEffect를 사용하는가? → 책임 분산 검토

#### V. Security First (보안 최우선)
- ❌ `dangerouslySetInnerHTML` 엄격히 금지 (XSS 방지)
- ✅ 사용자 입력값 검증 (서버/클라이언트 양측)
- ✅ 환경변수(`.env`) 절대 커밋 금지
- ✅ `npm audit` 정기 실행

### 코딩 스타일 가이드

#### 네이밍 규칙
| 타입 | 규칙 | 예시 |
|:---|:---|:---|
| 컴포넌트 | PascalCase | `UserProfile.tsx` |
| Hook | camelCase + `use` 접두사 | `useAuth.ts` |
| 변수 | camelCase | `const userName = 'John';` |
| 상수 | UPPER_SNAKE_CASE | `const MAX_RETRY_COUNT = 3;` |
| 함수 | camelCase + 동사 시작 | `function fetchUserData() {}` |
| Boolean | `is`, `has`, `should` 접두사 | `isLoading`, `hasError` |
| 이벤트 핸들러 | `handle` 또는 `on` 접두사 | `handleClick`, `onUserLogin` |

#### 파일 구조
```typescript
// ComponentName/index.ts (Public API)
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';

// ComponentName/ComponentName.tsx
import type { ComponentNameProps } from './ComponentName.types';

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // 1. 훅들 (useState, useEffect, etc.)
  const [state, setState] = useState(null);

  // 2. 이벤트 핸들러
  const handleClick = () => { ... };

  // 3. 파생된 계산/효과
  const derivedValue = useMemo(() => ..., [deps]);

  // 4. 렌더링
  return <div>...</div>;
}
```

---

## 🔍 Antigravity의 역할 (검증)

### 담당 영역

#### 1. E2E 테스트 (최우선)

**e2e-test-scenario-generator 에이전트 활용**

Antigravity는 이미 작성된 E2E 테스트 시나리오 (`tests/e2e/scenarios/`)를 바탕으로 Playwright 테스트를 실행하고 검증합니다.

**시나리오 목록**:
1. **01-navigation-theme.md** (NAV-001~004)
   - 다크모드/라이트모드 전환
   - 한국어/영어 언어 전환
   - 섹션 네비게이션
   - 모바일 반응형 네비게이션

2. **02-faq-accordion.md** (FAQ-001~003)
   - FAQ 아코디언 열기/닫기
   - FAQ 언어 전환
   - FAQ 애니메이션

3. **03-contact-form.md** (CONTACT-001~004)
   - 문의하기 폼 정상 제출
   - 필수 항목 유효성 검사
   - 이메일 형식 검증
   - 언어 전환 시 폼 라벨 변경

4. **04-content-interaction.md** (CONTENT-001~006)
   - Hero, Services, Advisors, Team 섹션 표시
   - 파트너사 로고 스크롤
   - 자문단 캐러셀
   - 스크롤 애니메이션

5. **05-responsive-design.md** (RESPONSIVE-001~006)
   - Desktop (1920x1080), Tablet (768x1024), Mobile (375x812)
   - 가로/세로 모드 전환
   - 다양한 브레이크포인트
   - 터치 인터랙션

**테스트 실행**:
```bash
# 전체 E2E 테스트 실행
npx playwright test

# 특정 시나리오만 실행
npx playwright test navigation
npx playwright test contact

# UI 모드로 디버깅
npx playwright test --ui

# 브라우저별 실행
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

**브라우저 호환성 검증**:
- Chromium (Chrome, Edge)
- Firefox
- WebKit (Safari)

**디바이스 검증**:
- Desktop: 1920x1080, 1440x900, 1024x768
- Tablet: 768x1024 (iPad)
- Mobile: 375x812 (iPhone X), 414x896 (iPhone 11 Pro Max), 360x640 (Galaxy S5)

**우선순위**:
- **Critical**: 언어 전환, 섹션 네비게이션, 문의 폼 제출, Hero 섹션, Desktop/Mobile 레이아웃
- **High**: 다크모드, 모바일 네비게이션, FAQ, 폼 유효성 검사, 서비스 섹션, 캐러셀, 터치
- **Medium**: FAQ 언어 전환, 폼 라벨 전환, 파트너사 로고, 팀 섹션, 반응형 전환
- **Low**: FAQ 애니메이션, 스크롤 애니메이션

#### 2. 코드 리뷰 및 품질 검증

**Constitution 원칙 준수 확인**:
- [ ] Functional Components Only & Hooks First
- [ ] View & Logic Separation (10줄 이상 로직 → Hook 분리)
- [ ] Props Read-Only & Strict Typing (`any` 타입 사용 여부)
- [ ] Single Responsibility Principle (컴포넌트 책임 단일성)
- [ ] Security First (XSS 방지, `dangerouslySetInnerHTML` 사용 여부)

**TypeScript 타입 안전성**:
- [ ] `strict: true` 모드 활성화 확인
- [ ] 모든 Props, State, Function에 타입 정의
- [ ] `any`, `@ts-ignore`, `@ts-expect-error` 사용 금지
- [ ] Interface vs Type 일관성

**보안 점검**:
- [ ] XSS 취약점 검사
- [ ] CSRF 토큰 적용 (API 호출 시)
- [ ] 사용자 입력값 검증 (클라이언트 + 서버)
- [ ] 환경변수 `.gitignore` 포함 확인
- [ ] `npm audit` 실행 및 취약점 패치

**Props Mutation 검증**:
```typescript
// ❌ Bad: Props 직접 변경
function Component({ items }: { items: string[] }) {
  items.push('new'); // Mutation!
  return <div>{items.join(', ')}</div>;
}

// ✅ Good: 불변성 유지
function Component({ items }: { items: string[] }) {
  const newItems = [...items, 'new'];
  return <div>{newItems.join(', ')}</div>;
}
```

**관심사 분리 확인**:
- [ ] 컴포넌트 내 로직이 10줄 미만인가?
- [ ] 복잡한 로직이 Custom Hook으로 분리되었는가?
- [ ] 컴포넌트는 렌더링에만 집중하는가?

#### 3. 성능 검증

**Lighthouse 점수 측정**:
- **목표**: Performance Score **≥ 90**
- **측정 항목**:
  - LCP (Largest Contentful Paint) **< 2.5s**
  - FID (First Input Delay) **< 100ms**
  - CLS (Cumulative Layout Shift) **< 0.1**

**번들 크기 모니터링**:
- **목표**: Main Bundle **< 100KB** (gzip)
- **도구**: `rollup-plugin-visualizer` (Vite)

**Core Web Vitals**:
```bash
# Lighthouse CLI로 측정
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

**성능 최적화 확인**:
- [ ] Lazy Loading 적용 (라우트별 Code Splitting)
- [ ] React.memo() 사용 (불필요한 리렌더링 방지)
- [ ] useMemo(), useCallback() 적절히 사용
- [ ] 이미지 최적화 (WebP, lazy loading)

#### 4. 배포 검증

**GitHub Pages 배포 테스트**:
- [ ] `npm run build` 성공 확인
- [ ] `docs/` 디렉토리 정상 생성
- [ ] `docs/index.html` 존재
- [ ] `docs/404.html` SPA 라우팅 지원
- [ ] `docs/.nojekyll` 파일 존재

**환경별 설정 검증**:
- [ ] `.env.example` 파일 존재
- [ ] 실제 `.env` 파일 `.gitignore`에 포함
- [ ] `VITE_GOOGLE_MAPS_API_KEY` 설정 확인
- [ ] `VITE_APP_ENV` 설정 (development/production)

**빌드 프로세스 검증**:
```bash
# 빌드 성공 확인
npm run build

# Linting 통과 확인
npm run lint

# 테스트 통과 확인
npm test
```

**CI/CD 파이프라인 (DEPLOY-001)**:
- [ ] GitHub Actions 워크플로우 설정
- [ ] 자동 빌드 및 배포
- [ ] 테스트 자동 실행

---

## 🤝 협업 워크플로우

### 개발 프로세스

```
┌─────────────────┐
│  Claude Code    │
│  (개발)         │
└────────┬────────┘
         │
         │ 1. 기능 개발
         │    + 유닛 테스트 작성
         │    + Constitution 원칙 준수
         │
         ▼
┌─────────────────┐
│  Antigravity    │
│  (검증)         │
└────────┬────────┘
         │
         │ 2. E2E 테스트 시나리오 작성/실행
         │    + 코드 리뷰 (Constitution 체크)
         │    + 타입 안전성 검증
         │    + 보안 점검
         │
         ▼
┌─────────────────┐
│  Claude Code    │
│  (수정)         │
└────────┬────────┘
         │
         │ 3. 피드백 반영
         │    + 버그 수정
         │    + 리팩토링
         │
         ▼
┌─────────────────┐
│  Antigravity    │
│  (최종 검증)    │
└────────┬────────┘
         │
         │ 4. 성능 검증 (Lighthouse > 90)
         │    + 번들 크기 < 100KB
         │    + 배포 테스트
         │
         ▼
┌─────────────────┐
│  배포 완료      │
└─────────────────┘
```

### 문서 관리

| 문서 | 위치 | 담당 | 설명 |
|------|------|------|------|
| **Implementation Plan** | `.antigravity/implementation.md` | Claude Code | 아키텍처, 기술 결정 |
| **Task List** | `.antigravity/tasks.md` | Claude Code | Phase별 작업 목록 |
| **Walkthrough** | `.antigravity/walkthrough.md` | Claude Code | 변경 기록 |
| **Constitution** | `.specify/memory/constitution.md` | 공통 | 개발 원칙 (읽기 전용) |
| **E2E Scenarios** | `tests/e2e/scenarios/` | Antigravity | E2E 테스트 시나리오 |
| **AI Contributors** | `ai-contributors.md` | 공통 | AI 역할 정의 (이 문서) |

---

## 📅 우선순위 및 마일스톤

### 즉시 처리 (Priority: 🔴 Critical)

| 작업 | 담당 | 상태 |
|------|------|------|
| Phase 3 완성 (다국어 지원) | Claude Code | 🔄 95% 완료 |
| E2E 테스트 실행 | Antigravity | ⏳ 대기 (시나리오 작성 완료) |

### 단기 처리 (Priority: 🟡 High)

| 작업 | 담당 | 상태 |
|------|------|------|
| Phase 4 (Header, Footer 리팩토링) | Claude Code | ⏳ 대기 |
| Contact Form 백엔드 연동 | Claude Code | ⏳ 대기 |
| 코드 리뷰 (Constitution 준수) | Antigravity | ⏳ 대기 |

### 중기 처리 (Priority: 🟢 Medium)

| 작업 | 담당 | 상태 |
|------|------|------|
| 유닛 테스트 80% 커버리지 | Claude Code | ⏳ 대기 |
| SEO 최적화 완성 | Claude Code | ⏳ 대기 |
| 성능 최적화 검증 (Lighthouse) | Antigravity | ⏳ 대기 |

### 장기 처리 (Priority: ⚪ Low)

| 작업 | 담당 | 상태 |
|------|------|------|
| CI/CD 파이프라인 구성 | Antigravity | ⏳ 대기 |
| 프로덕션 배포 | Antigravity | ⏳ 대기 |

### 마일스톤 타임라인

| 마일스톤 | 목표일 | 담당 | 상태 |
|---------|--------|------|------|
| MVP 랜딩 페이지 | 2025-12-23 | Claude Code | ✅ 완료 |
| 다국어 지원 | 2025-12-24 | Claude Code | 🔄 진행 중 (95% 완료) |
| E2E 테스트 실행 | 2025-12-27 | Antigravity | ⏳ 대기 |
| 유닛 테스트 80% 커버리지 | 2025-12-27 | Claude Code | ⏳ 대기 |
| 프로덕션 배포 | 2025-12-30 | Antigravity | ⏳ 대기 |

---

## 📚 참고 문서

### 프로젝트 문서
- [Implementation Plan](./.antigravity/implementation.md) - 전체 구현 계획, 아키텍처, 기술 결정
- [Task List](./.antigravity/tasks.md) - Phase별 작업 목록 및 진행 상태
- [Walkthrough](./.antigravity/walkthrough.md) - 변경 기록 및 작업 일지

### 개발 원칙
- [Constitution](./.specify/memory/constitution.md) - 5가지 핵심 개발 원칙 및 표준 아키텍처

### 테스트
- [E2E Test Scenarios](./tests/e2e/scenarios/README.md) - E2E 테스트 시나리오 가이드
- [01-navigation-theme.md](./tests/e2e/scenarios/01-navigation-theme.md) - 네비게이션 및 테마 전환 테스트
- [02-faq-accordion.md](./tests/e2e/scenarios/02-faq-accordion.md) - FAQ 아코디언 테스트
- [03-contact-form.md](./tests/e2e/scenarios/03-contact-form.md) - 문의하기 폼 테스트
- [04-content-interaction.md](./tests/e2e/scenarios/04-content-interaction.md) - 컨텐츠 표시 및 인터랙션 테스트
- [05-responsive-design.md](./tests/e2e/scenarios/05-responsive-design.md) - 반응형 디자인 테스트

### 프로젝트 시작
- [README.md](./README.md) - 프로젝트 시작 가이드, 기술 스택, 빌드 명령어

---

## 🔧 도구 및 명령어

### Claude Code (개발)

```bash
# 개발 서버 시작
npm run dev

# 빌드
npm run build

# Linting
npm run lint

# 유닛 테스트
npm test

# 유닛 테스트 (watch 모드)
npm test -- --watch

# 커버리지 확인
npm test -- --coverage
```

### Antigravity (검증)

```bash
# E2E 테스트 실행
npx playwright test

# E2E 테스트 (UI 모드)
npx playwright test --ui

# E2E 테스트 (헤디드 모드 - 브라우저 표시)
npx playwright test --headed

# 특정 브라우저로 E2E 테스트
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Lighthouse 성능 측정
lighthouse http://localhost:3000 --view

# 보안 검사
npm audit

# 번들 크기 분석
npm run build
# (빌드 후 dist/ 폴더 크기 확인)
```

---

## 📊 품질 지표

### 테스트 커버리지
- **목표**: Statements ≥ 80%, Branches ≥ 75%
- **담당**: Claude Code (유닛 테스트 작성)
- **검증**: Antigravity (커버리지 리포트 확인)

### 성능 지표
- **목표**: Lighthouse Performance Score ≥ 90
- **담당**: Antigravity (Lighthouse 측정)
- **개선**: Claude Code (성능 최적화 코드 작성)

### 보안
- **목표**: `npm audit` 취약점 0건
- **담당**: Antigravity (정기 검사)
- **조치**: Claude Code (패키지 업데이트)

---

**Version**: 1.0.0 | **Last Updated**: 2026-02-03

> 💡 **협업 원칙**: 명확한 역할 분담과 상호 신뢰를 바탕으로, Claude Code는 개발에 집중하고 Antigravity는 품질 보증에 집중합니다. 두 AI의 협업을 통해 높은 품질의 프로덕션 코드를 만들어냅니다.
