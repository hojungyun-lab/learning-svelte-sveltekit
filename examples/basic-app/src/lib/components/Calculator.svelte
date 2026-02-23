<script lang="ts">
    let a = $state(10);
    let b = $state(5);
    let operator = $state<"+" | "-" | "×" | "÷">("+");

    let result = $derived.by(() => {
        switch (operator) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "×":
                return a * b;
            case "÷":
                return b !== 0 ? a / b : NaN;
        }
    });

    let resultText = $derived(
        Number.isNaN(result) ? "계산 불가 (0으로 나눔)" : `결과: ${result}`,
    );
</script>

<div class="calc">
    <h3>계산기</h3>
    <div class="inputs">
        <input type="number" bind:value={a} />
        <select bind:value={operator}>
            <option>+</option><option>-</option><option>×</option><option
                >÷</option
            >
        </select>
        <input type="number" bind:value={b} />
    </div>
    <p class="result">{resultText}</p>
</div>

<style>
    .calc {
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
    .inputs {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        align-items: center;
    }
    input {
        width: 80px;
        padding: 0.5rem;
        border: 2px solid #ddd;
        border-radius: 8px;
        text-align: center;
        font-size: 1.1rem;
    }
    select {
        padding: 0.5rem;
        border: 2px solid #ddd;
        border-radius: 8px;
        font-size: 1.1rem;
    }
    .result {
        font-size: 1.5rem;
        font-weight: bold;
        color: #ff3e00;
        margin-top: 1rem;
    }
</style>
