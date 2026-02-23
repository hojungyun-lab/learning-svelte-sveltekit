# 🔐 Step 12: 인증 & Hooks

## 학습 목표
- `hooks.server.ts` 미들웨어
- `event.locals`로 요청 데이터 공유
- 쿠키 기반 세션 관리
- 보호된 라우트

---

## 개념 설명

```typescript
// src/hooks.server.ts — 모든 요청에 실행
export const handle = async ({ event, resolve }) => {
  const token = event.cookies.get('session');
  event.locals.user = token ? validateSession(token) : null;

  if (event.url.pathname.startsWith('/dashboard') && !event.locals.user) {
    return new Response(null, { status: 302, headers: { Location: '/login' } });
  }

  return await resolve(event);
};
```

---

## 실습: 파일 생성

### 1. `src/hooks.server.ts` 생성

```typescript
import type { Handle } from '@sveltejs/kit';

const sessions = new Map<string, { id: string; name: string; email: string }>();

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('session');
  event.locals.user = token && sessions.has(token) ? sessions.get(token)! : null;

  if (event.url.pathname.startsWith('/dashboard') && !event.locals.user) {
    return new Response(null, { status: 302, headers: { Location: '/login' } });
  }

  return await resolve(event);
};

export function createSession(user: { id: string; name: string; email: string }): string {
  const token = crypto.randomUUID();
  sessions.set(token, user);
  return token;
}

export function deleteSession(token: string): void {
  sessions.delete(token);
}
```

### 2. `src/routes/login/+page.server.ts` 생성

```typescript
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { createSession } from '../../hooks.server';

const USERS = [
  { id: '1', name: '홍길동', email: 'hong@test.com', password: 'password123' }
];

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) redirect(302, '/dashboard');
  return {};
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    const user = USERS.find(u => u.email === email && u.password === password);
    if (!user) return fail(401, { email, error: '인증 실패' });

    const token = createSession({ id: user.id, name: user.name, email: user.email });
    cookies.set('session', token, { path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24 });
    redirect(302, '/dashboard');
  }
};
```

### 3. `src/routes/login/+page.svelte` 생성

```svelte
<script lang="ts">
  import { enhance } from '$app/forms';
  let { form } = $props();
</script>

<h1>🔑 로그인</h1>
<form method="POST" use:enhance class="form">
  <input name="email" type="email" value={form?.email ?? ''} placeholder="hong@test.com" />
  <input name="password" type="password" placeholder="password123" />
  {#if form?.error}<p class="error">❌ {form.error}</p>{/if}
  <button type="submit">로그인</button>
  <p class="hint">테스트: hong@test.com / password123</p>
</form>

<style>
  .form { max-width: 400px; display: flex; flex-direction: column; gap: 0.5rem; padding: 2rem; background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
  input { padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; }
  button { padding: 0.75rem; background: #ff3e00; color: white; border: none; border-radius: 8px; cursor: pointer; }
  .error { color: #f44336; } .hint { color: #999; font-size: 0.8rem; text-align: center; }
</style>
```

### 4. `src/routes/dashboard/+page.server.ts` 생성

```typescript
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) redirect(302, '/login');
  return { user: locals.user };
};
```

### 5. `src/routes/dashboard/+page.svelte` 생성

```svelte
<script lang="ts">
  let { data } = $props();
</script>

<h1>📊 대시보드</h1>
<p>환영합니다, <strong>{data.user.name}</strong>님!</p>
<p>이메일: {data.user.email}</p>
```

---

## 확인

- `/dashboard` 접속 → `/login`으로 리다이렉트
- 로그인 후 → `/dashboard` 접근 가능
- 잘못된 비밀번호 → 에러 메시지

---

## 🎯 다음 단계

[14-deployment.md](./14-deployment.md) →
