# 반응형 디자인 테스트 시나리오

## 요약

다양한 디바이스와 뷰포트 크기에서 페이지가 올바르게 표시되고 작동하는지 검증합니다.

## 시나리오 ID: RESPONSIVE-001

**제목**: 데스크톱 레이아웃 테스트
**설명**: 데스크톱 환경에서 모든 요소가 올바르게 배치되는지 검증
**우선순위**: Critical

### 사전 조건

- 뷰포트 크기: 1920x1080

### 테스트 단계

1. **뷰포트 설정**
   - Playwright Action: `await page.setViewportSize({ width: 1920, height: 1080 })`
   - 예상 결과: 데스크톱 레이아웃 적용

2. **네비게이션 바 확인**
   - 예상 결과:
     - 로고가 왼쪽에 표시
     - 메뉴 항목들이 가로로 배치
     - 언어 전환 및 테마 토글 버튼이 오른쪽에 표시

3. **컨텐츠 그리드 확인**
   - 예상 결과:
     - 서비스 카드가 3단으로 배치
     - 팀 멤버 카드가 적절한 그리드로 배치

### 검증 포인트

```typescript
await page.setViewportSize({ width: 1920, height: 1080 });
// 네비게이션 메뉴가 가로로 표시되는지 확인
await expect(page.locator('nav')).toHaveCSS('flex-direction', 'row');
```

---

## 시나리오 ID: RESPONSIVE-002

**제목**: 태블릿 레이아웃 테스트
**설명**: 태블릿 환경에서 레이아웃이 적절하게 조정되는지 검증
**우선순위**: High

### 사전 조건

- 뷰포트 크기: 768x1024 (iPad)

### 테스트 단계

1. **뷰포트 설정**
   - Playwright Action: `await page.setViewportSize({ width: 768, height: 1024 })`
   - 예상 결과: 태블릿 레이아웃 적용

2. **네비게이션 확인**
   - 예상 결과: 네비게이션이 적절하게 축소되거나 조정됨

3. **컨텐츠 그리드 확인**
   - 예상 결과:
     - 서비스 카드가 2단으로 재배치
     - 적절한 여백 및 간격 유지

### 검증 포인트

```typescript
await page.setViewportSize({ width: 768, height: 1024 });
// 컨텐츠가 2단으로 표시되는지 확인
const grid = page.locator('.service-grid');
await expect(grid).toHaveCSS('grid-template-columns', /repeat\(2/);
```

---

## 시나리오 ID: RESPONSIVE-003

**제목**: 모바일 레이아웃 테스트
**설명**: 모바일 환경에서 모든 요소가 올바르게 스택되고 작동하는지 검증
**우선순위**: Critical

### 사전 조건

- 뷰포트 크기: 375x812 (iPhone X)

### 테스트 단계

1. **뷰포트 설정**
   - Playwright Action: `await page.setViewportSize({ width: 375, height: 812 })`
   - 예상 결과: 모바일 레이아웃 적용

2. **네비게이션 확인**
   - 예상 결과: 모바일 네비게이션 (햄버거 메뉴 등) 표시

3. **컨텐츠 스택 확인**
   - 예상 결과:
     - 모든 카드가 1단으로 스택됨
     - 텍스트 크기가 모바일에 적합하게 조정됨
     - 터치 타겟 크기가 충분함 (최소 44x44px)

4. **Hero 섹션 확인**
   - 예상 결과:
     - 헤딩 텍스트가 줄바꿈되어 읽기 쉬움
     - 배경 이미지가 적절하게 표시됨

### 검증 포인트

```typescript
await page.setViewportSize({ width: 375, height: 812 });
// 모바일 레이아웃 확인
const cards = page.locator('.service-card');
for (const card of await cards.all()) {
  const box = await card.boundingBox();
  expect(box?.width).toBeLessThanOrEqual(375);
}
```

---

## 시나리오 ID: RESPONSIVE-004

**제목**: 가로/세로 모드 전환 테스트
**설명**: 모바일 디바이스를 회전했을 때 레이아웃이 적절하게 조정되는지 검증
**우선순위**: Medium

### 테스트 단계

1. **세로 모드 (Portrait)**
   - Playwright Action: `await page.setViewportSize({ width: 375, height: 812 })`
   - 예상 결과: 세로 모드 레이아웃

2. **가로 모드 (Landscape)**
   - Playwright Action: `await page.setViewportSize({ width: 812, height: 375 })`
   - 예상 결과: 가로 모드 레이아웃, 요소들이 재배치됨

3. **다시 세로 모드로 전환**
   - 예상 결과: 레이아웃이 원래대로 복원됨

---

## 시나리오 ID: RESPONSIVE-005

**제목**: 다양한 브레이크포인트 테스트
**설명**: 여러 브레이크포인트에서 레이아웃 전환이 부드럽게 이루어지는지 검증
**우선순위**: Medium

### 테스트 단계

1. **브레이크포인트별 테스트**
   - 뷰포트 크기를 점진적으로 변경
   - 예상 결과: 각 브레이크포인트에서 레이아웃이 깨지지 않음

### 테스트 데이터

| 브레이크포인트 | 뷰포트 크기 | 예상 레이아웃 |
|---------------|------------|-------------|
| Mobile Small | 320x568 | 1단 스택 |
| Mobile | 375x667 | 1단 스택 |
| Mobile Large | 414x896 | 1단 스택 |
| Tablet | 768x1024 | 2단 그리드 |
| Desktop | 1024x768 | 3단 그리드 |
| Desktop Large | 1440x900 | 3단 그리드 (넓은 간격) |
| Desktop XL | 1920x1080 | 3단 그리드 (최대 너비) |

### 검증 포인트

```typescript
const breakpoints = [
  { width: 320, height: 568, name: 'Mobile Small' },
  { width: 375, height: 667, name: 'Mobile' },
  { width: 768, height: 1024, name: 'Tablet' },
  { width: 1024, height: 768, name: 'Desktop' },
  { width: 1920, height: 1080, name: 'Desktop Large' }
];

for (const bp of breakpoints) {
  await page.setViewportSize({ width: bp.width, height: bp.height });
  // 레이아웃 깨짐 없는지 확인
  await expect(page.locator('body')).not.toHaveCSS('overflow-x', 'scroll');
}
```

---

## 시나리오 ID: RESPONSIVE-006

**제목**: 터치 인터랙션 테스트
**설명**: 모바일 터치 제스처가 정상 작동하는지 검증
**우선순위**: High

### 테스트 단계

1. **스와이프 제스처 (캐러셀)**
   - Playwright Action: 터치 이벤트 시뮬레이션
   - 예상 결과: 캐러셀이 스와이프로 이동됨

2. **탭 제스처**
   - Playwright Action: 요소를 탭
   - 예상 결과: 클릭과 동일하게 작동

3. **롱 프레스 테스트**
   - 예상 결과: 적절한 동작 (있는 경우)

---

## 엣지 케이스 및 에러 시나리오

### EC-RESPONSIVE-001: 매우 작은 화면

**설명**: 320px 미만의 매우 작은 화면에서도 컨텐츠가 접근 가능한지 확인

**테스트 단계**:
```typescript
await page.setViewportSize({ width: 280, height: 653 });
// 가로 스크롤이 발생하지 않는지 확인
```

### EC-RESPONSIVE-002: 매우 큰 화면

**설명**: 4K 해상도 등 매우 큰 화면에서 최대 너비 제한이 적용되는지 확인

**테스트 단계**:
```typescript
await page.setViewportSize({ width: 3840, height: 2160 });
// 컨텐츠가 적절한 최대 너비로 제한되는지 확인
```

### EC-RESPONSIVE-003: 브라우저 줌

**설명**: 브라우저 줌 레벨 변경 시 레이아웃이 깨지지 않는지 확인

---

## 크로스 브라우저/디바이스 고려사항

### 실제 디바이스 테스트

| 디바이스 | OS | 브라우저 | 주요 확인 사항 |
|----------|-----|---------|--------------|
| iPhone 13 | iOS 15 | Safari | 노치 영역, 세이프 에리어 |
| Samsung Galaxy S21 | Android 11 | Chrome | 하단 네비게이션 바 |
| iPad Pro | iPadOS 15 | Safari | 멀티태스킹 모드 |

### 브라우저별 고려사항

- **Safari (iOS)**: 뷰포트 높이 계산 (주소 표시줄 숨김 시)
- **Chrome (Android)**: 하단 툴바 공간
- **Firefox Mobile**: 터치 이벤트 처리

---

## 유지보수 노트

### CSS 미디어 쿼리 확인
```css
/* 주요 브레이크포인트 */
@media (max-width: 640px) { /* Mobile */ }
@media (min-width: 641px) and (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1025px) { /* Desktop */ }
```

### 반응형 이미지
- `srcset` 속성 사용 확인
- 디바이스별 적절한 이미지 크기 제공

### 성능 최적화
- 모바일에서 불필요한 리소스 로딩 방지
- Critical CSS 인라인 적용
