# Svelte 5 & SvelteKit 학습 가이드

> Svelte 5(Runes) & SvelteKit 2를 **기초부터 실전까지** 단계별로 학습합니다.

## 📁 프로젝트 구조

```
docs/             # 학습 가이드 (단계별 마크다운)
examples/         # 🌟 완성된 참고용 데모 프로젝트
├── basic-app/    # Steps 01-13 기반의 통합 데모 앱
└── todo-app/     # Step 14 풀스택 실전 Todo 데모 앱
```

## 🚀 시작하기

### 1. 환경 확인
```bash
node --version    # v20+ 또는 v22+
npm --version     # 10+
```

### 2. 학습자용 프로젝트(my-app) 생성
학습자가 직접 코드를 따라 치며 배울 수 있는 나만의 Svelte 앱을 프로젝트 루트에 생성합니다. (`.gitignore`에 의해 깃에는 추적되지 않습니다.)
```bash
npx -y sv create my-app --template minimal --types ts
# 화살표키로 아무것도 선택하지 않고(✘ 표시 유지) Enter

cd my-app
npm install
npm install -D vitest @testing-library/svelte jsdom
npm run dev -- --open
```

### 3. (선택) 완성된 데모 앱 구동해보기
이 프로젝트가 최종적으로 어떤 모습을 갖추게 되는지 미리 보고 싶다면 `examples/` 내부의 앱을 실행해보세요.
```bash
cd examples/basic-app
npm install
npm run dev
```

### 4. 학습 가이드를 따라 코드 작성
`docs/` 폴더의 마크다운을 순서대로 읽으며 방금 만든 `my-app`에 코드를 추가해 나갑니다.

---

## 📚 학습 목차

### Svelte 기초
| # | 주제 | 핵심 내용 |
|---|------|----------|
| [00](docs/00-environment-setup.md) | 🛠️ 환경 설정 | Node.js, VS Code, 프로젝트 생성 |
| [01](docs/01-typescript-for-svelte.md) | 📘 TypeScript 코어 | Svelte를 위한 최소한의 TS 문법 |
| [02](docs/02-svelte-basics.md) | 🧱 Svelte 기초 | 컴포넌트, 템플릿 표현식, `$props` |
| [03](docs/03-runes.md) | 🔮 Runes | `$state`, `$derived`, `$effect` |
| [04](docs/04-events-bindings.md) | 🎯 이벤트 & 바인딩 | `onclick`, `bind:value` |
| [05](docs/05-control-flow.md) | 🔄 제어 흐름 | `{#if}`, `{#each}`, `{#await}` |
| [06](docs/06-components-advanced.md) | 🧩 컴포넌트 심화 | Snippets, Context API |

### SvelteKit
| # | 주제 | 핵심 내용 |
|---|------|----------|
| [07](docs/07-sveltekit-routing.md) | 🗺️ 라우팅 | 파일 기반 라우팅, 동적 라우트 |
| [08](docs/08-data-loading.md) | 📡 데이터 로딩 | `load` 함수, SSR |
| [09](docs/09-form-actions.md) | 📝 Form Actions | 서버 통신, `use:enhance` |
| [10](docs/10-state-management.md) | 🏪 상태 관리 | `.svelte.ts` 공유 스토어 |
| [11](docs/11-styling-animations.md) | 🎨 애니메이션 | 트랜지션, FLIP |
| [12](docs/12-api-routes.md) | 🔌 API 라우트 | `+server.ts` REST API |

### 고급 & 실전
| # | 주제 | 핵심 내용 |
|---|------|----------|
| [13](docs/13-auth-hooks.md) | 🔐 인증 & Hooks | 미들웨어, 세션, 보호 라우트 |
| [14](docs/14-deployment.md) | 🚢 배포 | Adapters, Docker, 환경변수 |
| [15](docs/15-todo-project.md) | 🏗️ 실전 프로젝트 | 풀스택 Todo 앱 (처음부터 빌드) |

---

## 📋 빠른 참조

→ [CHEATSHEET.md](CHEATSHEET.md)
