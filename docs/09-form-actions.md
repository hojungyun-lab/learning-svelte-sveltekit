# 📝 Step 08: Form Actions

## 학습 목표
- Form Actions으로 서버 데이터 전송
- Named Actions (`?/create`, `?/delete`)
- `use:enhance` 로 Progressive Enhancement
- `fail()` 로 유효성 검사

---

## 개념 설명

```typescript
// +page.server.ts
import { fail } from '@sveltejs/kit';

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    if (!name) return fail(400, { error: '이름 필수' });
    // DB 저장...
    return { success: true };
  },
  delete: async ({ request }) => { /* ... */ }
};
```

```svelte
<!-- use:enhance → 새로고침 없이 제출 -->
<form method="POST" action="?/create" use:enhance>
  <input name="name" />
  <button>저장</button>
</form>
```

---

## 실습: 파일 생성

### 1. `src/routes/feedback/+page.server.ts` 생성

```typescript
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

interface Feedback { id: number; name: string; message: string; rating: number; }

const feedbacks: Feedback[] = [
  { id: 1, name: '홍길동', message: 'Svelte 5 최고!', rating: 5 }
];
let nextId = 2;

export const load: PageServerLoad = async () => {
  return { feedbacks: [...feedbacks] };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;
    const rating = Number(formData.get('rating'));

    if (!name || name.length < 2) return fail(400, { name, message, rating, error: '이름은 2자 이상' });
    if (!message || message.length < 5) return fail(400, { name, message, rating, error: '메시지는 5자 이상' });

    feedbacks.push({ id: nextId++, name, message, rating });
    return { success: true };
  },
  delete: async ({ request }) => {
    const id = Number((await request.formData()).get('id'));
    const idx = feedbacks.findIndex(f => f.id === id);
    if (idx !== -1) feedbacks.splice(idx, 1);
    return { deleted: true };
  }
};
```

### 2. `src/routes/feedback/+page.svelte` 생성

```svelte
<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();
</script>

<h1>📝 피드백</h1>

<form method="POST" action="?/create" use:enhance class="form">
  <input name="name" value={form?.name ?? ''} placeholder="이름" />
  <textarea name="message" placeholder="피드백" rows="3">{form?.message ?? ''}</textarea>
  <input name="rating" type="number" min="1" max="5" value={form?.rating ?? 5} />
  {#if form?.error}<p class="error">❌ {form.error}</p>{/if}
  {#if form?.success}<p class="success">✅ 등록 완료!</p>{/if}
  <button type="submit">등록</button>
</form>

<h2>피드백 목록 ({data.feedbacks.length}개)</h2>
{#each data.feedbacks as fb (fb.id)}
  <div class="card">
    <strong>{fb.name}</strong> {'⭐'.repeat(fb.rating)}
    <p>{fb.message}</p>
    <form method="POST" action="?/delete" use:enhance>
      <input type="hidden" name="id" value={fb.id} />
      <button class="del">삭제</button>
    </form>
  </div>
{:else}
  <p>피드백이 없습니다.</p>
{/each}

<style>
  .form { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; }
  input, textarea { padding: 0.5rem; border: 2px solid #ddd; border-radius: 8px; }
  button { padding: 0.75rem; background: #ff3e00; color: white; border: none; border-radius: 8px; cursor: pointer; }
  .error { color: #f44336; } .success { color: #2e7d32; }
  .card { padding: 1rem; border: 1px solid #eee; border-radius: 8px; margin-bottom: 0.5rem; }
  .del { padding: 0.25rem 0.5rem; background: #f44336; font-size: 0.8rem; }
</style>
```

---

## 확인

- `/feedback` 에서 피드백 등록/삭제 기능
- 유효성 검사 오류 메시지 표시 확인
- 페이지 새로고침 없이 동작 (`use:enhance`)

---

## 🎯 다음 단계

[10-state-management.md](./10-state-management.md) →
