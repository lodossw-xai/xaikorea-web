# 컨텐츠 표시 및 인터랙션 테스트 시나리오

## 요약

페이지의 주요 컨텐츠 섹션들이 올바르게 표시되고 사용자 인터랙션이 정상 작동하는지 검증합니다.

## 시나리오 ID: CONTENT-001

**제목**: Hero 섹션 표시 테스트
**설명**: 메인 Hero 섹션의 모든 요소가 올바르게 표시되는지 검증
**우선순위**: Critical

### 테스트 단계

1. **페이지 로드**
   - Playwright Action: `await page.goto('http://localhost:3000')`
   - 예상 결과: Hero 섹션이 화면 상단에 표시됨

2. **메인 헤딩 확인**
   - 예상 결과: "당신의 해답, 우리의 솔루션." 텍스트 표시

3. **서브 헤딩 확인**
   - 예상 결과: "XAI Korea와 함께 AI 솔루션을 구현하세요" 텍스트 표시

4. **CTA 버튼 확인**
   - 예상 결과: "시작하기" 또는 유사한 버튼 표시

### 검증 포인트

```typescript
// Hero 섹션 표시 확인
await expect(page.locator('#home')).toBeVisible();
await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
```

---

## 시나리오 ID: CONTENT-002

**제목**: 서비스 섹션 표시 테스트
**설명**: 서비스 섹션의 모든 카드가 올바르게 표시되는지 검증
**우선순위**: High

### 테스트 단계

1. **서비스 섹션으로 이동**
   - Playwright Action: `await page.locator('#services').scrollIntoViewIfNeeded()`
   - 예상 결과: 서비스 섹션이 화면에 표시됨

2. **서비스 카드 확인**
   - 예상 결과: RAG AI, AI 챗봇 등 서비스 카드들이 표시됨

3. **서비스 카드 호버 효과**
   - Playwright Action: `await page.locator('.service-card').first().hover()`
   - 예상 결과: 카드에 호버 효과 (그림자, 변형 등) 적용

### 검증 포인트

```typescript
// 서비스 카드 개수 확인
const serviceCards = page.locator('.service-card');
await expect(serviceCards).toHaveCount(3); // 예상 카드 개수
```

---

## 시나리오 ID: CONTENT-003

**제목**: 파트너사 로고 표시 테스트
**설명**: 파트너사 로고들이 올바르게 표시되고 스크롤되는지 검증
**우선순위**: Medium

### 테스트 단계

1. **파트너사 섹션 확인**
   - 예상 결과: 파트너사 로고들이 표시됨

2. **로고 스크롤 애니메이션 확인**
   - 예상 결과: 로고들이 자동으로 스크롤됨

3. **호버 시 애니메이션 일시정지**
   - Playwright Action: 파트너사 섹션에 마우스 호버
   - 예상 결과: 스크롤 애니메이션이 일시정지됨

---

## 시나리오 ID: CONTENT-004

**제목**: 자문단 캐러셀 테스트
**설명**: 자문단 섹션의 캐러셀이 정상 작동하는지 검증
**우선순위**: High

### 테스트 단계

1. **자문단 섹션으로 이동**
   - Playwright Action: `await page.locator('#advisors').scrollIntoViewIfNeeded()`
   - 예상 결과: 자문단 캐러셀이 표시됨

2. **다음 버튼 클릭**
   - Playwright Action: `await page.getByRole('button', { name: /next|다음/i }).click()`
   - 예상 결과: 다음 자문단 프로필로 이동

3. **이전 버튼 클릭**
   - Playwright Action: `await page.getByRole('button', { name: /prev|이전/i }).click()`
   - 예상 결과: 이전 자문단 프로필로 이동

4. **자동 슬라이드 확인**
   - 예상 결과: 일정 시간 후 자동으로 다음 슬라이드로 이동

### 검증 포인트

```typescript
// 캐러셀 슬라이드 개수 확인
const slides = page.locator('.advisor-slide');
await expect(slides).toHaveCount.toBeGreaterThan(0);
```

---

## 시나리오 ID: CONTENT-005

**제목**: 팀 소개 섹션 표시 테스트
**설명**: 팀 멤버 카드들이 올바르게 표시되는지 검증
**우선순위**: Medium

### 테스트 단계

1. **팀 소개 섹션으로 이동**
   - Playwright Action: `await page.locator('#team').scrollIntoViewIfNeeded()`
   - 예상 결과: 팀 멤버 카드들이 표시됨

2. **팀 멤버 카드 확인**
   - 예상 결과: 각 팀 멤버의 이름, 역할, 소개가 표시됨

3. **팀 멤버 카드 호버**
   - Playwright Action: 카드에 마우스 호버
   - 예상 결과: 호버 효과 적용

---

## 시나리오 ID: CONTENT-006

**제목**: 스크롤 애니메이션 테스트
**설명**: 스크롤 시 요소들이 애니메이션과 함께 나타나는지 검증
**우선순위**: Low

### 테스트 단계

1. **페이지 하단으로 스크롤**
   - Playwright Action: `await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))`
   - 예상 결과: 요소들이 부드럽게 나타남

2. **Fade-in 효과 확인**
   - 예상 결과: 각 섹션의 요소들이 스크롤 위치에 따라 페이드인됨

---

## 엣지 케이스 및 에러 시나리오

### EC-CONTENT-001: 이미지 로딩 실패

**설명**: 이미지가 로딩 실패했을 때 대체 이미지 또는 텍스트가 표시되는지 확인

**테스트 단계**:
```typescript
// 이미지 요청 차단
await page.route('**/*.{png,jpg,jpeg,webp}', route => route.abort());
await page.reload();
// 대체 컨텐츠 확인
```

### EC-CONTENT-002: 긴 텍스트 오버플로우

**설명**: 팀 멤버 소개 등에 매우 긴 텍스트가 있을 때 레이아웃이 깨지지 않는지 확인

---

## 크로스 브라우저/디바이스 고려사항

### 브라우저 호환성
- Chrome/Edge: 애니메이션 성능 확인
- Firefox: CSS Grid 레이아웃 확인
- Safari: 이미지 렌더링 품질 확인

### 반응형 디자인
| 디바이스 | 확인 사항 |
|----------|-----------|
| Desktop | 3단 그리드 레이아웃 |
| Tablet | 2단 그리드 레이아웃 |
| Mobile | 1단 스택 레이아웃 |

---

## 유지보수 노트

### 성능 고려사항
- 이미지 lazy loading 구현 확인
- 애니메이션이 성능에 영향을 주지 않는지 확인

### 접근성
- 모든 이미지에 alt 텍스트 있는지 확인
- 캐러셀 네비게이션이 키보드로 가능한지 확인
