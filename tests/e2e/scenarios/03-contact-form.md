# 문의하기 폼 테스트 시나리오

## 요약

문의하기 폼의 입력, 유효성 검사, 제출 기능을 검증합니다.

## 시나리오 ID: CONTACT-001

**제목**: 문의하기 폼 정상 제출 테스트
**설명**: 모든 필수 항목을 올바르게 입력하고 폼을 제출했을 때 정상 처리되는지 검증
**우선순위**: Critical

### 사전 조건

- 문의하기 섹션이 화면에 표시됨
- 폼이 초기 상태 (모든 필드 비어있음)

### 테스트 단계

1. **문의하기 섹션으로 이동**
   - Playwright Action: `await page.getByRole('link', { name: '문의하기' }).click()`
   - 예상 결과: 문의 폼 섹션이 화면에 표시됨

2. **이름 입력**
   - Playwright Action: `await page.getByLabel(/이름|name/i).fill('홍길동')`
   - 예상 결과: 입력값이 필드에 표시됨

3. **이메일 입력**
   - Playwright Action: `await page.getByLabel(/이메일|email/i).fill('test@example.com')`
   - 예상 결과: 올바른 이메일 형식 입력됨

4. **회사명 입력 (선택사항)**
   - Playwright Action: `await page.getByLabel(/회사|company/i).fill('테스트 회사')`
   - 예상 결과: 입력값이 필드에 표시됨

5. **문의 내용 입력**
   - Playwright Action: `await page.getByLabel(/문의|message/i).fill('테스트 문의 내용입니다.')`
   - 예상 결과: 여러 줄의 텍스트 입력 가능

6. **폼 제출**
   - Playwright Action: `await page.getByRole('button', { name: /제출|submit/i }).click()`
   - 예상 결과:
     - 성공 메시지 표시
     - 폼 필드가 초기화됨

### 검증 포인트

```typescript
// 폼 제출 후 성공 메시지 확인
await expect(page.getByText(/성공|success/i)).toBeVisible();

// 폼 필드 초기화 확인
await expect(page.getByLabel(/이름|name/i)).toHaveValue('');
```

### 테스트 데이터

| 필드 | 값 | 필수 여부 |
|------|-----|----------|
| 이름 | 홍길동 | 필수 |
| 이메일 | test@example.com | 필수 |
| 회사명 | 테스트 회사 | 선택 |
| 문의 내용 | 테스트 문의 내용입니다. | 필수 |

---

## 시나리오 ID: CONTACT-002

**제목**: 필수 항목 미입력 시 유효성 검사 테스트
**설명**: 필수 항목을 입력하지 않고 제출했을 때 적절한 에러 메시지가 표시되는지 검증
**우선순위**: High

### 테스트 단계

1. **이름 미입력 상태에서 제출**
   - Playwright Action: `await page.getByRole('button', { name: /제출|submit/i }).click()`
   - 예상 결과: "이름을 입력해주세요" 에러 메시지 표시

2. **이메일 미입력 상태에서 제출**
   - Playwright Action: 이름만 입력 후 제출
   - 예상 결과: "이메일을 입력해주세요" 에러 메시지 표시

3. **문의 내용 미입력 상태에서 제출**
   - Playwright Action: 이름, 이메일만 입력 후 제출
   - 예상 결과: "문의 내용을 입력해주세요" 에러 메시지 표시

### 검증 포인트

```typescript
// 필수 항목 미입력 시 에러 메시지 확인
await page.getByRole('button', { name: /제출/i }).click();
await expect(page.getByText(/필수 항목/i)).toBeVisible();
```

---

## 시나리오 ID: CONTACT-003

**제목**: 이메일 형식 유효성 검사 테스트
**설명**: 잘못된 이메일 형식 입력 시 적절한 에러 메시지가 표시되는지 검증
**우선순위**: High

### 테스트 단계

1. **유효하지 않은 이메일 형식 입력**
   - Playwright Action: `await page.getByLabel(/이메일/i).fill('invalid-email')`
   - 예상 결과: "올바른 이메일 형식을 입력해주세요" 메시지 표시

2. **@ 기호 없는 이메일**
   - Playwright Action: `await page.getByLabel(/이메일/i).fill('testexample.com')`
   - 예상 결과: 유효성 검사 실패

3. **도메인 없는 이메일**
   - Playwright Action: `await page.getByLabel(/이메일/i).fill('test@')`
   - 예상 결과: 유효성 검사 실패

### 테스트 데이터

| 입력값 | 유효 여부 | 예상 결과 |
|--------|----------|----------|
| test@example.com | ✓ | 통과 |
| invalid-email | ✗ | 에러 |
| test@example | ✗ | 에러 |
| @example.com | ✗ | 에러 |

---

## 시나리오 ID: CONTACT-004

**제목**: 언어 전환 시 폼 라벨 변경 테스트
**설명**: 언어를 전환했을 때 폼의 라벨과 플레이스홀더가 올바르게 변경되는지 검증
**우선순위**: Medium

### 테스트 단계

1. **영어로 전환**
   - Playwright Action: `await page.getByRole('button', { name: 'EN' }).click()`
   - 예상 결과:
     - "이름" → "Name"
     - "이메일" → "Email"
     - "문의 내용" → "Message"

2. **입력 중 언어 전환**
   - Playwright Action: 폼에 데이터 입력 후 언어 전환
   - 예상 결과: 입력된 데이터는 유지되고 라벨만 변경됨

---

## 엣지 케이스 및 에러 시나리오

### EC-CONTACT-001: 긴 텍스트 입력

**설명**: 문의 내용에 매우 긴 텍스트를 입력했을 때 처리되는지 확인

**테스트 단계**:
```typescript
const longText = 'A'.repeat(5000);
await page.getByLabel(/문의/i).fill(longText);
// 글자 수 제한 또는 스크롤 동작 확인
```

### EC-CONTACT-002: 특수 문자 입력

**설명**: 이름과 내용에 특수 문자를 입력했을 때 올바르게 처리되는지 확인

**테스트 데이터**:
- 이름: `<script>alert('XSS')</script>`
- 예상 결과: 특수 문자가 이스케이프되어 안전하게 처리됨

### EC-CONTACT-003: 네트워크 에러 시뮬레이션

**설명**: 폼 제출 중 네트워크 에러 발생 시 적절한 에러 메시지 표시

```typescript
// 네트워크 요청 차단
await page.route('**/api/contact', route => route.abort());
await page.getByRole('button', { name: /제출/i }).click();
await expect(page.getByText(/에러|error/i)).toBeVisible();
```

---

## 크로스 브라우저/디바이스 고려사항

### 브라우저 호환성
- Chrome/Edge: 자동완성 기능 테스트
- Firefox: 폼 유효성 검사 메시지 스타일
- Safari: iOS 자동 대문자 변환 처리

### 모바일 반응형
| 디바이스 | 확인 사항 |
|----------|-----------|
| Mobile | 키보드 표시 시 레이아웃, 입력 필드 크기 |
| Tablet | 터치 입력 정확도 |

---

## 유지보수 노트

### 셀렉터 안정성
- 라벨 텍스트 기반 셀렉터 사용: `getByLabel()`
- ARIA 레이블 추가 권장

### 테스트 데이터 관리
- 유효/무효 이메일 패턴을 상수로 관리
- 다국어 라벨 매핑 테이블 유지
