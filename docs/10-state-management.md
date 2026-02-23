# 🏪 Step 09: 상태 관리

## 학습 목표
- `.svelte.ts` 모듈에서 공유 상태
- 클래스 기반 상태 관리 패턴
- 여러 컴포넌트 간 상태 공유

---

## 개념 설명

Svelte 5에서는 `.svelte.ts` 파일에서 `$state`를 사용하여 **전역 공유 상태**를 만들 수 있습니다:

```typescript
// cart.svelte.ts
class CartStore {
  items = $state<Item[]>([]);
  get total() { return this.items.reduce(...); }
  add(item: Item) { this.items.push(item); }
}
export const cart = new CartStore();
```

> **🔄 React 비교**: React에서는 전역 상태 관리를 위해 Redux, Zustand, Jotai 같은 **외부 라이브러리**를 별도로 설치해야 합니다. Svelte는 `.svelte.ts` 파일 하나만으로 전역 상태를 만들 수 있어 추가 라이브러리가 필요 없습니다.

---

## 실습: 파일 생성

### 1. `src/lib/stores/cart.svelte.ts` 생성

```typescript
interface CartItem {
  id: number; name: string; price: number; quantity: number;
}

class CartState {
  items = $state<CartItem[]>([]);

  get total(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
  get count(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  add(product: { id: number; name: string; price: number }) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) { existing.quantity++; }
    else { this.items.push({ ...product, quantity: 1 }); }
  }

  remove(id: number) { this.items = this.items.filter(i => i.id !== id); }

  updateQuantity(id: number, qty: number) {
    const item = this.items.find(i => i.id === id);
    if (item) { qty <= 0 ? this.remove(id) : item.quantity = qty; }
  }

  clear() { this.items = []; }
}

export const cart = new CartState();
```

### 2. `src/routes/shop/+page.svelte` 생성

```svelte
<script lang="ts">
  import { cart } from '$lib/stores/cart.svelte';

  const products = [
    { id: 1, name: 'Svelte 5 교재', price: 35000 },
    { id: 2, name: 'TypeScript 핸드북', price: 28000 },
    { id: 3, name: 'CSS 마스터 가이드', price: 32000 }
  ];

  function formatPrice(price: number) {
    return price.toLocaleString('ko-KR') + '원';
  }
</script>

<h1>🏪 서점</h1>

<div class="products">
  {#each products as product}
    <div class="card">
      <h3>{product.name}</h3>
      <p>{formatPrice(product.price)}</p>
      <button onclick={() => cart.add(product)}>장바구니 추가</button>
    </div>
  {/each}
</div>

<h2>🛒 장바구니 ({cart.count}개)</h2>
{#each cart.items as item (item.id)}
  <div class="cart-item">
    <span>{item.name}</span>
    <div class="qty">
      <button onclick={() => cart.updateQuantity(item.id, item.quantity - 1)}>-</button>
      <span>{item.quantity}</span>
      <button onclick={() => cart.updateQuantity(item.id, item.quantity + 1)}>+</button>
    </div>
    <span>{formatPrice(item.price * item.quantity)}</span>
  </div>
{:else}
  <p>장바구니가 비어있습니다</p>
{/each}

{#if cart.count > 0}
  <div class="total">
    <strong>합계: {formatPrice(cart.total)}</strong>
    <button onclick={() => cart.clear()}>전체 비우기</button>
  </div>
{/if}

<style>
  .products { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
  .card { padding: 1.5rem; border-radius: 12px; background: white; border: 1px solid #eee; text-align: center; }
  .card button { padding: 0.5rem 1rem; background: #4caf50; color: white; border: none; border-radius: 8px; cursor: pointer; }
  .cart-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; border-bottom: 1px solid #eee; }
  .cart-item span:first-child { flex: 1; }
  .qty { display: flex; align-items: center; gap: 0.5rem; }
  .qty button { width: 28px; height: 28px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer; }
  .total { display: flex; justify-content: space-between; padding: 1rem; background: #fff5f2; border-radius: 8px; margin-top: 1rem; }
  .total button { background: #f44336; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; }
</style>
```

---

## 확인

- `/shop` 에서 상품 추가, 수량 조절, 제거 기능
- 합계가 자동으로 갱신되는지 확인

---

## 🎯 다음 단계

[11-styling-animations.md](./11-styling-animations.md) →
