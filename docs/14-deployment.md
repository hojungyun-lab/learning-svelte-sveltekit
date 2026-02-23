# 🚢 Step 13: 배포

## 학습 목표
- SvelteKit Adapter 이해
- `adapter-node`로 Node.js 서버 배포
- `adapter-static`으로 정적 사이트
- 환경 변수 (`$env`)

---

## 1. Adapters

| Adapter | 용도 | 패키지 |
|---------|------|--------|
| `adapter-auto` | 자동 감지 (기본) | `@sveltejs/adapter-auto` |
| `adapter-node` | Node.js 서버 | `@sveltejs/adapter-node` |
| `adapter-static` | 정적 사이트 | `@sveltejs/adapter-static` |
| `adapter-vercel` | Vercel | `@sveltejs/adapter-vercel` |

---

## 2. Node.js 배포

```bash
npm install -D @sveltejs/adapter-node
```

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter({ out: 'build', precompress: true })
  }
};
```

```bash
npm run build
node build/index.js    # 프로덕션 서버 시작
```

---

## 3. Docker 프로덕션 빌드

```dockerfile
# ── Stage 1: 빌드 단계 ──
FROM node:22-alpine AS builder
WORKDIR /app

# package.json과 package-lock.json만 먼저 복사합니다.
# (소스 코드 변경 없이 의존성만 바뀌었을 때 Docker 캐시를 활용하기 위함)
COPY package*.json ./

# npm ci: package-lock.json을 기반으로 정확한 버전의 의존성을 설치합니다.
# npm install과 달리 lock 파일을 절대 수정하지 않아 빌드 재현성이 보장됩니다.
RUN npm ci

# 나머지 소스 코드를 복사합니다.
COPY . .

# SvelteKit 프로덕션 빌드를 실행합니다.
# 결과물은 build/ 폴더에 생성됩니다.
RUN npm run build

# 빌드 후 devDependencies를 제거하여 node_modules 크기를 줄입니다.
# (프로덕션 실행에 필요한 dependencies만 남김)
RUN npm prune --production

# ── Stage 2: 실행 단계 ──
# 빌드 도구 없이 최소한의 파일만 가져와 이미지 크기를 최소화합니다 (멀티 스테이지 빌드)
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]
```

---

## 4. 환경 변수

```bash
# .env
PUBLIC_API_URL=https://api.example.com  # 클라이언트 접근 가능
SECRET_KEY=supersecret                   # 서버 전용
```

```typescript
import { SECRET_KEY } from '$env/static/private';       // 서버만
import { PUBLIC_API_URL } from '$env/static/public';     // 클라이언트도
```

---

## 실습

```bash
# basic-app에서 빌드 테스트
cd examples/basic-app
npm run build
```

빌드가 성공하면 배포 준비 완료! ✅

---

## 🎯 다음 단계

이제 모든 핵심 개념을 배웠습니다. 마지막으로 실전 프로젝트를 만들어봅시다!

**별도의 프로젝트를 처음부터 빌드합니다:**

```bash
cd examples/
npx -y sv create todo-app --template minimal --types ts
cd todo-app
npm install
```

Todo 앱 구현 가이드는 아래 README를 참고하세요:
→ `examples/todo-app/README.md`
