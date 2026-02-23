<script lang="ts">
    import { onMount } from "svelte";

    interface Memo {
        id: number;
        text: string;
        createdAt: string;
    }

    let memos = $state<Memo[]>([]);
    let newMemo = $state("");
    let loading = $state(true);

    async function fetchMemos() {
        loading = true;
        const res = await fetch("/api/memos");
        const data = await res.json();
        memos = data.memos;
        loading = false;
    }

    async function addMemo() {
        if (!newMemo.trim()) return;
        const res = await fetch("/api/memos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: newMemo }),
        });
        if (res.ok) {
            const data = await res.json();
            memos = [...memos, data.memo];
            newMemo = "";
        }
    }

    onMount(() => {
        fetchMemos();
    });
</script>

<h1>📝 메모 (API 연동)</h1>
<div class="input-group">
    <input
        bind:value={newMemo}
        onkeydown={(e) => e.key === "Enter" && addMemo()}
        placeholder="새 메모..."
    />
    <button onclick={addMemo}>추가</button>
</div>

{#if loading}
    <p>로딩 중...</p>
{:else}
    {#each memos as memo (memo.id)}
        <div class="memo">
            <span>{memo.text}</span><time
                >{new Date(memo.createdAt).toLocaleDateString("ko-KR")}</time
            >
        </div>
    {:else}
        <p>메모 없음</p>
    {/each}
{/if}

<style>
    .input-group {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    .input-group input {
        flex: 1;
        padding: 0.75rem;
        border: 2px solid #ddd;
        border-radius: 8px;
    }
    .input-group button {
        padding: 0.75rem 1.5rem;
        background: #ff3e00;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
    .memo {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem;
        border-bottom: 1px solid #eee;
    }
    time {
        color: #999;
        font-size: 0.8rem;
    }
</style>
