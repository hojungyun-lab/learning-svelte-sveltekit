<script lang="ts">
    import { cart } from "$lib/stores/cart.svelte";

    const products = [
        { id: 1, name: "Svelte 5 교재", price: 35000 },
        { id: 2, name: "TypeScript 핸드북", price: 28000 },
        { id: 3, name: "CSS 마스터 가이드", price: 32000 },
    ];

    function formatPrice(price: number) {
        return price.toLocaleString("ko-KR") + "원";
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
            <button
                onclick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                >-</button
            >
            <span>{item.quantity}</span>
            <button
                onclick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                >+</button
            >
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
    .products {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
    }
    .card {
        padding: 1.5rem;
        border-radius: 12px;
        background: white;
        border: 1px solid #eee;
        text-align: center;
    }
    .card button {
        padding: 0.5rem 1rem;
        background: #4caf50;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
    .cart-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        border-bottom: 1px solid #eee;
    }
    .cart-item span:first-child {
        flex: 1;
    }
    .qty {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .qty button {
        width: 28px;
        height: 28px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 4px;
        cursor: pointer;
    }
    .total {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        background: #fff5f2;
        border-radius: 8px;
        margin-top: 1rem;
    }
    .total button {
        background: #f44336;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
    }
</style>
