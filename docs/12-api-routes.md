# 🔌 Step 11: API 라우트

## 학습 목표
- `+server.ts`로 REST API 구현
- GET, POST 메서드
- JSON 응답 및 에러 처리
- 프론트엔드에서 API 호출

---

## 개념 설명

```typescript
// src/routes/api/items/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return json({ items: [] });
};

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  return json(result, { status: 201 });
};
```

---

## 실습: 파일 생성

### 1. `src/routes/api/memos/+server.ts` 생성

```typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface Memo { id: number; text: string; createdAt: string; }

const memos: Memo[] = [
  { id: 1, text: 'Svelte 5 학습하기', createdAt: '2026-02-20T10:00:00Z' },
  { id: 2, text: 'API 라우트 이해하기', createdAt: '2026-02-20T11:00:00Z' }
];
let nextId = 3;

export const GET: RequestHandler = async ({ url }) => {
  const q = url.searchParams.get('q');
  const results = q ? memos.filter(m => m.text.includes(q)) : memos;
  return json({ memos: results, total: results.length });
};

export const POST: RequestHandler = async ({ request }) => {
  const { text } = await request.json();
  if (!text || text.trim().length < 2) {
    return json({ error: '메모는 2자 이상' }, { status: 400 });
  }
  const memo: Memo = { id: nextId++, text: text.trim(), createdAt: new Date().toISOString() };
  memos.push(memo);
  return json({ memo }, { status: 201 });
};
```

### 2. `src/routes/memos/+page.svelte` 생성

```svelte
<script lang="ts">
  import { onMount } from 'svelte';

  interface Memo { id: number; text: string; createdAt: string; }

  let memos = $state<Memo[]>([]);
  let newMemo = $state('');
  let loading = $state(true);

  async function fetchMemos() {
    loading = true;
    const res = await fetch('/api/memos');
    const data = await res.json();
    memos = data.memos;
    loading = false;
  }

  async function addMemo() {
    if (!newMemo.trim()) return;
    const res = await fetch('/api/memos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newMemo })
    });
    if (res.ok) {
      const data = await res.json();
      memos = [...memos, data.memo];
      newMemo = '';
    }
  }

  onMount(() => { fetchMemos(); });
</script>

<h1>📝 메모 (API 연동)</h1>

<div class="input-group">
  <input bind:value={newMemo} onkeydown={(e) => e.key === 'Enter' && addMemo()} placeholder="새 메모..." />
  <button onclick={addMemo}>추가</button>
</div>

{#if loading}
  <p>로딩 중...</p>
{:else}
  {#each memos as memo (memo.id)}
    <div class="memo">
      <span>{memo.text}</span>
      <time>{new Date(memo.createdAt).toLocaleDateString('ko-KR')}</time>
    </div>
  {:else}
    <p>메모 없음</p>
  {/each}
{/if}

<style>
  .input-group { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
  .input-group input { flex: 1; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; }
  .input-group button { padding: 0.75rem 1.5rem; background: #ff3e00; color: white; border: none; border-radius: 8px; cursor: pointer; }
  .memo { display: flex; justify-content: space-between; padding: 0.75rem; border-bottom: 1px solid #eee; }
  time { color: #999; font-size: 0.8rem; }
</style>
```

---

## 확인

- `/memos` 에서 메모 목록 표시
- 메모 추가 → API POST 호출 → 목록 갱신
- 브라우저에서 `/api/memos` 직접 접속하면 JSON 응답

---

## 🎯 다음 단계

[13-auth-hooks.md](./13-auth-hooks.md) →
