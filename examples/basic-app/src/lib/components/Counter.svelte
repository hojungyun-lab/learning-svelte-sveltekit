<script lang="ts">
    let count = $state(0);
    let doubled = $derived(count * 2);
    let isEven = $derived(count % 2 === 0);

    function increment() {
        count++;
    }
    function decrement() {
        count--;
    }
    function reset() {
        count = 0;
    }
</script>

<div class="counter">
    <h3>카운터</h3>
    <div class="display">
        <span class="number">{count}</span>
        <span class="info">× 2 = {doubled}</span>
        <span class="badge" class:even={isEven}>{isEven ? "짝수" : "홀수"}</span
        >
    </div>
    <div class="buttons">
        <button onclick={decrement}>-1</button>
        <button onclick={reset}>리셋</button>
        <button onclick={increment}>+1</button>
    </div>
</div>

<style>
    .counter {
        padding: 2rem;
        border-radius: 16px;
        background: white;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        text-align: center;
    }
    h3 {
        margin: 0 0 1rem;
        color: #333;
    }
    .display {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    .number {
        font-size: 3rem;
        font-weight: bold;
        color: #ff3e00;
    }
    .info {
        color: #888;
        font-size: 1.1rem;
    }
    .badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        background: #e0e0e0;
        font-size: 0.8rem;
    }
    .badge.even {
        background: #c8e6c9;
        color: #2e7d32;
    }
    .buttons {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
    }
    button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        background: #f5f5f5;
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
        transition: background 0.2s;
    }
    button:hover {
        background: #e0e0e0;
    }
</style>
