# 🎨 Step 10: 스타일링 & 애니메이션

## 학습 목표
- `transition:` 디렉티브 (fade, fly, slide, scale)
- `animate:flip` — 리스트 FLIP 애니메이션
- 동적 스타일링 (`style:`, `class:`)
- `in:` / `out:` 단방향 트랜지션

---

## 개념 설명

```svelte
import { fade, fly, slide, scale } from 'svelte/transition';
import { flip } from 'svelte/animate';

{#if visible}
  <div transition:fade>양방향</div>
  <div in:fly={{ y: 50 }} out:fade>단방향</div>
{/if}

{#each items as item (item.id)}
  <div animate:flip={{ duration: 300 }}>{item}</div>
{/each}

<!-- 동적 스타일 -->
<div style:color={dynamicColor}>텍스트</div>
<div class:active={isActive}>조건부 클래스</div>
```

---

## 실습: 파일 수정

### `src/routes/+page.svelte` 에 트랜지션 데모 추가

기존 `+page.svelte`의 `<script>` 에 추가:
```svelte
import { fade, fly, scale } from 'svelte/transition';
import { flip } from 'svelte/animate';

let showTransition = $state(true);
let fruits = $state([
  { id: 1, text: '🍎 사과', color: '#ff6b6b' },
  { id: 2, text: '🍌 바나나', color: '#ffd93d' },
  { id: 3, text: '🍇 포도', color: '#9b59b6' },
  { id: 4, text: '🍊 오렌지', color: '#ff9f43' }
]);

function shuffleFruits() {
  fruits = fruits.sort(() => Math.random() - 0.5);
}
```

마크업에 추가:
```svelte
<section>
  <h2>Step 10: 트랜지션 & 애니메이션</h2>

  <button onclick={() => showTransition = !showTransition}>
    {showTransition ? '숨기기' : '보이기'}
  </button>

  {#if showTransition}
    <div class="transition-demo" transition:fly={{ y: 30, duration: 400 }}>
      <p>fly 트랜지션 적용!</p>
    </div>
  {/if}

  <button onclick={shuffleFruits}>🔀 섞기</button>
  <div class="fruit-list">
    {#each fruits as fruit (fruit.id)}
      <div
        class="fruit"
        style:background-color={fruit.color}
        animate:flip={{ duration: 300 }}
      >
        {fruit.text}
      </div>
    {/each}
  </div>
</section>
```

---

## 확인

- 보이기/숨기기 버튼 → fly 트랜지션 효과
- 섞기 버튼 → FLIP 애니메이션으로 과일 카드 이동

---

## 🎯 다음 단계

[12-api-routes.md](./12-api-routes.md) →
