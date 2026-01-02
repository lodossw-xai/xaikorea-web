# 네비게이션 및 테마 전환 테스트 시나리오

## 요약

페이지 네비게이션, 다크모드 토글, 언어 전환 등 기본 인터페이스 기능을 검증합니다.

## 시나리오 ID: NAV-001

**제목**: 다크모드/라이트모드 전환 테스트
**설명**: 테마 전환 버튼을 클릭하여 다크모드와 라이트모드가 정상적으로 전환되는지 검증
**우선순위**: High

### 사전 조건

- 브라우저가 http://localhost:3000 페이지에 접근 가능
- 페이지가 정상적으로 로드됨

### 테스트 단계

1. **페이지 로드 시 기본 테마 확인**
   - Playwright Action: `await page.goto('http://localhost:3000')`
   - 예상 결과: 라이트모드로 페이지 로드

2. **다크모드 전환 버튼 클릭**
   - Playwright Action: `await page.getByRole('button', { name: /dark mode/i }).click()`
   - 예상 결과:
     - 배경색이 `#0f172a`로 변경
     - Hero 섹션 배경이 `#0b1120`으로 변경
     - 텍스트 색상이 밝은 색으로 변경

3. **라이트모드 전환 버튼 클릭**
   - Playwright Action: `await page.getByRole('button', { name: /light mode/i }).click()`
   - 예상 결과:
     - 배경색이 `#ffffff`로 변경
     - 텍스트 색상이 어두운 색으로 변경

4. **테마 전환 후 페이지 새로고침**
   - Playwright Action: `await page.reload()`
   - 예상 결과: 선택한 테마가 유지됨 (localStorage 확인)

### 검증 포인트

```typescript
// 다크모드 확인
const html = page.locator('html');
await expect(html).toHaveClass(/dark/);

// 배경색 확인
const body = page.locator('body');
await expect(body).toHaveCSS('background-color', 'rgb(15, 23, 42)');
```

### 테스트 데이터

N/A

### 셀렉터

- 테마 토글 버튼: `page.getByRole('button', { name: /mode/i })`

---

## 시나리오 ID: NAV-002

**제목**: 언어 전환 (한국어/영어) 테스트
**설명**: 언어 전환 버튼을 통해 한국어와 영어 콘텐츠가 정상적으로 전환되는지 검증
**우선순위**: Critical

### 사전 조건

- 페이지가 정상적으로 로드됨
- 기본 언어는 한국어

### 테스트 단계

1. **기본 언어 확인**
   - Playwright Action: 페이지 로드 후 메인 헤딩 확인
   - 예상 결과: "당신의 해답, 우리의 솔루션." 텍스트 표시

2. **영어로 전환**
   - Playwright Action: `await page.getByRole('button', { name: 'EN' }).click()`
   - 예상 결과:
     - 메인 헤딩: "Your Answers, Our Solutions."
     - 네비게이션: "Home", "Services", "Advisors" 등

3. **한국어로 재전환**
   - Playwright Action: `await page.getByRole('button', { name: 'KR' }).click()`
   - 예상 결과: 모든 텍스트가 한국어로 복원

### 검증 포인트

```typescript
// 영어 전환 확인
await page.getByRole('button', { name: 'EN' }).click();
await expect(page.getByRole('heading', { level: 1 })).toContainText(/Your Answers/i);

// 한국어 전환 확인
await page.getByRole('button', { name: 'KR' }).click();
await expect(page.getByRole('heading', { level: 1 })).toContainText(/당신의 해답/);
```

### 테스트 데이터

| 언어 | 메인 헤딩 | 서비스 텍스트 |
|------|-----------|--------------|
| KR | 당신의 해답, 우리의 솔루션. | 서비스 |
| EN | Your Answers, Our Solutions. | Services |

---

## 시나리오 ID: NAV-003

**제목**: 섹션 네비게이션 테스트
**설명**: 네비게이션 메뉴를 통한 페이지 내 섹션 이동이 정상 작동하는지 검증
**우선순위**: Critical

### 테스트 단계

1. **"홈" 섹션 이동**
   - Playwright Action: `await page.getByRole('link', { name: '홈' }).click()`
   - 예상 결과: URL에 `#home` 추가, 페이지 최상단으로 스크롤

2. **"서비스" 섹션 이동**
   - Playwright Action: `await page.getByRole('link', { name: '서비스' }).click()`
   - 예상 결과: URL에 `#services` 추가, 서비스 섹션으로 스크롤

3. **"자문단" 섹션 이동**
   - Playwright Action: `await page.getByRole('link', { name: '자문단' }).click()`
   - 예상 결과: URL에 `#advisors` 추가

4. **"팀 소개" 섹션 이동**
   - Playwright Action: `await page.getByRole('link', { name: '팀 소개' }).click()`
   - 예상 결과: URL에 `#team` 추가

5. **"문의하기" 섹션 이동**
   - Playwright Action: `await page.getByRole('link', { name: '문의하기' }).click()`
   - 예상 결과: URL에 `#contact` 추가, 문의 폼 표시

### 검증 포인트

```typescript
await page.getByRole('link', { name: '서비스' }).click();
await expect(page).toHaveURL(/#services/);
```

---

## 시나리오 ID: NAV-004

**제목**: 모바일 반응형 네비게이션 테스트
**설명**: 모바일 뷰포트에서 네비게이션이 정상 작동하는지 검증
**우선순위**: High

### 사전 조건

- 뷰포트 크기: 375x812 (iPhone 크기)

### 테스트 단계

1. **모바일 뷰포트 설정**
   - Playwright Action: `await page.setViewportSize({ width: 375, height: 812 })`
   - 예상 결과: 모바일 레이아웃 표시

2. **네비게이션 메뉴 확인**
   - 예상 결과: 모바일에 적합한 네비게이션 표시

---

## 엣지 케이스 및 에러 시나리오

### EC-NAV-001: 빠른 연속 클릭 처리

**설명**: 테마 토글 버튼을 빠르게 여러 번 클릭했을 때 상태가 일관되게 유지되는지 확인

**테스트 단계**:
```typescript
// 빠른 연속 클릭
for (let i = 0; i < 10; i++) {
  await page.getByRole('button', { name: /mode/i }).click({ delay: 50 });
}
// 최종 상태가 일관성 있게 유지되는지 확인
```

---

## 크로스 브라우저/디바이스 고려사항

### 브라우저 호환성
- Chrome/Edge: 기본 테스트 환경
- Firefox: 다크모드 CSS 변수 적용 확인
- Safari: 부드러운 스크롤 동작 확인

### 디바이스별 테스트
| 디바이스 | 뷰포트 | 주요 확인 사항 |
|----------|--------|----------------|
| Desktop | 1920x1080 | 전체 네비게이션 표시 |
| Tablet | 768x1024 | 레이아웃 전환 |
| Mobile | 375x812 | 모바일 네비게이션 |

---

## 유지보수 노트

### 셀렉터 안정성
- **Good**: `getByRole('button', { name: /mode/i })` - 접근성 기반
- **Avoid**: `.theme-toggle` - CSS 클래스는 변경될 수 있음

### 불안정성 방지
- 테마 전환 후 애니메이션 완료 대기
- 섹션 이동 후 스크롤 완료 확인
