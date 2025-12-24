# Netlify Functions + Google Sheets API 연동 가이드

이 문서는 Netlify Functions를 사용하여 Contact 폼 데이터를 Google Sheets에 저장하는 방법을 설명합니다.

## 아키텍처

```
[GitHub Pages]          [Netlify (API 서버)]         [Google Sheets]
     |                          |                          |
     |  POST /submit-contact    |                          |
     | -----------------------> |                          |
     |                          |  Google Sheets API       |
     |                          | -----------------------> |
     |                          |                          |
     |  { success: true }       |                          |
     | <----------------------- |                          |
```

## 1. Google Cloud Console 설정

### 1.1 프로젝트 생성

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. **새 프로젝트 만들기** 클릭
3. 프로젝트 이름: `XAI Korea Contact Form`

### 1.2 Google Sheets API 활성화

1. **API 및 서비스** > **라이브러리**로 이동
2. "Google Sheets API" 검색
3. **사용 설정** 클릭

### 1.3 서비스 계정 생성

1. **API 및 서비스** > **사용자 인증 정보**로 이동
2. **사용자 인증 정보 만들기** > **서비스 계정**
3. 서비스 계정 정보 입력:
   - 이름: `contact-form-service`
   - 설명: `Contact form submission handler`
4. **만들기 및 계속하기** 클릭
5. 역할: **편집자** 선택 후 **계속**
6. **완료** 클릭

### 1.4 서비스 계정 키 생성

1. 생성된 서비스 계정 클릭
2. **키** 탭 > **키 추가** > **새 키 만들기**
3. 유형: **JSON** 선택
4. 다운로드된 JSON 파일에서 다음 정보를 복사:
   - `client_email`
   - `private_key`

## 2. Google Sheets 설정

### 2.1 스프레드시트 생성

1. [Google Sheets](https://sheets.google.com)에서 새 스프레드시트 생성
2. 첫 번째 행에 헤더 추가:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Company`
   - D1: `Email`
   - E1: `Inquiry Type`
   - F1: `Message`

### 2.2 서비스 계정 권한 부여

1. 스프레드시트 우측 상단 **공유** 클릭
2. 서비스 계정 이메일 (`xxx@xxx.iam.gserviceaccount.com`) 추가
3. 권한: **편집자**
4. **보내기** 클릭

### 2.3 스프레드시트 ID 복사

URL에서 스프레드시트 ID를 복사합니다:

```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
```

## 3. Netlify 설정

### 3.1 새 Netlify 사이트 생성

**방법 1: GitHub 연결**

1. [Netlify](https://netlify.com) 로그인
2. **Add new site** > **Import an existing project**
3. GitHub 연결 후 레포지토리 선택
4. 빌드 설정:
   - Branch to deploy: `main`
   - Base directory: (비워두기)
   - Build command: `echo "API only"`
   - Publish directory: `public`

**방법 2: 수동 배포 (별도 레포)**
별도의 API 전용 레포지토리를 생성하고 배포할 수도 있습니다.

### 3.2 환경 변수 설정

Netlify Dashboard > **Site settings** > **Environment variables**에서 다음 변수 추가:

| 변수명                         | 값                                 | 설명                             |
| ------------------------------ | ---------------------------------- | -------------------------------- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `xxx@xxx.iam.gserviceaccount.com`  | 서비스 계정 이메일               |
| `GOOGLE_PRIVATE_KEY`           | `-----BEGIN PRIVATE KEY-----\n...` | 서비스 계정 비밀키 (줄바꿈 포함) |
| `GOOGLE_SPREADSHEET_ID`        | `1abc...xyz`                       | 스프레드시트 ID                  |
| `ALLOWED_ORIGIN`               | `https://yourusername.github.io`   | GitHub Pages URL (CORS)          |

> **중요**: `GOOGLE_PRIVATE_KEY`는 `\n`을 실제 줄바꿈으로 유지해야 합니다.

### 3.3 Dependencies 설치

netlify/functions 디렉토리에서:

```bash
cd netlify
npm install
```

### 3.4 배포

```bash
# Netlify CLI 설치 (처음만)
npm install -g netlify-cli

# 로그인
netlify login

# 사이트 연결
netlify link

# 배포
netlify deploy --prod
```

## 4. 프론트엔드 설정

### 4.1 환경 변수 추가

프로젝트 루트의 `.env` 파일:

```env
VITE_CONTACT_API_URL=https://your-api-site.netlify.app/.netlify/functions/submit-contact
```

### 4.2 GitHub Repository Secrets

GitHub Actions 배포를 위해:

1. **Settings** > **Secrets and variables** > **Actions**
2. 다음 시크릿 추가:
   - Name: `VITE_CONTACT_API_URL`
   - Value: Netlify Functions URL

## 5. 테스트

### 5.1 로컬 테스트

```bash
# Netlify Functions 로컬 실행
cd netlify
netlify dev

# 다른 터미널에서 프론트엔드 실행
npm run dev
```

### 5.2 API 직접 테스트

```bash
curl -X POST https://your-api-site.netlify.app/.netlify/functions/submit-contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "테스트",
    "company": "테스트 회사",
    "email": "test@example.com",
    "inquiryType": "service",
    "message": "테스트 메시지"
  }'
```

## 6. 보안

### 6.1 CORS 설정

- `ALLOWED_ORIGIN` 환경 변수로 허용된 도메인만 API 호출 가능
- 예: `https://yourusername.github.io`

### 6.2 Rate Limiting

- Netlify Functions는 기본적으로 rate limiting이 있음
- 추가 보호가 필요하면 reCAPTCHA 통합 권장

### 6.3 환경 변수 보안

- 모든 민감한 정보는 Netlify 환경 변수로 관리
- `.env` 파일은 `.gitignore`에 포함

## 문제 해결

### "CORS error"

- `ALLOWED_ORIGIN`이 올바른 GitHub Pages URL인지 확인
- 프로토콜(https)과 도메인이 정확히 일치해야 함

### "Google API error"

- 서비스 계정이 스프레드시트에 접근 권한이 있는지 확인
- `GOOGLE_PRIVATE_KEY`의 줄바꿈이 올바르게 처리되었는지 확인

### "Function timeout"

- Netlify Functions 기본 타임아웃은 10초
- 필요시 `netlify.toml`에서 연장 가능

## 파일 구조

```
xaikorea_web/
├── netlify/
│   ├── functions/
│   │   └── submit-contact.ts   # Netlify Function
│   └── package.json            # Functions 의존성
├── netlify.toml                 # Netlify 설정
├── public/
│   └── index.html              # API 서버 랜딩 페이지
└── docs/
    └── netlify-functions-setup.md  # 이 문서
```
