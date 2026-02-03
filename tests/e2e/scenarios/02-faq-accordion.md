# FAQ 아코디언 테스트 시나리오

## 요약

FAQ 섹션의 아코디언 컴포넌트가 정상적으로 열리고 닫히는지 검증합니다.

## 시나리오 ID: FAQ-001

**제목**: FAQ 아코디언 열기/닫기 테스트
**설명**: FAQ 질문을 클릭하여 답변이 표시되고 다시 클릭하면 숨겨지는지 검증
**우선순위**: High

### 사전 조건

- FAQ 섹션이 화면에 표시됨
- 모든 FAQ 항목이 기본적으로 닫혀있음

### 테스트 단계

1. **FAQ 섹션으로 이동**
   - Playwright Action: `await page.locator('#faq').scrollIntoViewIfNeeded()`
   - 예상 결과: FAQ 섹션이 화면에 표시됨

2. **첫 번째 FAQ 항목 클릭**
   - Playwright Action: `await page.getByRole('button', { name: /첫 번째 질문/ }).click()`
   - 예상 결과: 답변 내용이 펼쳐지며 표시됨

3. **동일한 FAQ 항목 다시 클릭**
   - Playwright Action: `await page.getByRole('button', { name: /첫 번째 질문/ }).click()`
   - 예상 결과: 답변 내용이 접히며 숨겨짐

4. **여러 FAQ 항목 동시 열기**
   - Playwright Action: 첫 번째, 두 번째, 세 번째 FAQ 순차적으로 클릭
   - 예상 결과: 각 FAQ 항목이 독립적으로 열림 (accordion이 아닌 경우)

### 검증 포인트

```typescript
// FAQ 항목 클릭 전
const answer = page.locator('[data-testid="faq-answer-1"]');
await expect(answer).toBeHidden();

// FAQ 항목 클릭 후
await page.getByRole('button', { name: /질문/ }).first().click();
await expect(answer).toBeVisible();
```

### 테스트 데이터

N/A

### 셀렉터

- FAQ 질문 버튼: `page.getByRole('button', { name: /질문 텍스트/ })`
- FAQ 답변: `page.locator('[data-testid="faq-answer"]')`

---

## 시나리오 ID: FAQ-002

**제목**: FAQ 언어 전환 테스트
**설명**: 언어를 전환했을 때 FAQ 질문과 답변이 올바른 언어로 표시되는지 검증
**우선순위**: Medium

### 테스트 단계

1. **한국어 FAQ 확인**
   - 예상 결과: FAQ 질문과 답변이 한국어로 표시

2. **영어로 전환**
   - Playwright Action: `await page.getByRole('button', { name: 'EN' }).click()`
   - 예상 결과: FAQ 질문과 답변이 영어로 변경

3. **FAQ 열기/닫기 동작 확인**
   - 예상 결과: 언어 전환 후에도 아코디언 기능 정상 작동

---

## 시나리오 ID: FAQ-003

**제목**: FAQ 아코디언 애니메이션 테스트
**설명**: FAQ가 부드럽게 열리고 닫히는 애니메이션이 작동하는지 검증
**우선순위**: Low

### 테스트 단계

1. **FAQ 열기 애니메이션**
   - Playwright Action: FAQ 버튼 클릭
   - 예상 결과: 답변이 부드럽게 펼쳐짐 (transition 확인)

2. **FAQ 닫기 애니메이션**
   - Playwright Action: 열린 FAQ 버튼 다시 클릭
   - 예상 결과: 답변이 부드럽게 접힘

---

## 엣지 케이스 및 에러 시나리오

### EC-FAQ-001: 빠른 연속 클릭

**설명**: FAQ 버튼을 빠르게 여러 번 클릭했을 때 상태가 일관되게 유지되는지 확인

**테스트 단계**:
```typescript
const faqButton = page.getByRole('button', { name: /질문/ }).first();
// 빠른 연속 클릭
for (let i = 0; i < 5; i++) {
  await faqButton.click({ delay: 100 });
}
// 최종 상태 확인
```

### EC-FAQ-002: 모든 FAQ 동시 열기

**설명**: 모든 FAQ 항목을 동시에 열었을 때 레이아웃이 깨지지 않는지 확인

---

## 크로스 브라우저/디바이스 고려사항

### 브라우저 호환성
- Chrome/Edge: 애니메이션 부드러움 확인
- Firefox: transition 동작 확인
- Safari: 터치 이벤트 확인

### 모바일 반응형
| 디바이스 | 확인 사항 |
|----------|-----------|
| Mobile | FAQ 버튼 터치 영역 충분한지 확인 |
| Tablet | 레이아웃 적절한지 확인 |

---

## 유지보수 노트

### 셀렉터 안정성
- data-testid 속성 추가 권장: `data-testid="faq-item-{id}"`
- ARIA 속성 활용: `aria-expanded="true/false"`
