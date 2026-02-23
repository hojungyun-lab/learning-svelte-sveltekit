# 📋 Svelte 5 & SvelteKit 치트시트

> 빠른 참조용 요약 카드

---

## 🔮 Runes (반응성 시스템)

```svelte
let count = $state(0);                        // 반응형 상태
let doubled = $derived(count * 2);            // 파생 값 (자동 계산)
let stats = $derived.by(() => { ... });       // 복잡한 파생 값
$effect(() => { console.log(count); });       // 사이드 이펙트
$effect(() => { return () => cleanup(); });   // 클린업 포함
let { name, age = 25 } = $props();            // 컴포넌트 Props
let { value = $bindable('') } = $props();     // 양방향 바인딩 가능 Props
$inspect(count);                              // 디버깅 (dev only)
```

---

## 🏗️ 컴포넌트 구조

```svelte
<script lang="ts">
  // 로직 (Runes, imports, 함수)
</script>

<!-- 마크업 (HTML + 표현식) -->
<h1>Hello {name}!</h1>

<style>
  /* Scoped CSS */
</style>
```

---

## 🔄 제어 흐름

```svelte
{#if condition}...{:else if other}...{:else}...{/if}
{#each items as item (item.id)}...{:else}비어있음{/each}
{#await promise}로딩...{:then data}...{:catch error}...{/await}
{#key expression}...{/key}
{@html rawHtml}
{@render snippetName(args)}
```

---

## 🧩 Snippets (Svelte 5)

```svelte
{#snippet mySnippet(param: string)}
  <p>{param}</p>
{/snippet}
{@render mySnippet('hello')}

<!-- Props로 전달 -->
<Card>
  {#snippet header()}<h3>제목</h3>{/snippet}
  <p>children 내용</p>
</Card>
```

---

## 🎯 이벤트 & 바인딩

```svelte
<button onclick={handler}>클릭</button>       <!-- Svelte 5 -->
<input oninput={(e) => text = e.target.value} />
<input bind:value={text} />                    <!-- 양방향 -->
<input type="checkbox" bind:checked />
<select bind:value={selected}>...</select>
<div class:active={isActive}>조건부 클래스</div>
<div style:color={dynamicColor}>동적 스타일</div>
```

---

## 🗺️ SvelteKit 라우팅

```
src/routes/
├── +page.svelte          → /
├── +page.server.ts       → 서버 데이터 로딩 + Form Actions
├── +page.ts              → 유니버설 데이터 로딩
├── +layout.svelte        → 공유 레이아웃
├── +error.svelte         → 에러 페이지
├── +server.ts            → API 엔드포인트
├── about/+page.svelte    → /about
├── blog/[slug]/+page.svelte → /blog/:slug (동적)
└── (group)/              → URL에 영향 없는 그룹
```

---

## 📡 데이터 로딩

```typescript
// +page.server.ts (서버 전용)
export const load = async ({ params, fetch, cookies }) => {
  return { data: await getData() };
};

// +page.svelte
let { data } = $props();  // load 반환값 접근
```

---

## 📝 Form Actions

```typescript
// +page.server.ts
export const actions = {
  default: async ({ request }) => { ... },
  create: async ({ request }) => { ... },
  delete: async ({ request }) => { ... }
};
```

```svelte
<form method="POST" action="?/create" use:enhance>
  <input name="title" />
  <button>생성</button>
</form>
```

---

## 🔌 API 라우트

```typescript
// +server.ts
import { json } from '@sveltejs/kit';
export const GET = async ({ url }) => json({ data: [] });
export const POST = async ({ request }) => {
  const body = await request.json();
  return json(result, { status: 201 });
};
```

---

## 🔐 Hooks

```typescript
// hooks.server.ts
export const handle = async ({ event, resolve }) => {
  event.locals.user = getUser(event.cookies);
  if (needsAuth && !event.locals.user) {
    return new Response(null, { status: 302, headers: { Location: '/login' } });
  }
  return await resolve(event);
};
```

---

## 🎨 트랜지션 & 애니메이션

```svelte
import { fade, fly, slide, scale, blur } from 'svelte/transition';
import { flip } from 'svelte/animate';

{#if visible}
  <div transition:fade>양방향</div>
  <div in:fly={{ y: 50 }} out:fade>단방향</div>
{/if}

{#each items as item (item.id)}
  <div animate:flip={{ duration: 300 }}>{item}</div>
{/each}
```

---

## 🏪 상태 관리 (Svelte 5 패턴)

```typescript
// store.svelte.ts — 클래스 기반
class CartStore {
  items = $state<Item[]>([]);
  get total() { return this.items.reduce(...); }
  add(item: Item) { this.items.push(item); }
}
export const cart = new CartStore();
```

---

## 📦 주요 임포트

```typescript
import { goto, invalidate } from '$app/navigation';
import { page } from '$app/stores';
import { enhance } from '$app/forms';
import { json, error, redirect, fail } from '@sveltejs/kit';
import { setContext, getContext, onMount } from 'svelte';
```
